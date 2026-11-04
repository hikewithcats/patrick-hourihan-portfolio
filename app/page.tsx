import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyQuoteBar from "@/components/site/StickyQuoteBar";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Quote from "@/components/sections/Quote";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Process />
        <About />
        <Quote />
      </main>
      <Footer />
      <StickyQuoteBar />
    </>
  );
}
