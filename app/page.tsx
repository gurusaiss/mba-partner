"use client";
import { useState } from "react";
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
import CATPage from "@/components/CATPage";

type Mode = "mba" | "cat";

export default function Home() {
  const [mode, setMode] = useState<Mode>("mba");

  return (
    <main>
      <Navbar mode={mode} setMode={setMode} />
      {mode === "mba" ? (
        <>
          <Hero />
          <Offerings />
          <HowItWorks />
          <Courses />
          <Mentors />
          <Testimonials />
          <Resources />
          <EnrollForm />
          <CTA />
        </>
      ) : (
        <CATPage />
      )}
      <Footer />
      <ChatBot />
    </main>
  );
}
