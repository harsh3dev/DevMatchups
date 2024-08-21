import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-background ">
			<Navbar/>
			<div className="h-screen"></div>
			<Footer/>
		</main>
	);
}
