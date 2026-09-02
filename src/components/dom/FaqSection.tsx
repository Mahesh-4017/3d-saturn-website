import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../../store/useAppStore';

interface FaqSectionProps {
  lang: Language;
}

const FAQ_ITEMS = [
  {
    q: 'What services do you offer as a Creative Developer?',
    a: 'I specialize in full-stack design engineering — interactive 3D WebGL experiences, custom GLSL shaders, scroll-driven storytelling, motion-rich design systems, and high-performance marketing web applications.',
  },
  {
    q: 'How long does a custom 3D WebGL website take to complete?',
    a: 'A typical project timeline ranges between 3 to 6 weeks, depending on complexity. This includes initial concept design, 3D modeling/shaders, interaction prototyping, and full production build with cross-browser optimization.',
  },
  {
    q: 'Can you partner with existing design agencies or product teams?',
    a: 'Yes, absolutely. I frequently collaborate with creative agencies, design studios, and tech startups as a specialized 3D WebGL & frontend engineering partner to execute ambitious interactive web visions.',
  },
  {
    q: 'What technology stack do you use for 3D web applications?',
    a: 'My core stack built for speed and performance includes React, Next.js / Vite, Three.js, React Three Fiber (R3F), Drei, custom GLSL Shaders, GSAP animation timelines, Lenis smooth scroll, and Tailwind CSS.',
  },
  {
    q: 'Do you take on full end-to-end design and development projects?',
    a: 'Yes! I manage the complete product journey — from initial visual identity and 3D scene mockups in Figma/Blender to final code deployment and performance tuning.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Sticky Section Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-amber-300 tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ / PRE-PROJECT INFO</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Everything You Need <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
              To Know Before We Begin
            </span>
          </h2>

          <p className="text-gray-300 font-light text-sm sm:text-lg leading-relaxed max-w-md">
            Common questions regarding timeline, WebGL tech stacks, partnership models, and end-to-end delivery process.
          </p>

          <div className="pt-2 sm:pt-4 flex items-center gap-3 text-xs font-mono text-gray-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Have custom inquiries? Feel free to drop a line below.</span>
          </div>
        </div>

        {/* Right Column: Numbered Editorial Accordion */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            const stepNum = (idx + 1).toString().padStart(2, '0');

            return (
              <div
                key={idx}
                className={`group rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-black/60 backdrop-blur-xl border-amber-400/40 shadow-2xl shadow-amber-500/5'
                    : 'bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-8 text-left flex items-start justify-between gap-4 sm:gap-6 focus:outline-none"
                >
                  <div className="flex items-start gap-3 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm font-bold text-amber-400/80 pt-0.5 sm:pt-1">
                      {stepNum}
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.q}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 p-2 sm:p-2.5 rounded-xl transition-all duration-300 ${
                      isOpen
                        ? 'bg-amber-400 text-black rotate-180 shadow-[0_0_15px_#fde047]'
                        : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}
                  >
                    <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed font-light border-t border-white/10 mt-2 animate-fadeIn">
                    <p className="pl-8 sm:pl-12 border-l-2 border-amber-400/30">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
