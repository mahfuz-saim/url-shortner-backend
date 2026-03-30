import {z} from 'zod'

export const signupPostRequestValidation = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
})