import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../../store/useAppStore';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollStep, setScrollStep] = useState<number>(0);
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section active range
      const isActive = rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.1;
      setIsSectionActive(isActive);

      if (!isActive) {
        setScrollStep(0);
        return;
      }

      // Compute normalized progress through the section
      const totalDist = rect.height - windowHeight * 0.4;
      const currentPos = (windowHeight * 0.85) - rect.top;
      const p = Math.min(1, Math.max(0, currentPos / totalDist));

      if (p < 0.18) {
        // Step 0: Only top details visible
        setScrollStep(0);
      } else if (p < 0.42) {
        // Step 1: Reveal Box 1 (WebGL & 3D) slowly
        setScrollStep(1);
      } else if (p < 0.66) {
        // Step 2: Reveal Box 2 (Scroll Narrative) slowly
        setScrollStep(2);
      } else if (p < 0.88) {
        // Step 3: Reveal Box 3 (Full Ownership) slowly
        setScrollStep(3);
      } else {
        // Step 4: Hide boxes (slide back down to bottom)
        setScrollStep(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[260vh] flex flex-col justify-between pt-28 pb-32 select-none"
    >
      {/* Top Editorial Split Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full grid md:grid-cols-12 gap-8 items-start pt-12">
        {/* Left Side Editorial Title */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-amber-300 tracking-widest uppercase">
            <span>PHILOSOPHY & CRAFT</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
            Immersive Web <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
        </div>

        {/* Right Side Editorial Headline & Intro */}
        <div className="md:col-span-6 md:col-start-7 space-y-4 pt-8 md:pt-0">
          <h3 className="font-serif italic text-3xl sm:text-4xl text-white font-normal leading-snug">
            From Ideation to Launch, <br />
            <span className="font-sans not-italic font-light text-gray-300">I've Got You Covered.</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
            Over 8 years building for the web — across startups, agencies, and global brands. I design and build web experiences that go beyond the expected — 3D scenes, scroll-driven narratives, and motion-rich interfaces that make people stop and pay attention.
          </p>
        </div>
      </div>

      {/* Transparent + Backdrop Blur Floating Glass Panel with Slow Smooth Staggered Scroll Reveal */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full max-h-[85vh] overflow-y-auto bg-black/80 backdrop-blur-2xl border-t border-amber-400/30 z-40 transition-all duration-1000 ease-out transform shadow-[0_-15px_50px_rgba(0,0,0,0.8)] ${isSectionActive && scrollStep > 0 && scrollStep < 4
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Column 1: WEBGL & 3D */}
          <div
            className={`p-5 sm:p-9 space-y-3 transition-all duration-1000 ease-out transform ${scrollStep >= 1
              ? 'translate-y-0 opacity-100'
              : 'translate-y-16 opacity-0 pointer-events-none'
              }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
                WebGL & 3D
              </h4>
              <span className="font-mono text-xs text-amber-400">01</span>
            </div>
            <p className="text-xs font-semibold text-amber-300">
              Real-time WebGL, Three.js shaders & interactive scenes.
            </p>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Real-time 3D scenes built for the web. Product visualizers, interactive environments, and narrative experiences that run in the browser without sacrificing performance across desktop and mobile.
            </p>
          </div>

          {/* Column 2: SCROLL NARRATIVE */}
          <div
            className={`p-5 sm:p-9 space-y-3 transition-all duration-1000 ease-out transform ${scrollStep >= 2
              ? 'translate-y-0 opacity-100'
              : 'translate-y-16 opacity-0 pointer-events-none'
              }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
                Scroll Narrative
              </h4>
              <span className="font-mono text-xs text-amber-400">02</span>
            </div>
            <p className="text-xs font-semibold text-amber-300">
              Pinned sections & smooth Lenis inertia.
            </p>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Scroll-driven narratives where every pixel of movement is intentional. Pinned sections, smooth Lenis inertia, and GSAP scroll storytelling where every animation step feels natural and responsive.
            </p>
          </div>

          {/* Column 3: FULL OWNERSHIP */}
          <div
            className={`p-5 sm:p-9 space-y-3 transition-all duration-1000 ease-out transform ${scrollStep >= 3
              ? 'translate-y-0 opacity-100'
              : 'translate-y-16 opacity-0 pointer-events-none'
              }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">
                Full Ownership
              </h4>
              <span className="font-mono text-xs text-amber-400">03</span>
            </div>
            <p className="text-xs font-semibold text-amber-300">
              End-to-end execution from Figma to code.
            </p>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              From initial concept and Figma visual design to high-performance production code. One engineer, end-to-end execution with meticulous attention to detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};





