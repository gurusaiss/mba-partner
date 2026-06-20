import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import HowItWorks from "@/components/HowItWorks";
import Mentors from "@/components/Mentors";
import Testimonials from "@/components/Testimonials";
import Programs from "@/components/Programs";
import Resources from "@/components/Resources";
import WixIntegration from "@/components/WixIntegration";
import CTA from "@/components/CTA";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Offerings />
      <HowItWorks />
      <Mentors />
      <Testimonials />
      <Programs />
      <Resources />
      <WixIntegration />
      <CTA />
      <Footer />
      <ChatBot />
    </main>
  );
}
