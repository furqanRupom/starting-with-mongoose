import { Types } from "mongoose";


interface IAcademicDepartment  {
 name:string,
 academicFaculty:Types.ObjectId,
 createdAt:Date,
 updatedAt:Date
}


export default IAcademicDepartment;