import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";


const lastStudentId = async () => {
    const lastStudent = await UserModel.findOne({
        role:'student',
    },{
        id:1,
        _id:0
    }).sort({createdAt:-1})
    .lean()
                                          // 202203  => 0001
    return lastStudent?.id ?   lastStudent?.id.substring(6) : undefined

}

export const generateStudentId = async (payload:IAcademicSemester) => {
  /* 0001                     0000  */
  const currentId = (await lastStudentId()) || (0).toString()
/* '000' 1+1 => padStart => '0002'    '000' 0 + 1 => '0001'  */
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}