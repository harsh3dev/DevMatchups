import { ResetForm } from "@/components/auth/reset-form";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function ResetPage() {
	return <div className="flex flex-col h-screen w-full items-center justify-between bg-background ">
		<Navbar/>
		<div className="w-full min-h-[92vh] grid place-items-center  ">
			<ResetForm />
		</div>
		<Footer/>
		
	</div>;
}