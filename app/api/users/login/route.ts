'use server'
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { compare } from 'bcrypt';
import { z } from "zod";
import jwt from 'jsonwebtoken'


const userSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" })
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = userSchema.parse(body);

        // Check if username already existsn
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
          return NextResponse.json({ user: null, message: "Email is not registered" }, { status: 409 });
        }


        console.log("password and user ",password,user.password);

        if(await compare(password,user.password!)){
               const tokendata={
                   id:user.id,
                   email:user.email,
                   username:user.username
               }
              const token:string = jwt.sign(tokendata,process.env.JWT_SECRET!,{expiresIn: "1d"})
              const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
           
   
            const response=NextResponse.json({
				token:token,
				user:user,
				message: `User Login Success`,
			});
	            
            
            cookies().set("token", token, options);
            user.password="";
            return NextResponse.json({ user: user, message: "logged in successfully" }, { status: 201 });
        }

        else{ 
            return NextResponse.json({ user: null, message: "Password is incorrect" }, { status: 409 });
        }
       
      
    } 
    catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ user: null, message: "Internal Server Error" }, { status: 500 });
    }
}
