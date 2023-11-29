import { semesterNameAndCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code !')
  }
  const result = await AcademicSemesterModel.create(payload)
  return result
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

const getSpecificAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById({ _id: id })
  return result
}

const updateSpecificAcademicSemesterFromDB = async (
  id: string,
  payload: IAcademicSemester,
) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code !')
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
