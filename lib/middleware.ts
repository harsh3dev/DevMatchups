
import { NextRequest, NextResponse } from "next/server";

export function middleware(req : NextRequest){
    const path = req.nextUrl.pathname;

    const ispublicpath = path==='/login' || path==='/signup' || path==='/verifyemail';

    const token= req.cookies.get('token')?.value || "";

    if(ispublicpath && token){
        return NextResponse.redirect(new URL('/',req.url));
    }

    if(!ispublicpath && !token){
        return NextResponse.redirect(new URL('/login',req.url));
    }
}