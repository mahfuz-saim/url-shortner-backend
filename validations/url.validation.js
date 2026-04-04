import {z} from "zod"

export const shortenValidation = z.object({
    url: z.string().url(),
    code: z.string().optional()
})