import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../../store/useAppStore';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-12 max-w-7xl mx-auto select-none overflow-hidden">
      {/* 4 Corner Framing Crop Marks (matching ricardochance.com UI framing) */}
      <div className="absolute top-16 sm:top-20 left-2 sm:left-4 w-3 h-3 border-t-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute top-16 sm:top-20 right-2 sm:right-4 w-3 h-3 border-t-2 border-r-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-4 sm:bottom-6 left-2 sm:left-4 w-3 h-3 border-b-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 w-3 h-3 border-b-2 border-r-2 border-white/20 pointer-events-none" />

      {/* Main Split Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start my-auto z-10 pointer-events-auto pt-4 sm:pt-0">
        {/* Left Side: Role + Serif Italic Headline + Pill Buttons */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Subhead Role */}
          <div className="text-xs sm:text-sm font-mono text-gray-300 tracking-wide">
            Design Engineer & Creative Developer
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-serif italic text-3xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            I build web <br />
            experiences <span className="font-sans not-italic font-light text-gray-300">people</span> <br />
            remember.
          </h1>

          {/* Action Buttons (Pill Outlined Style) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href="#contact"
              className="px-7 py-3 rounded-full text-xs font-mono text-white border border-white/30 hover:border-amber-400 hover:text-amber-300 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 text-center"
            >
              Start a project
            </a>

            <a
              href="#work"
              className="px-7 py-3 rounded-full text-xs font-mono text-white border border-white/30 hover:border-amber-400 hover:text-amber-300 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 text-center"
            >
              View work
            </a>
          </div>
        </div>

        {/* Right Side: Bottom Right Bio Text */}
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end pt-4 lg:pt-0">
          <div className="p-5 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-3 w-full max-w-md ml-0 lg:ml-auto">
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              I work at the intersection of design and code. 3D scenes, scroll-driven narratives, and motion-rich interfaces built with care for every detail. Not just functional — crafted.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-gray-400 border-t border-white/10 pt-4 z-10 pointer-events-auto">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span>Based in Buenos Aires</span>
          <span className="text-amber-400">•</span>
          <span>Available Worldwide</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>Client Partners:</span>
          <span className="text-white hover:text-amber-300 cursor-pointer">/nk.studio</span>
          <span>•</span>
          <span className="text-white hover:text-amber-300 cursor-pointer">Flixxo</span>
          <span>•</span>
          <span className="text-white hover:text-amber-300 cursor-pointer">Suku</span>
        </div>
      </div>
    </section>
  );
};
