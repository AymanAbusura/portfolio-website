import { Routes, Route, useParams } from "react-router-dom";
import { Suspense, useEffect, lazy } from "react";
import { useTranslation } from "react-i18next";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Certification = lazy(() => import("./components/Certification"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Top = lazy(() => import("./components/Top"));

const Loader = () => (
  <div className="text-center text-ink p-4">
    <p>Loading...</p>
  </div>
);

function Page() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang.toUpperCase());
    }
  }, [lang, i18n]);

  return (
    <div className="relative z-0 bg-primary bg-grid-glow bg-no-repeat">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <Suspense fallback={<Loader />}>
        <About />
        <Experience />
        <Certification />
        <Tech />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
        <Top />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/:lang" element={<Page />} />
    </Routes>
  );
}
