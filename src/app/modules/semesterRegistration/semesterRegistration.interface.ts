import { Types } from "mongoose";


export interface iSemesterRegistration {
  academicSemester:Types.ObjectId;
  status:'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate:Date;
  endDate:Date;
  minCredit:number;
  maxCredit:number

}