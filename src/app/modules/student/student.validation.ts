import { z } from 'zod'
import validator from 'validator'
// Define Zod schema for studentName
const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(255)
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name should be in capitalize format',
    }),
  middleName: z.string().max(255),
  lastName: z
    .string()
    .min(1)
    .max(255)
    .refine(value => validator.isAlpha(value), {
      message: 'Last name is not valid!',
    }),
})

// Define Zod schema for guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(255),
})

// Define Zod schema for localGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().max(255),
  occupation: z.string().max(255),
  contactNo: z.string().max(255),
})

// Define Zod schema for the entire Student model
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(['female', 'male', 'others']),
      school: z.string(),
      dateOFBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester:z.string(),
      academicDepartment:z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})



// Define Zod schema for guardian
const guardianUpdateValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).optional(),
  fatherOccupation: z.string().min(1).max(255).optional(),
  fatherContactNo: z.string().min(1).max(255).optional(),
  motherName: z.string().min(1).max(255).optional(),
  motherOccupation: z.string().min(1).max(255).optional(),
  motherContactNo: z.string().min(1).max(255).optional(),
})

// Define Zod schema for localGuardian
const localGuardianUpdateValidationSchema = z.object({
  name: z.string().max(255).optional(),
  occupation: z.string().max(255).optional(),
  contactNo: z.string().max(255).optional(),
})




const studentNameUpdateValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(255)
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name should be in capitalize format',
    }).optional(),
  middleName: z.string().max(255).optional(),
  lastName: z
    .string()
    .min(1)
    .max(255)
    .refine(value => validator.isAlpha(value), {
      message: 'Last name is not valid!',
    }).optional(),
})


const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: studentNameUpdateValidationSchema.optional(),
      gender: z.enum(['female', 'male', 'others']).optional(),
      school: z.string().optional(),
      dateOFBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianUpdateValidationSchema.optional(),
      localGuardian: localGuardianUpdateValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
  updateStudentSchemaValidation : updateStudentValidationSchema

};

