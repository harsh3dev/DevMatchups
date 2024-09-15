"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/lib/store/hooks"
import { setSignupData } from "@/lib/store/features/authSlice/authSlice"
import { RegisterUser } from "@/Actions/register"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import { Bounce, toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BackButton } from "./BackButton"
import { CardContentComponent } from "./CardContentComponent"
import SignupFormComponent from "./SignupFormComponent"



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
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

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

    const onClick = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (values) => {
        console.table(values);
        dispatch(setSignupData(values));
        try {
            console.log("entered", isSubmitting)
            await RegisterUser(values).then((res) => {
                console.log("res", res)
                if (res?.error) {
                    console.error(res?.error);
                    setError(res?.error);
                } else {
                    setSuccess(res?.success);
                    console.log(res?.success);
                    router.push("/signup/verify");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(error && !success ){
            toast.error(error, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
        if(success){
            toast.dismiss();
            toast.success(success, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    },[success, error])

    return (
        <div className="flex h-screen w-full items-center justify-center ">
            <div className=" w-[90%] sm:w-full grid place-items-center h-[80vh] "  >
                <Card className="w-full max-w-lg backdrop-blur-lg bg-background dark:bg-background border-gray-800/50 dark:border-gray-400/30 ">
                    <CardHeader className="sm:space-y-1 text-left sm:text-center px-8 py-4 sm:p-6 ">
                        { emailSignup && 
                            <BackButton onClick={() => setEmailSignup((prev) => !prev)} text="Back" />
                        }
                        <CardTitle className=" text-lg sm:text-2xl font-bold">Sign Up</CardTitle>
                        <CardDescription>Sign up to join the developer community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* 3rd party signup */}
                        { !emailSignup &&
                            <CardContentComponent
                                onClick={onClick}
                                toggleEmailSignup={() => setEmailSignup((prev) => !prev)}
                            />
                        }
                        {/* FORM */}
                        { emailSignup &&
                        <SignupFormComponent
                            register={register}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            onSubmit={onSubmit}
                            handleShowPassword={handleShowPassword}
                            showPassword={showPassword}
                            passwordType={passwordType}
                        />
                        }
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

