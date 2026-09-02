import React, { useState } from 'react';
import { useAppState } from './store/useAppStore';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Preloader Screen
import { LoadingScreen } from './components/dom/LoadingScreen';

// 3D Canvas Background
import { SceneCanvas } from './components/canvas/SceneCanvas';

// DOM Sections
import { Navbar } from './components/dom/Navbar';
import { HeroSection } from './components/dom/HeroSection';
import { AboutSection } from './components/dom/AboutSection';
import { WorkSection } from './components/dom/WorkSection';
import { ServicesSection } from './components/dom/ServicesSection';
import { ProcessSection } from './components/dom/ProcessSection';
import { FaqSection } from './components/dom/FaqSection';
import { Footer } from './components/dom/Footer';
import { ContactModal } from './components/dom/ContactModal';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  const {
    lang,
    setLang,
    selectedCategory,
    setSelectedCategory,
    isContactOpen,
    setIsContactOpen,
    wireframeMode,
    setWireframeMode,
  } = useAppState();

  return (
    <div className="relative min-h-screen bg-[#010206] text-[#f0f4f8] selection:bg-amber-400 selection:text-black font-sans">
      {/* Signature Preloader Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 3D WebGL Saturn Night Sky Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <SceneCanvas wireframeMode={wireframeMode} />
      </div>

      {/* DOM Content Overlay */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar
            lang={lang}
            setLang={setLang}
            wireframeMode={wireframeMode}
            setWireframeMode={setWireframeMode}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>

        <HeroSection lang={lang} />

        {/* Blank transition section for 3D Saturn disintegration & particle constellation morph */}
        <section id="space-transition" className="h-screen w-full pointer-events-none" />

        <div className="pointer-events-auto">
          <AboutSection lang={lang} />
          <WorkSection
            lang={lang}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Blank transition space between Work & Services featuring 3D Moon/Star particle morph & ambient glow shift */}
          <section id="work-services-transition" className="relative h-screen w-full flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-br from-amber-400/25 via-cyan-400/15 to-transparent blur-3xl shadow-[0_0_120px_#fde047] animate-pulse" />
          </section>

          <ServicesSection lang={lang} />
          <ProcessSection lang={lang} />

          {/* Clean blank space section right before FAQ ("Everything You Need To Know Before We Begin") */}
          <section id="faq-blank-transition" className="relative h-screen w-full pointer-events-none" />

          <FaqSection lang={lang} />
          <Footer
            lang={lang}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>
      </div>

      {/* Interactive Contact Drawer Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
