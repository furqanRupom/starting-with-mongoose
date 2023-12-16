import { z } from "zod";


const semesterRegistrationSchemaValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});


const semesterRegistrationUpdateSchemaValidation = z.object({
  body: z
    .object({
      academicSemester: z.string().optional(),
      status: z
        .enum(['UPCOMING', 'ONGOING', 'ENDED'])
        .default('UPCOMING')
        .optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      minCredit: z.number().optional(),
      maxCredit: z.number().optional(),
    })
    .optional(),
});


export const semesterRegistrationValidations = {
  semesterRegistrationSchemaValidation,
  semesterRegistrationUpdateSchemaValidation
}