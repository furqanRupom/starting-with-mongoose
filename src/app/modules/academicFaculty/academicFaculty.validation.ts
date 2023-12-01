import { z } from 'zod'

const academicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name is invalid !',
    }),
  }),
})


export const  academicFacultyValidation = {
    academicFacultySchemaValidation
}