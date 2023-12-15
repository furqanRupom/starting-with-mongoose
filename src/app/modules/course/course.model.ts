import { Schema, Types, model } from "mongoose";
import { ICourse, ICourseFaculty, IPrerequisiteCourses } from "./course.interface";



const preRequisiteCoursesSchema = new Schema<IPrerequisiteCourses> ({
  course:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Course'
  },
  isDeleted:{
    type:Boolean,
    required:true,
    default:false
  }
})

const courseSchema = new Schema<ICourse>({
  title:{
    type:String,
    unique:true,
    trim:true,
    required:true
  },
  prefix:{
    type:String,
    unique:true,
    trim:true,
    required:true
  },
  credits:{
    type:Number,
    trim:true,
    required:true
  },
  code:{
    type:Number,
    trim:true,
    required:true
  },
  prerequisiteCourses:[preRequisiteCoursesSchema],
  isDeleted:{
    type:Boolean,
    default:false
  }
})





export const CourseModel = model<ICourse>('Course',courseSchema)

const courseFacultySchema = new Schema<ICourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: {
    type: [Schema.Types.ObjectId],
    ref: 'Faculty',
  },
});

export const CourseFacultyModel = model<ICourseFaculty>('CourseFaculty',courseFacultySchema)