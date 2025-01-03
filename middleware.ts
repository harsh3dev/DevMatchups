
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isapiauthroute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isauthroute = authRoutes.includes(nextUrl.pathname);
  const ispublicroute = publicRoutes.includes(nextUrl.pathname);

  if (isapiauthroute) {
    return NextResponse.next();
  }

  if (isauthroute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !ispublicroute) {
    return NextResponse.redirect(new URL("/login",nextUrl.origin))
  }

  return NextResponse.next();
});



{/*export const config = {
    matcher: [
      '/login',
      '/signup',
      '/verify-email',
      '/signup/onboarding',
      '/findmember',
      '/dashboard',
      '/dashboard/:path*',
    ]
  }
======= */}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

