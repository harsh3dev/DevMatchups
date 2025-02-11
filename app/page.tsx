import Script from 'next/script';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Logos from "./Hero/Logos";
import GlobeComponent from "./Hero/GlobeComponent";
import Faqs from "@/app/Hero/Faqs";
import ProcessFlow from "./Hero/ProcessFlow";
import FootCTA from "./Hero/FootCTA";

export default function Home() {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-start relative ">
				<svg width="full" height="473" viewBox="0 0 1100 473" fill="none" xmlns="http://www.w3.org/2000/svg" className="-z-10 w-full absolute top-0 left-0 inset-0 opacity-70 invisible dark:visible " >
					<g filter="url(#filter0_f_22_838)">
						<ellipse cx="559" cy="-31" rx="343" ry="311" fill="#8C45FF" fillOpacity="0.49" />
					</g>
					<defs>
						<filter id="filter0_f_22_838" x="-88" y="-646" width="1294" height="1230" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="152" result="effect1_foregroundBlur_22_838" />
						</filter>
					</defs>
				</svg>

				<Navbar/>
				<Hero/>
				<Logos/>
				<div className="background-shape"></div>
				<GlobeComponent/>
				<div className="w-full md:w-[80%] grid place-items-center">
					<ProcessFlow/>
				</div>
				<Faqs/>
				<FootCTA/>
				<Footer/>
			</main>

			{/* Chatbot Script */}
			<Script 
				src="https://widget.cxgenie.ai/widget.js" 
				data-aid="bea4a27d-4af0-465e-bca3-ffa4c7268c25"
				data-lang="en"
				strategy="lazyOnload"
			/>
		</>
	);
}
