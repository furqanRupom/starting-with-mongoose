export type TMonths = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'



export type TAcademicSemesterName = 'autumn' | 'summer' | 'fall';
export type TAcademicSemesterCode = '01' | '02' | '03';


export interface IAcademicSemester {
  name:TAcademicSemesterName
  code:TAcademicSemesterCode
  year: string
  startsMonth: TMonths
  endMonth: TMonths
  createdAt: Date
  deletedAt: Date
}



/**
 * Mapping of seasons to codes.
 *
 * 1. autumn : 01
 * 2. summer : 02
 * 3. fall   : 03
 *
 */

export interface ICheckMapper {
  [key:string]: string
}