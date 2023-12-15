import { AnyRecord } from 'dns';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultyModel } from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';

// database works

/* get All Faculties  */

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    FacultyModel.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .sort()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

/* get a single faculty  */

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  // const result = StudentModel.aggregate([
  //   {
  //     $match: {
  //       id: id,
  //     },
  //   },
  // ])
  return result;
};

const deleteSingleFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteFaculty = await FacultyModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(400, 'Failed to delete Faculty');
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete User');
    }

    session.commitTransaction();
    session.endSession();
    return deleteFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, error as string);
  }
};

const updateSingleFacultyFromDB = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const { name, permanentAddress, presentAddress, ...remainingProperties } =
    payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingProperties,
  };

  if (name && Object.keys(name).length) {
    for (const [key, values] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = values;
    }
  }

  /*

  name = {
    firstName:'something'
  }

  name.firstName = 'Anything';

  */

  const result = await FacultyModel.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    { new: true, runValidators: true },
  );
  return result;
};
export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteSingleFacultyFromDB,
  updateSingleFacultyFromDB,
};
