import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.uttils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'


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
    payload.id = result[0].id // embedded id
    payload.user = result[0]._id // reference id

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
  }





}

export const userServices = {
  createStudentIntoDB,
}
