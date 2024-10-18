import NextAuth from "next-auth";
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import { GetUserByEmail, GetUserById } from "./data/user";
// import { UserRole } from "@prisma/client";
import { User } from "./lib/types/User";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages:{
     signIn:"/login",
     error:"/error"
    },
    events:{  
     async linkAccount({user}){
        await prisma.user.update({
            where: { id:user.id },
            data: { emailVerified: new Date() }
        })
     }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("callback: signIn");
            if (account?.provider !== "credentials") return true;
            const existingUser = await GetUserByEmail(user.email as string);
            // if credentials provider and email not verified 
            if(!existingUser?.emailVerified){
                return false;
            }
            return true;
        },

        async session({ session, token }) {
            console.log({ sessiontoken: token, session });
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            // if(token.role && session.user){
            //         session.user.role = token.role as UserRole;
            // }
            return session;
        },      

        async jwt({ token }) {

            if(!token.sub){
                return token;
            }
            const existinguser= await GetUserById(token.sub);
            if(!existinguser){
                 return token;
            }
            // @ts-ignore
            // token.role=existinguser.role as UserRole; 
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})