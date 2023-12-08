import { Schema, model } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";


const AcademicFacultySchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required !'],
        unique:true
    }
},
{timestamps:true})





export const AcademicFacultyModel = model<IAcademicFaculty>('academicFaculty',AcademicFacultySchema)