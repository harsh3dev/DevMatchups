import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { GetUserByEmail } from "./data/user";
import { LoginSchema } from "./validation";
import bcrypt from "bcryptjs"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export default ({
    providers: [
      Google({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
      }),
        Github({
          clientId:process.env.GITHUB_CLIENT_ID,
          clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);
          console.log("credentials",credentials);
          if (!validatedFields.success) {
            return null;
          }
       
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await GetUserByEmail(email);
       
            if (!user || !user.password) return null;
       
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
              console.error("Passwords do not match");
              return null;
            }
  
            console.log("User authenticated successfully:", user);
            return user;
          }
       
          return null;
        },
      }),
    ]
}) satisfies NextAuthConfig;