import { AnyRecord } from 'dns'
import { StudentModel } from './student.model'

// database works


const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path:'academicDepartment',
      populate:{
        path:'academicFaculty'
      }
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
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

const updateSingleStudentFromDB = async (id: string, data:AnyRecord) => {
  const result = await StudentModel.updateOne({ id }, data)
  return result
}
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
}
