import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic = path === '/login' || path === '/signup' || path === '/verify-email' || path === '/signup/onboarding';
  const token = req.cookies.get('token')?.value || req.cookies.get('next-auth.session-token')?.value || '';
  console.log("token",token)
  if (!isPublic && !token){
    return NextResponse.redirect(new URL('/login',req.nextUrl));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/',req.nextUrl));
  }

  return NextResponse.next();

}


export const config = {
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