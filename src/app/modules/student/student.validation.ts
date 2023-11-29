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
      dateOFBirth: z.date().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema
};
