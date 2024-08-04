import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between bg-background ">
      <Navbar/>
       Welcome to Dev Matchups
      <Footer/>
    </main>
  );
}
