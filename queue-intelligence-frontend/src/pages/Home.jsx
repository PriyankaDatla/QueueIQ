import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <div className="bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </div>
  );
}