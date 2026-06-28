"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import HowItWorks from "@/components/HowItWorks";
import Courses, { courses } from "@/components/Courses";
import CourseComparison from "@/components/CourseComparison";
import GroupOffer from "@/components/GroupOffer";
import USPPopup from "@/components/USPPopup";
import Mentors from "@/components/Mentors";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import CollegeCollab from "@/components/CollegeCollab";
import FAQs from "@/components/FAQs";
import FreeMaterialBanner from "@/components/FreeMaterialBanner";
import Resources from "@/components/Resources";
import EnrollForm from "@/components/EnrollForm";
import CTA from "@/components/CTA";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import CATPage from "@/components/CATPage";
import ModeSelector from "@/components/ModeSelector";
import Ticker from "@/components/Ticker";

type Mode = "mba" | "cat";

export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [comparedIds, setComparedIds] = useState<number[]>([]);
  const [uspClosed, setUspClosed] = useState(false);

  const handleCompareToggle = (id: number) => {
    setComparedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const scrollToCourses = () => {
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Mode selector popup shown until user picks */}
      {mode === null && <ModeSelector onSelect={setMode} />}

      {mode !== null && (
        <>
          {/* USP popup shown once per session on MBA mode */}
          {mode === "mba" && !uspClosed && (
            <USPPopup onClose={() => setUspClosed(true)} />
          )}

          <Navbar mode={mode} setMode={setMode} />
          {mode === "mba" ? (
            <>
              <FreeMaterialBanner />
              <Hero />
              <Ticker />
              <Offerings />
              <HowItWorks />
              <Courses
                comparedIds={comparedIds}
                onCompareToggle={handleCompareToggle}
              />
              <CourseComparison
                selectedIds={comparedIds}
                courses={courses}
                onRemove={(id) => setComparedIds(prev => prev.filter(x => x !== id))}
                onAdd={scrollToCourses}
              />
              <GroupOffer />
              <Mentors />
              <Testimonials />
              <VideoTestimonials />
              <CollegeCollab />
              <FAQs />
              <Resources />
              <EnrollForm />
              <CTA />
            </>
          ) : (
            <CATPage />
          )}
          <Footer />
          <ChatBot />
        </>
      )}
    </main>
  );
}
