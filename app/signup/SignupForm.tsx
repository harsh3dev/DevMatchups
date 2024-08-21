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
import { IoMailOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Link from "next/link"
import { startTransition, useEffect, useState } from "react"
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/store/hooks"
import { setSignupData } from "@/lib/store/features/authSlice/authSlice"
import { RegisterUser } from "@/Actions/register"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"



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

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [emailSignup, setEmailSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const handleShowPassword = () => {
        setShowPassword((prev)=>(!prev));
    }


    useEffect(()=>{
        if(showPassword){
            setPasswordType("text")
        } else{
            setPasswordType("password")
        }
    },[showPassword])

    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");


    useEffect(()=>{
        function showError(){
        if(signupError.length){
            toast({
            title: `${signupError}`,
            })
        }
        }
    },[signupError])



    const onClick = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (values) => {
        console.table(values);
        dispatch(setSignupData(values));
        try {
            setLoading(true);
            console.log("entered")
            RegisterUser(values).then((res) => {
                console.log("res", res)
                if (res?.error) {
                    console.log(res?.error);
                    setError(res?.error);
                } else {
                    setSuccess(res?.success);
                    console.log(res?.success);
                    router.push("/signup/verify");
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(()=>{
        if(showPassword){
            setPasswordType("text")
        } else{
            setPasswordType("password")
        }
    },[showPassword])
    

   

   
    return (
        <div className="flex h-screen w-full items-center justify-center ">
            <div className=" w-[90%] sm:w-full grid place-items-center h-[80vh] "  >
                <Card className="w-full max-w-lg backdrop-blur-lg bg-background dark:bg-background border-gray-800/50 dark:border-gray-400/30 ">
                    <CardHeader className="sm:space-y-1 text-left sm:text-center px-8 py-4 sm:p-6 ">
                        { emailSignup && 
                        <Button variant="link" 
                            onClick={()=> setEmailSignup((pr)=>(!pr))} 
                            className="sm:w-full text-left sm:flex items-center justify-start gap-2 pl-0 text-gray-700 dark:text-gray-400 ">
                            <IoIosArrowBack /> 
                            Back
                        </Button>}
                        <CardTitle className=" text-lg sm:text-2xl font-bold">Sign Up</CardTitle>
                        <CardDescription>Sign up to join the developer community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* 3rd party signup */}
                        { !emailSignup &&
                        <div className="grid grid-rows-2 gap-2">
                            <Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-gray-600 py-6 " onClick={() => onClick('github')}>
                                <FaGithub className="mr-2 h-5 w-5" />
                                Sign up with GitHub
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-gray-600 py-6 " onClick={() => onClick('google')}>
                                <FcGoogle className="mr-2 h-5 w-5" />
                                Continue with Google
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Separator className="flex-1" />
                                <p className="text-sm font-medium text-gray-400">or</p>
                                <Separator className="flex-1" />
                            </div>
                            <Button onClick={()=> setEmailSignup((pr)=>(!pr))} variant="outline" className="w-full bg-transparent dark:bg-transparent border-gray-600 py-6 ">
                                <IoMailOutline className="mr-2 h-5 w-5 dark:text-gray-400 " />
                                Continue using Email
                            </Button>
                        </div>}
                        
                        {/* FORM */}
                        { emailSignup &&
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2 mb-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter your full name" className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray  " {...register("name")} required />
                                    {errors.name && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.name.message}</span>}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="space-y-2 mb-1 w-1/2 ">
                                        <Label htmlFor="username">User name</Label>
                                        <Input id="username" placeholder="Enter a unique username" className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray " {...register("username")} required />
                                        {errors.username && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.username.message}</span>}
                                    </div>
                                    <div className="space-y-2 mb-1 w-1/2 ">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray "
                                            {...register("email")} />
                                        {errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 mb-1">
                                <Label htmlFor="password">Password</Label>
                                    <div className=" flex relative items-center ">
                                        <Input id="password" type={passwordType} placeholder="********" className="focus:border-b-2 border-blue-500 rounded-md bg-inputGray " {...register("password")} required />
                                        <div onClick={handleShowPassword} className="absolute inset-y-0 right-0 flex items-center px-4  mt-1 mr-1 cursor-pointer text-lg "> {showPassword ? <RiEyeCloseLine/> : <MdOutlineRemoveRedEye/> } </div>
                                    </div>
                                {errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
                            </div>
                            {
                                loading ?
                                    <Button disabled className="w-full mt-4 bg-primary dark:bg-primary dark:hover:bg-accent hover:bg-accent ">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    </Button>
                                    :
                                    <Button type="submit" className="w-full mt-4 bg-primary dark:bg-primary dark:hover:bg-accent hover:bg-accent ">
                                        Sign Up
                                    </Button>
                            }
                        </form>}
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

