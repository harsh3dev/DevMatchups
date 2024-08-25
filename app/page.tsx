import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Logos from "./Hero/Logos";
import GlobeComponent from "./Hero/GlobeComponent";
import Faqs from "@/app/Hero/Faqs";


export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start  ">
			<Navbar/>
			<Hero/>
			<Logos/>
			<div className="background-shape"></div>
			<GlobeComponent/>
			<div className="h-40 w-full" ></div>
			<Faqs/>
			<Footer/>
		</main>
	);
}
