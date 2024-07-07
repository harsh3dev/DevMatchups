import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";


interface session {
  user?: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Add user ID to the session
      }

      console.log("api session",session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret to sign the JWT
});

export { handler as GET, handler as POST };