import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Problem from "@/components/Problem";
import AIShowcase from "@/components/AIShowcase";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
      margin: "0 max(24px, calc((100vw - 1200px) / 2))",
    }} />
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Divider />
        <HowItWorks />
        <Divider />
        <Problem />
        <Divider />
        <AIShowcase />
        <Divider />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
