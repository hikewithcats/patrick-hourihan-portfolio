import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/sections/Hero";
import SoftwareProjects from "@/components/sections/SoftwareProjects";
import ClientWork from "@/components/sections/ClientWork";
import Capabilities from "@/components/sections/Capabilities";
import AiWorkflow from "@/components/sections/AiWorkflow";
import Background from "@/components/sections/Background";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <SoftwareProjects />
        <ClientWork />
        <Capabilities />
        <AiWorkflow />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
