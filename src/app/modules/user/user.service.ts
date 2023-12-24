import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.uttils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { IFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (file:any,password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.email = payload.email;
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    /*  start Session  */

    session.startTransaction();

    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }


    /* image hoisting to cloudinary  */
    const imageName = `${userData?.id}${payload?.name?.firstName}`
    const path = file?.path
    const {secure_url}:any =  await sendImageToCloudinary(imageName,path);
    console.log({secure_url});




    /* create user  => Transaction 1  */


    const result = await UserModel.create([userData], { session });

    if (!result.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Cannot find any users Data !',
      );
    }
    payload.id = result[0].id; // embedded id // => user id
    payload.user = result[0]._id; // reference id => user _id
    payload.profileImg = secure_url;

    const newStudent = await StudentModel.create([payload], { session });

    /*commit transaction => durability */

    await session.commitTransaction();

    /*end transaction  => save to database  */
    await session.endSession();
    return newStudent;
  } catch (error) {
    /* Rollback transaction  => if there is a any causes to create a user or student than the transaction will be the rollback   */
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
};

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  const userData: Partial<IUser> = {};
  userData.password = password ? '' : config?.default_password;
  userData.role = 'faculty';
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found!');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();
    userData.email = payload.email;

    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user failed to create');
    }

    payload.id = newUser[0].id; // => user => generated id
    payload.user = newUser[0]._id; // => user _id  => default id

    const newFaculty = await FacultyModel.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.commitTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};

  console.log(payload);

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeFromDB = async (decoded: JwtPayload) => {
  console.log(decoded);
  const { role, userId } = decoded;

  let result = {};

  if (role === 'student') {
    result = await StudentModel.find({ id: userId })
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  }

  if (role === 'faculty') {
    result = await FacultyModel.find({ id: userId }).populate('user');
  }

  if (role === 'admin') {
    result = await AdminModel.find({ id: userId }).populate('user');
  }

  return result;
};

const changeStatusFromDB = async (
  id: string,
  payload: {status:'in-progress' | 'blocked'},
) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    {
      status: payload.status,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatusFromDB,
};
