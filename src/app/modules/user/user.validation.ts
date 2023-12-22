import z from 'zod'

const userSchemaValidation = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .optional(),
  needPasswordChanges: z.boolean().optional().default(true),
  role: z.enum(['student', 'admin', 'faculty']),
})




export const userValidation = {
  userSchemaValidation,
}
