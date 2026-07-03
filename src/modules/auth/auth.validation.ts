import {email, z} from "zod";

export const signupSchema=z.object({
    name:z
        .string()
        .trim()
        .min(3,"name must contain atleast 3 characters")
        .max(100),

    email:z
        .email("Invalid email address")
        .transform((email)=>email.toLowerCase()),

    password:z
        .string()
        .min(8,"password must be atleast 8 characters")
        .max(100)
});

export type SignupInput=z.infer<typeof signupSchema>