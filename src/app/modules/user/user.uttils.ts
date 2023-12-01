import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const lastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()
  // 202203  => 0001
  return lastStudent?.id ? lastStudent?.id : undefined
}

export const generateStudentId = async (payload: IAcademicSemester) => {
  /* 0001                     0000  */
  let currentId = (0).toString()

  const getLastStudentId = await lastStudentId()
  // 2022 01 0001

  const lastStudentYear = getLastStudentId?.substring(0,4) // 2022
  const lastStudentSemesterCode = getLastStudentId?.substring(4, 6) // 01 | 02 | 03

  const currentCode = payload.code
  const currentYear = payload.year


  if (
    getLastStudentId &&
    lastStudentSemesterCode === currentCode &&
    lastStudentYear === currentYear
  ) {
    currentId = getLastStudentId.substring(6)

  }

  /* '000' 1+1 => padStart => '0002'    '000' 0 + 1 => '0001'  */
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
