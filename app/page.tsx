import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import HowItWorks from "@/components/HowItWorks";
import Courses from "@/components/Courses";
import Mentors from "@/components/Mentors";
import Testimonials from "@/components/Testimonials";
import Resources from "@/components/Resources";
import EnrollForm from "@/components/EnrollForm";
import CTA from "@/components/CTA";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Offerings />
      <HowItWorks />
      <Courses />
      <Mentors />
      <Testimonials />
      <Resources />
      <EnrollForm />
      <CTA />
      <Footer />
      <ChatBot />
    </main>
  );
}
