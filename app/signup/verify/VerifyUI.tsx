import { Button } from "@/components/ui/button"
import Image from "next/image";
import Mail from "@/app/assets/mail-svgrepo-com.svg";
import { IoMdArrowForward } from "react-icons/io";
import Link from "next/link";

export default function VerifyUI() {

    // const handleResendEmail = () => {
    //     console.log("Resending verification email")
    // }

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="max-w-md w-full space-y-8 bg-background dark:bg-background p-8 rounded-xl shadow-lg">
            <div className="text-center">
            {/* <div className="flex justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                IT
                </div>
            </div> */}
            <h2 className="mt-6 text-3xl font-extrabold text-text dark:text-text">Verify your email</h2>
            </div>
            
            <div className="mt-8 flex justify-center">
                <Image src={Mail} alt="Mail" width={100} height={100} />
            </div>
            
            <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                We{"'"}ve sent a verification link to your email address. <br/> Please click the link in the email to verify your account.
            </p>
            </div>
            
            <div className="mt-6">
            <Link href={'/login'}>
                <Button
                    className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium   "
                >
                    Continue to Login
                    <IoMdArrowForward  className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            </div>
            
            <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Didn{"'"}t receive the email? Check your spam folder or try again.
            </p>
            </div>
        </div>
        </div>
    )
}