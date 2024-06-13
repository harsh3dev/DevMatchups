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
import axios from "axios"


const SignUpSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }).max(100),
  name: z.string()
  .min(1, { message: "Name is required" })
  .max(100, { message: "Name must be less than 100 characters" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" })
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;


export default function SignupForm() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) =>{
    console.log(data);
    const response=await axios.post("/api/users/signup",{data});
    console.log("response",response);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center ">      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid place-items-center h-[80vh] "  >
      <Card className="w-full max-w-lg ">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* 3rd party signup */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FaGithub className="mr-2 h-5 w-5" />
              Sign up with GitHub
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <p className="text-sm font-medium text-gray-400">or</p>
            <Separator className="flex-1" />
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50" {...register("name")} required />
              {errors.name && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">User name</Label>
              <Input id="username" placeholder="Enter a unique username" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50" {...register("username")} required />
              {errors.username && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.username.message}</span>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50"  
            {...register("email")} />
            {errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" className="focus:border-b-2 border-blue-500 rounded-md bg-sky-50" {...register("password")} required />
            {errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter className="text-center  w-full flex justify-center items-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline" prefetch={false}>
            Log in
          </Link>
        </CardFooter>
      </Card>
      </form>
    </div>
  )
}

