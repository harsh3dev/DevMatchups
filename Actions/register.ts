"use server"

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/validation";
import { z } from "zod";
import  bcrypt  from 'bcryptjs';
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/SendMail";


export async function RegisterUser(values: z.infer<typeof RegisterSchema>) {
    try {
      const validatedFields = RegisterSchema.safeParse(values);

      if (!validatedFields.success) {
        return { error: "Please provide a valid email and password" };
      }
   
      const { name, email, password, username } = validatedFields.data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
   
      if (existingUser) {
        return { error: "User already exists" };
      }
   
      
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password:hashedPassword,
          username,
        },
      });
   
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(verificationToken.email,verificationToken.token);
      return { success: "Confirmation email sent!" };
    } catch (error: any) {
      return error.message;
    }
  }