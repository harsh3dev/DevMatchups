import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function NewPasswordPage() {
  return (
    <main  className = 'h-screen text-text dark:text-text relative flex flex-col justify-center items-center ' >
      <Navbar/>

      <div className=" min-h-screen grid place-items-center place-content-center ">
        <Suspense>
          <NewPasswordForm/>
        </Suspense>
      </div>
        <Footer/>
    </main>
  );
}