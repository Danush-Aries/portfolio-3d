import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Now } from "@/components/sections/Now";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { NavRail } from "@/components/ui/NavRail";

export default function Page() {
  return (
    <>
      <NavRail />
      <main id="main-content" className="relative">
        <Hero />
        <Work />
        <About />
        <Credentials />
        <Now />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
