import {z} from "zod"

const AcademicDepartmentSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name is required !',
      required_error: 'Name is required !',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Id is required !',
      required_error: 'Id is  required !',
    }),
  }),
})

const AcademicDepartmentUpdateSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name is required !',
      required_error: 'Name is required !',
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Id is required !',
      required_error: 'Id is  required !',
    }).optional(),
  }),
})



export const academicDepartmentValidation = {
    AcademicDepartmentSchemaValidation,
    AcademicDepartmentUpdateSchemaValidation
}