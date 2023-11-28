import config from '../../config'
import { IStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'


const createStudentIntoDB  = async (password: string, studentData: IStudent) => {
  const userData: Partial<IUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  userData.id = '2030102001'

  //   if (await StudentModel.isStudentsExits(studentData.id)) {
  //     throw new Error('Students Already Exits')
  //   }

  const result = await UserModel.create(userData)

  if (Object.keys(result).length) {
    studentData.id = result.id // embedded id
    studentData.userId = result._id // reference id
    const newStudent = await StudentModel.create(studentData)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDB,
}
