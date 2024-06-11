"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import Link from "next/link"

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Span } from "next/dist/trace"
import { useEffect, useRef, useState } from "react"


const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  username: z.string().max(100).optional(),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" })
});

type LoginSchemaType = z.infer<typeof LoginSchema>;


export default function LoginForm() {

    // const [optional, setOptional] = useState(false);
    // const emailRef = useRef(null);
    // const uidRef = useRef(null);
    const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => console.log(data);
//   useEffect(()=>{
//     if(uidRef.current && !emailRef.current){
//         setOptional(true)
//     }
//     else if(!uidRef.current && emailRef.current){
//         setOptional(false)
//     } else{

//     }
//   }, [uidRef.current, emailRef.current])

  return (
    <div className="flex h-screen w-full items-center justify-center ">      
      {/* <form  className="w-full grid place-items-center h-[80vh] "  > */}
      <Card className="w-full max-w-lg ">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Log In</CardTitle>
          <CardDescription>It's good to see you back here!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} >

          <div className="grid grid-cols-1 gap-4">
            
            <div className="space-y-2">
              <Label htmlFor="username">User ID</Label>
              <Input id="username" placeholder="Enter your username" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50" {...register("username")} required />
              {errors.username && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.username.message}</span>}
            </div>
          </div>
          {/* <div className="flex items-center space-x-2"> */}
            {/* <Separator className="flex-1" /> */}
            {/* <p className="text-sm text-center w-full font-medium text-gray-400">or</p> */}
            {/* <Separator className="flex-1" /> */}
          {/* </div> */}
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50"  
            {...register("email")} required />
            {errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50" {...register("password")} required />
            {errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
          </div>

          <Button type="submit" className="w-full">
            Log In
          </Button>
          </form>

          {/* 3rd party Login */}
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <p className="text-sm font-medium text-gray-400">or</p>
            <Separator className="flex-1" />
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2 h-5 w-5" />
              Login with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FaGithub className="mr-2 h-5 w-5" />
              Login with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center  w-full flex justify-center items-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline" prefetch={false}>
            Sign Up
          </Link>
        </CardFooter>
      </Card>
      {/* </form> */}
    </div>
  )
}

