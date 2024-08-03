    "use client"
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
    import { Label } from "@/components/ui/label"
    import { Input } from "@/components/ui/input"
    import { Button } from "@/components/ui/button"
    import { Separator } from "@/components/ui/separator"

    import { FcGoogle } from "react-icons/fc";
    import { FaGithub } from "react-icons/fa6";
    import { MdOutlineRemoveRedEye } from "react-icons/md";
    import { RiEyeCloseLine } from "react-icons/ri";

    import Link from "next/link"

    import { z } from "zod";
    import { useForm, SubmitHandler } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { useEffect, useRef, useState } from "react"
    import axios from "axios"
    import { useRouter } from "next/navigation"
    import { signIn, useSession } from "next-auth/react"


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
    
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

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
    
    const { data: session, status } = useSession();
    console.log(session);
    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        console.log(data);
        try {
        const response = await axios.post("/api/users/login", data);
        console.log(response);
        if (response.status == 201) {
            router.push('/findteam');
        }
        reset();
        }
        catch (error: any) {
        console.error("server error", error);
        }
    };
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
        <Card className=" w-[90%] sm:w-full max-w-lg backdrop-blur-lg bg-background dark:bg-background border-gray-800/50 dark:border-gray-400/30 ">
            <CardHeader className="sm:space-y-1 text-left sm:text-center px-8 py-4 sm:p-6 ">
            <CardTitle className="text-2xl font-bold">Log In</CardTitle>
            <CardDescription>It{`'`}s good to see you back here!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="grid grid-cols-1 gap-4">
                </div>
                <div className="space-y-2 mb-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 bg-inputGray border-blue-500 rounded-md "
                    {...register("email")} required />
                {errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
                </div>
                <div className="space-y-2 mb-1">
                    <Label htmlFor="password">Password</Label>
                    <div className=" flex relative items-center ">
                        <Input id="password" type={passwordType} placeholder="********" className="focus:border-b-2 pr-10 bg-inputGray border-blue-500 rounded-md " {...register("password")} required />
                        <div onClick={handleShowPassword} className="absolute inset-y-0 right-0 flex items-center px-4  mt-1 mr-1 cursor-pointer text-lg ">
                            {showPassword ? <RiEyeCloseLine/> : <MdOutlineRemoveRedEye/> }
                        </div>
                    </div>
                    {errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
                </div>

                <Button type="submit" className="w-full mt-2">
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
                
                <Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-gray-600 " onClick={() => signIn('github')}>
                <FaGithub className="mr-2 h-5 w-5" />
                Login with GitHub
                </Button>
                <Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-gray-600 ">
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
                </Button>
            </div>
            </CardContent>
            <CardFooter className="text-center gap-2 w-full flex justify-center items-center text-sm text-gray-500">
            Don{`'`}t have an account?{" "}
            <Link href="/signup" className="font-medium text-blue-600 dark:text-cyan-500 hover:underline" prefetch={false}>
                Sign Up
            </Link>
            </CardFooter>
        </Card>
        </div>
    )
    }

