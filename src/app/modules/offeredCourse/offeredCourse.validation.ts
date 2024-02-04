import { z } from "zod";
import { DaysTypeModel } from "./offeredCourse.constant";




const timeStringSchema = z.string().refine(
      time => {
        const regexTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regexTime.test(time);
      },
      {
        message: "Invalid time format expected 'HH:MM' format in 24 hours",
      },
    )

const offeredCourseSchemaValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    days: z.array(z.enum([...DaysTypeModel] as [string, ...string[]])),
    section: z.number(),
    maxCapacity:z.number(),
    startTime:timeStringSchema,
    endTime:timeStringSchema
  }).refine((body)=>{
    const start = new Date(`2023-01-01T${body.startTime}:00`)
    const end = new Date(`2023-01-01T${body.endTime}:00`);

    return end > start
  },
  {
    message:'Start Time should be before End Time !'
  }),
});





/* update offered course schema validation */


const offeredCourseSchemaUpdateValidation = z.object({
  body: z.object({

    faculty: z.string(),
    days: z.enum([...DaysTypeModel] as [string, ...string[]]).optional(),
    section: z.number(),
    maxCapacity:z.number(),
    startDate: timeStringSchema,
    endTime: timeStringSchema,
  }).refine((body)=>{
    const start = new Date(`2023-01-01T${body.startDate}:00`)
    const end = new Date(`2023-01-01T${body.endTime}:00`);

    return end > start
  },
  {
    message:'Start Time should be before End Time !'
  }),
});


export const offeredCourseValidations = {
  offeredCourseSchemaValidation,
  offeredCourseSchemaUpdateValidation
}
