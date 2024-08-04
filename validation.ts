import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(1, { message: "Please provide a username" }),
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z.string().min(6, {
      message: "Please provide a password with at least 6 characters",
    }),
    name: z.string().min(1, { message: "Please provide a name" }),
  });


  export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Please provide a valid email" }),
    password: z.string().min(1, { message: "Please provide a password" }),
  });
  

  export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
  });

  
 export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required / Invalid email" }),
 });