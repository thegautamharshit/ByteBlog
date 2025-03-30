import z from "zod";

//Signup Input Schema
export const registerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().min(1, { message: 'Email is Required' }),
    password: z.string().min(6, { message: 'Password is Required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is not the same as confirm password',
        path: ['confirmPassword'],
      })
    }
  })

export const signInSchema = z.object({
    email: z.string().email().min(1, { message: 'Email is Required' }),
    password: z.string().min(6, { message: 'Password is Required' }),
})

//Post Input Schema
export const postSchema = z.object({
    title: z.string().min(1),
    content: z.object({
      type:z.literal('doc'),
      content:z.array(z.unknown())
    }),
})


//Update Post Schema
export const updatePostSchema = z.object({
    title: z.string(),
    content: z.object({
      type:z.literal('doc'),
      content:z.array(z.unknown())
    }),
    id: z.number()
})

export type registerSchema = z.infer<typeof registerSchema>
export type signInSchema = z.infer<typeof signInSchema>
export type postSchema = z.infer<typeof postSchema>
export type updatePostSchema = z.infer<typeof updatePostSchema>