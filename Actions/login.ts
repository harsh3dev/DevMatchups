"use server";

import { signIn } from "@/auth";
import { GetUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/SendMail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/validation";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function LoginUser(values: z.infer<typeof LoginSchema>) {
  try {
    console.log("values", values);
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Please provide a valid email and password" };
    }
    const { email, password } = validatedFields.data;

    const existingUser = await GetUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist! / Please sign in with OAuth!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
      return {
        error:
          "Email not verified! Please check your email for verification instructions.",
      };
    }

    await signIn("credentials", {
      email: email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { msg: "Invalid credentials", status: "error" };
        default:
          return { msg: "Something went wrong", status: "error" };
      }
    } else {
      console.error("Unexpected error:", error);
      return { msg: "Unexpected error occurred", status: "error" };
    }
  }
}
