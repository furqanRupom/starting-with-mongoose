type TMonths = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'



export interface IAcademicSemester {
  name: 'autumn' | 'summer' | 'fall'
  code: '01' | '02' | ' 03'
  year: Date
  startsMonth: TMonths
  endMonth: TMonths
  createdAt: Date
  deletedAt: Date
}
