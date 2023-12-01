import { Schema, model } from "mongoose";
import IAcademicDepartment from "./academicDepartment.interface";


const academicDepartmentSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required !'],
    },
    academicFaculty:{
        type :Schema.Types.ObjectId,
        required:['true','Academic Faculty id is required !']
    }
})


export const AcademicDepartmentModel = model<IAcademicDepartment>('academicDepartment',academicDepartmentSchema)