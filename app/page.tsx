import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Logos from "./Hero/Logos";
import GlobeComponent from "./Hero/GlobeComponent";
import Faqs from "@/app/Hero/Faqs";
import ProcessFlow from "./Hero/ProcessFlow";


export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start  ">
			<Navbar/>
			<Hero/>
			<Logos/>
			<div className="background-shape"></div>
			<GlobeComponent/>
			<div className="w-full md:w-[80%] grid place-items-center " >
				<ProcessFlow/>
			</div>
			<Faqs/>
			<Footer/>
		</main>
	);
}
