import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {

  const result = await AcademicFacultyModel.create(payload)
  return result
}

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFacultyModel.find()
  return result
}


const getSpecificAcademicFacultyFromDB = async (id:string) => {
 const result = await AcademicFacultyModel.findById(id);
 return result
}

const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id:id },
    { $set: payload },
    { new: true },
  )

  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSpecificAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
}
