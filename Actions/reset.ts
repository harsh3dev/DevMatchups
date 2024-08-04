"use server";

import { GetUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/SendMail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/validation";
import * as z from "zod";


export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email!" };

  const { email } = validatedFields.data;

  const existingUser = await GetUserByEmail(email);

  if (!existingUser) return { error: "Email not found!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset password email sent" };
};