import z from 'zod'

const userSchemaValidation = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .optional(),
  needPasswordChanges: z.boolean().optional().default(true),
  role: z.enum(['student', 'admin', 'faculty']),
})



const changeStatusSchemaValidation = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked'], {
      required_error: 'choose one status !',
    }),
  }),
});


export const userValidation = {
  userSchemaValidation,
  changeStatusSchemaValidation

}
