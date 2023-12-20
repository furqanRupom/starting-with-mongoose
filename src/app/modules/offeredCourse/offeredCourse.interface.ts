import { Types } from "mongoose";

export type Days = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export interface IOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester:Types.ObjectId;
  academicFaculty:Types.ObjectId;
  academicDepartment:Types.ObjectId;
  course:Types.ObjectId;
  faculty:Types.ObjectId;
  section:number;
  maxCapacity:number;
  days:Days[];
  startTime:string;
  endTime:string

}

export interface ISchedules {
  startTime: string;
  endTime: string;
  days: Days[];
} 