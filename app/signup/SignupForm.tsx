"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { ReloadIcon } from "@radix-ui/react-icons"

import Link from "next/link"
import { useEffect, useState } from "react"

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/store/hooks"
import { setSignupData } from "@/lib/store/features/authSlice/authSlice"



const SignUpSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }).max(100),
  name: z.string()
  .min(1, { message: "Name is required" })
  .max(100, { message: "Name must be less than 100 characters" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;


export default function SignupForm() {

  const router=useRouter();
  const dispatch=useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  useEffect(()=>{
    function showError(){
      if(signupError.length){
        toast({
          title: `${signupError}`,
        })
      }
    }
  },[])
  
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) =>{
    console.log(data);
    dispatch(setSignupData(data));
    try{
      setLoading(true);
      const {email} = data;
      const response=await axios.post("/api/users/otp",{email});
      console.log("response",response);
      router.push('/verify-email');
      
    }
    catch(error){
      if (axios.isAxiosError(error)) {
        console.log('Axios error message:', error?.response?.data?.message || error?.message);
        setSignupError(error?.response?.data?.message || error?.message)
       }
      else{
      console.log("Unexpected Error",error);
      }
    }

    setLoading(false);
    
  }

  return (
    <div className="flex h-screen w-full items-center justify-center ">      
      <div className="w-full grid place-items-center h-[80vh] "  >
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
          <form  onSubmit={handleSubmit(onSubmit)} >
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="focus:border-b-2 border-blue-500 rounded-md bg-slate-900/30 " {...register("name")} required />
                {errors.name && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.name.message}</span>}
              </div>
              <div className="flex gap-2 items-center">
              <div className="space-y-2 w-1/2 ">
                <Label htmlFor="username">User name</Label>
                <Input id="username" placeholder="Enter a unique username" className="focus:border-b-2 border-blue-500 rounded-md bg-slate-900/30 " {...register("username")} required />
                {errors.username && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.username.message}</span>}
              </div>
            <div className="space-y-2 w-1/2 ">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 border-blue-500 rounded-md bg-slate-900/30 "  
              {...register("email")} />
              {errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
            </div>
              </div>
              </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" className="focus:border-b-2 border-blue-500 rounded-md bg-slate-900/30 " {...register("password")} required />
              {errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
            </div>
            {
              loading?
              <Button disabled className="w-full mt-4 ">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Signing up
              </Button>
             :
             <Button type="submit" className="w-full mt-4 ">
              Sign Up
            </Button>
            }
          </form>
        </CardContent>

        <CardFooter className="text-center gap-2 w-full flex justify-center items-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 dark:text-cyan-500 hover:underline" prefetch={false}>
            Log in
          </Link>
        </CardFooter>
      </Card>
      </div>
    </div>
  )
}

