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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { LoginUser } from "@/Actions/login"
import { LoginSchema } from "@/validation"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { z } from "zod"
import { FormButton } from "@/components/ui/FormButton"
import { Bounce, toast } from "react-toastify"
import Spinner from "../assets/Spinner"






type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {

	const [showPassword, setShowPassword] = useState(false);
	const [passwordType, setPasswordType] = useState("password");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

	const handleShowPassword = () => {
		setShowPassword((prev) => (!prev));
	}

	useEffect(() => {
		if (showPassword) {
			setPasswordType("text")
		} else {
			setPasswordType("password")
		}
	}, [showPassword])

	const onClick = (provider: "github" | "google") => {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT
		})
	}

	const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
		console.log(values);
		setError("");
		setSuccess("");
		await LoginUser(values)
			.then((res) => {
				console.log("entered")
				if (res?.error) {
					reset();
					setError(res?.error);
				}else {
                    router.push(DEFAULT_LOGIN_REDIRECT);
                }
			})
			.catch((err) => {
				console.log(err);
				setError(err?.message);
			});
	};
	
    useEffect(()=>{
		if (error) {
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
    },[error])

	return (
		<div className="flex h-screen w-full items-center justify-center ">
			<Card className=" w-[90%] sm:w-full max-w-lg backdrop-blur-lg bg-background dark:bg-background border-gray-800/50 dark:border-gray-400/30 ">
				<CardHeader className="sm:space-y-1 text-left sm:text-center px-8 py-4 sm:p-6 ">
					<CardTitle className="text-2xl font-bold">Log In</CardTitle>
					<CardDescription>It{`'`}s good to see you back here!</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form onSubmit={handleSubmit(onSubmit)} >
						<div className="space-y-2 mb-1">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="example@email.com" className="focus:border-b-2 bg-inputGray border-blue-500 rounded-md "
								{...register("email")} required />
							{errors.email && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.email.message}</span>}
						</div>
						<div className="space-y-2 mb-1">
							<Label htmlFor="password">Password</Label>
							<div className=" flex relative items-center ">
								<Input id="password" 
									type={passwordType} 
									placeholder="********" 
									className="focus:border-b-2 pr-10 bg-inputGray border-blue-500 rounded-md " 
									{...register("password")} 
									required
								/>
								
								<div onClick={handleShowPassword} className="absolute inset-y-0 right-0 flex items-center px-4  mt-1 mr-1 cursor-pointer text-lg ">
									{showPassword ? <RiEyeCloseLine /> : <MdOutlineRemoveRedEye />}
								</div>
							</div>
							{errors.password && <span className="error-message text-right w-full text-sm mb-5 font-semibold text-red-500 ">*{errors.password.message}</span>}
						</div>
						{
							isSubmitting ? 
							<FormButton isLoader={true} label="Login" />
							 :
							<FormButton label="Login" />
						}
						
						<div className="w-full text-right ">
							<Link href="/forgot-password"  className="mt-2 text-sm text-accent dark:text-accent " >Forgot Password?</Link>
						</div>
					</form>

					{/* 3rd party Login */}
					<div className="flex items-center">
						<Separator className="flex-1" />
						<p className="text-sm font-medium text-gray-400">or</p>
						<Separator className="flex-1" />
					</div>
					<div className="grid gap-2">
						<Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-text py-6 " onClick={() => onClick('github')}>
							<FaGithub className="mr-2 h-5 w-5" />
							Login using GitHub
						</Button>

						<Button variant="outline" className="w-full bg-transparent dark:bg-transparent border-text py-6 " onClick={() => onClick('google')}>
							<FcGoogle className="mr-2 h-5 w-5" />
							Continue with Google
						</Button>
						
					</div>
				</CardContent>
				<CardFooter className="text-center gap-2 w-full flex justify-center items-center text-sm text-gray-500">
					Don{"'"}t have an account?{" "}
					<Link href="/signup" className="font-medium text-blue-600 dark:text-cyan-500 hover:underline" prefetch={false}>
						Sign Up
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}

