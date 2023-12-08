import { z } from 'zod';

// Zod schema for FacultyName
const AdminNameSchemaValidation = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
});

// Zod schema for Faculty
const AdminSchemaValidation = z.object({
  body: z.object({
    admin: z.object({
      name: AdminNameSchemaValidation,
      gender: z.enum(['female', 'male', 'others']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
      contactNumber: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const AdminNameSchemaUpDateValidation = z.object({
  firstName: z.string().min(1).optional(),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

// Zod schema for Faculty
const AdminSchemaUpdateValidation = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string(),
      name: AdminNameSchemaUpDateValidation,
      gender: z.enum(['female', 'male', 'others']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      bloodGroup: z
      .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
      .optional(),
      contactNumber:z.string().optional(),
      emergencyContactNo:z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const adminValidation = {
 AdminSchemaValidation,
   AdminSchemaUpdateValidation,
};
