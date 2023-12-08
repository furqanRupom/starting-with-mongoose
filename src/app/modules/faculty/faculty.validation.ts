import { z } from 'zod';

// Zod schema for FacultyName
const FacultyNameSchemaValidation = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
});

// Zod schema for Faculty
const FacultySchemaValidation = z.object({
  body: z.object({
    faculty: z.object({
      name: FacultyNameSchemaValidation,
      gender: z.enum(['female', 'male', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(), // Assuming academicDepartment is a string ID
      academicFaculty: z.string(), // Assuming academicFaculty is a string ID
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const FacultyNameSchemaUpDateValidation = z.object({
  firstName: z.string().min(1).optional(),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

// Zod schema for Faculty
const FacultySchemaUpdateValidation = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string(),
      name: FacultyNameSchemaUpDateValidation,
      gender: z.enum(['female', 'male', 'others']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      academicDepartment: z.string().optional(), // Assuming academicDepartment is a string ID
      academicFaculty: z.string().optional(), // Assuming academicFaculty is a string ID
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const facultyValidation = {
  FacultySchemaValidation,
  FacultySchemaUpdateValidation,
};
