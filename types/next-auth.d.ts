// next-auth.d.ts
// import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }
}