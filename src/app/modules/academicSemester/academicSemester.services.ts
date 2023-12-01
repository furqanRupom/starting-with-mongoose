import AppError from '../../errors/AppError'
import { semesterNameAndCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

/* create the academic semester   */

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid semester code !')
  }

  const result = await AcademicSemesterModel.create(payload)
  return result
}

/* Get all the academic semester   */

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

/* Get specific academic semester  */

const getSpecificAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

/* Update specific academic semester  */

const updateSpecificAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(400, 'Invalid semester code !')
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true },
  )

  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSpecificAcademicSemesterFromDB,
  updateSpecificAcademicSemesterFromDB,
}
