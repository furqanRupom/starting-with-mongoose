import { ICheckMapper, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

export const months: TMonths[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]



export const academicSemesterName : TAcademicSemesterName[] = ['autumn','summer','fall']


export const academicSemesterCode : TAcademicSemesterCode[] = ['01','02','03']



 export const semesterNameAndCodeMapper: ICheckMapper = {
   autumn: '01',
   summer: '02',
   fall: '03',
 }
