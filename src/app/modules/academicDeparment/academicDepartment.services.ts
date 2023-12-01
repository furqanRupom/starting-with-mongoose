import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model'
import IAcademicDepartment from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

/* Create a Academic Department  */

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
}

/* Get All the  Academic Department  */

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
}

/* Get Specific  Academic Department  */

const getSpecificAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
}

/* Update specific  a Academic Department  */

const updateSpecificAcademicDepartmentFromDB = async (
  id: string,
  payload: IAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: payload,
    },
    {
      new: true,
    },
  )

  return result;
}



export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentIntoDB,
    getSpecificAcademicDepartmentFromDB,
    updateSpecificAcademicDepartmentFromDB
}
