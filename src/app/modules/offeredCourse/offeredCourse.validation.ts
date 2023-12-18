import { z } from "zod";
import { DaysTypeModel } from "./offeredCourse.constant";


const offeredCourseSchemaValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    days: z.array(z.enum([...DaysTypeModel] as [string, ...string[]])),
    section: z.number(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});





/* update offered course schema validation */


const offeredCourseSchemaUpdateValidation = z.object({
  body: z.object({
    semesterRegistration: z.string().optional(),
    academicSemester: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    course: z.string().optional(),
    faculty: z.string().optional(),
    days: z.enum([...DaysTypeModel] as [string, ...string[]]).optional(),
    section: z.number().optional(),
    startDate: z.string().optional(),
    endTime: z.string().optional(),
  }),
});


export const offeredCourseValidations = {
  offeredCourseSchemaValidation,
  offeredCourseSchemaUpdateValidation
}
