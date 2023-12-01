import { Schema, model } from "mongoose";
import IAcademicDepartment from "./academicDepartment.interface";
import AppError from "../../errors/AppError";


const academicDepartmentSchema = new Schema({
    name:{
        type:String,
        required:[true,'name is required !'],
    },
    academicFaculty:{
        type :Schema.Types.ObjectId,
        ref:'academicFaculty',
        required:['true','Academic Faculty id is required !']
    }
},
{
    timestamps:true
})






/* check whereas department name is same or not   */


academicDepartmentSchema.pre('save',async function(next){

    const isSameDepartmentExits = await AcademicDepartmentModel.findOne({
        name:this.name
    })

    if(isSameDepartmentExits){
        throw new AppError(400,'This department is already exits !')
    }
    next();
})



/* Check the Department is Exit or not !  */

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();

    const isDepartMentExit = await AcademicDepartmentModel.findOne(query);

    if(!isDepartMentExit){
        throw new AppError(404,'This department is not Exit !')
    }
  next();

})


export const AcademicDepartmentModel = model<IAcademicDepartment>('academicDepartment',academicDepartmentSchema)