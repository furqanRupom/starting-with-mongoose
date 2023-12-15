import { Types } from "mongoose";

export interface IPrerequisiteCourses{
  course:Types.ObjectId;
  isDeleted:boolean;
}


export interface ICourse {
  title:string;
  prefix:string;
  credits:number;
  code:number;
  isDeleted:boolean;
  prerequisiteCourses?:[IPrerequisiteCourses];
}

export interface ICourseFaculty {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
}