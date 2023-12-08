import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateFacultyId, generateStudentId } from './user.uttils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model'
import { IFaculty } from '../faculty/faculty.interface'
import { FacultyModal } from '../faculty/faculty.model'



const createStudentIntoDB  = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {}

  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester)


  const session = await mongoose.startSession();

  try {
    /*  start Session  */

    session.startTransaction()

    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester)
    }

    /* create user  => Transaction 1  */

    const result = await UserModel.create([userData], { session })

    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Cannot find any users Data !')
    }
    payload.id = result[0].id // embedded id // => user id
    payload.user = result[0]._id // reference id => user _id

    const newStudent = await StudentModel.create(payload)

    /*commit transaction => durability */

    await session.commitTransaction()

    /*end transaction  => save to database  */
    await session.endSession()
    return newStudent
  } catch (error) {
    /* Rollback transaction  => if there is a any causes to create a user or student than the transaction will be the rollback   */
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error as string)
  }

}


const createFacultyIntoDB = async (password:string,payload:IFaculty) => {
  const userData:Partial<IUser> = {};
  userData.password = password || config?.default_password;
  userData.role = 'faculty';
  const academicDepartment = await AcademicDepartmentModel.findById(payload.academicDepartment)
  if(!academicDepartment){
    throw new AppError(httpStatus.NOT_FOUND,'Academic department not found!')
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

     userData.id = await generateFacultyId();

     const newUser = await UserModel.create([userData],{session});

     if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST,'user failed to create');
     }

     payload.id = newUser[0].id;  // => user => generated id
     payload.user = newUser[0]._id  // => user _id  => default id

    const newFaculty = await FacultyModal.create(payload);

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;


  } catch (error) {
     await session.commitTransaction();
     await session.endSession();
     throw new Error(error as string)
  }
}



export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB
}
