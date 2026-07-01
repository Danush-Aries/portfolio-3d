import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
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
        <Now />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
