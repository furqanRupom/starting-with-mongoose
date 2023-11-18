import { model,Schema } from "mongoose";
import { Student } from "./student.interface";


const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender:['female','male']
  ,
  dateOFBirth: {
    type:String,
    required:true
  },
  email:{type:String,required:true},
  contactNumber:{type:String,required:true},
  emergencyContactNo:{type:String,required:true},
  bloodGroup:['A+','A-','AB+','AB-','B+','B-','O+','O-'],
  presentAddress:{type:String,required:true},
  permanentAddress:{type:String,required:true},
  guardian:{
     fatherName:{type:String,required:true},
     fatherOccupation:{type:String,required:true},
     fatherContactNo:{type:String,required:true},
     motherName:{type:String,required:true},
     motherOccupation:{type:String,required:true},
     motherContactNo:{type:String,required:true},

  },
  localGuardian:{
    name:{type:String},
    occupation:{type:String},
    contactNo:{type:String},
  },
  profileImage:{type:String},
  isActive:['Active','inActive']
})



const students = model<Student>('students',studentSchema)
export default students;