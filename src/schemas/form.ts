import z from "zod"

export const formSchema = z.object({
    email: z.string().email("Invalid email format").min(1),
    password: z.string().min(6),
  });

export const emailSchema = z.object({
    email: z.string().email("Invalid email format").min(1),
  });