import { NewVerificationForm } from "@/components/new-verification-form";
import { Suspense } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";



export default function NewVerification() {
  return (
    <div className = ' min-h-screen text-text dark:text-text relative flex flex-col justify-between ' >
			<Navbar />
				<div className="absolute dark:hidden inset-0 -z-10 h-full w-full bg-backgrou bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
					<div className="dark:absolute hidden dark:block top-0 z-[-2] h-full w-full dark:bg-background  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
						<div className='grid place-items-center'>
						<Suspense>
							<NewVerificationForm />
						</Suspense>
						</div>
			<Footer />
		</div >
  );
}