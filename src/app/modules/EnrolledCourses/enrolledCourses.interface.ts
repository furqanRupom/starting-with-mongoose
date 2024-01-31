import { Types } from "mongoose";

type IGrades = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA'

export interface ICourseMarks {
  classTest1:number;
  midTerm:number;
  classTest2:number;
  finalTerm:number
}



export interface IEnrolledCourses {
  semesterRegistration:Types.ObjectId;
  academicSemester:Types.ObjectId;
  academicFaculty:Types.ObjectId;
  academicDepartment:Types.ObjectId;
  offeredCourse:Types.ObjectId;
  course:Types.ObjectId;
  student:Types.ObjectId;
  faculty:Types.ObjectId;
  isEnrolled:boolean;
  courseMarks:ICourseMarks;
  grade:IGrades;
  gradePoints:number;
  isCompleted:boolean;

}