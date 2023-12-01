import config from '../../config'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.uttils'


const createStudentIntoDB  = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {}

  userData.password = password || (config.default_password as string)
  userData.role = 'student'



  const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester)
 console.log(admissionSemester)


     if(admissionSemester){

       userData.id = await generateStudentId(admissionSemester)
      
     }



  const result = await UserModel.create(userData)

  if (Object.keys(result).length) {
    payload.id = result.id // embedded id
    payload.userId = result._id // reference id

    const newStudent = await StudentModel.create(payload)
    return newStudent
  }
}

export const userServices = {
  createStudentIntoDB,
}
