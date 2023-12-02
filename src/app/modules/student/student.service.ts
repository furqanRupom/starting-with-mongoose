import { AnyRecord } from 'dns'
import { StudentModel } from './student.model'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../user/user.model'
import { IStudent } from './student.interface'

// database works

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  // const result = StudentModel.aggregate([
  //   {
  //     $match: {
  //       id: id,
  //     },
  //   },
  // ])
  return result
}

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteStudent) {
      throw new AppError(400, 'Failed to delete student')
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteUser) {
      throw new AppError(400, 'Failed to delete User')
    }

    session.commitTransaction()
    session.endSession()
    return deleteStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Failed to delete User')
  }
}

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  const {
    localGuardian,
    guardian,
    name,
    permanentAddress,
    presentAddress,
    ...remainingProperties
  } = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingProperties,
  }

  if (name && Object.keys(name).length) {
    for (const [key, values] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = values
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, values] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = values
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, values] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = values
    }
  }

  console.log(modifiedUpdateData);
  /*

  name = {
    firstName:'something'
  }

  name.firstName = 'Anything';

  */

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    { new: true , runValidators:true},

  )
  return result
}
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
}
