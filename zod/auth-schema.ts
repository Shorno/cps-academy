import {z} from "zod"
export const signupSchema = z.object({
    username: z
        .string()
        .min(1, {message: "Username is required"})
        .min(3, {message: "Username must be at least 3 characters"})
        .max(20, {message: "Username must be less than 20 characters"})
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores"
        }),
    email: z
        .email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),
    password: z
        .string()
        .min(1, {message: "Password is required"})
        .min(8, {message: "Password must be at least 8 characters"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }),
})

export const loginSchema = z.object({
    email: z
        .email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),
    password: z
        .string()
        .min(1, {message: "Password is required"})
        .min(8, {message: "Password must be at least 8 characters"}),
})


export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>