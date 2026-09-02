import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../store/useAppStore';

interface ProcessSectionProps {
  lang: Language;
}

interface ProcessStep {
  step: string;
  milestone: string;
  title: string;
  desc: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    milestone: 'Milestone 01',
    title: 'Discovery',
    desc: 'Understanding your goals, target audience, and constraints before touching a single line of code or pixel.',
  },
  {
    step: '02',
    milestone: 'Milestone 02',
    title: 'Concept & Design',
    desc: 'Visual direction, motion prototypes, and 3D scene mockups. You see and feel the experience before full build.',
  },
  {
    step: '03',
    milestone: 'Milestone 03',
    title: 'Development',
    desc: 'Pixel-perfect WebGL / Three.js implementation, GSAP motion timelines, and responsive optimization.',
  },
  {
    step: '04',
    milestone: 'Milestone 04',
    title: 'Launch & Beyond',
    desc: 'Deployment, cross-browser testing, SEO performance tuning, and post-launch support.',
  },
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0); // 0 to 1 progress inside active step

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(0.99, Math.max(0, scrolled / totalScrollable));

      // 4 steps split evenly across scroll height
      const rawStep = progress * 4;
      const currentIdx = Math.min(3, Math.floor(rawStep));
      const currentProg = rawStep % 1;

      setActiveStep(currentIdx);
      setStepProgress(currentProg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIsLeft = activeStep % 2 === 0;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative h-[480vh] w-full select-none"
    >
      {/* Sticky Full-Screen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 sm:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 z-30 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-gray-300 tracking-wider">
            <span>WORKFLOW & METHODOLOGY</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.12]">
            A Process Built Around <br />
            <span className="font-sans not-italic font-light text-gray-300">
              Clarity and Craft
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-xl mx-auto">
            No surprises, no handoff chaos. Just a clear path from the first conversation to a product that works.
          </p>
        </div>

        {/* Dynamic Opposite Ambient Glow Shift */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full bg-gradient-to-br from-amber-400/20 via-cyan-400/15 to-transparent blur-3xl pointer-events-none transition-all duration-1000 ease-out z-10 ${currentIsLeft
            ? 'right-4 sm:right-16 translate-x-0 scale-110'
            : 'left-4 sm:left-16 translate-x-0 scale-110'
            }`}
        />

        {/* Sticky Stage Timeline Content */}
        <div className="relative flex-1 flex items-center justify-between my-6 z-20 w-full max-w-6xl mx-auto">
          {/* Central Y-Axis Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent -translate-x-1/2 hidden md:block z-10" />

          {/* Render Active Process Step Card */}
          {PROCESS_STEPS.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isActive = index === activeStep;

            // Entrance / Exit interpolation
            let transformClass = '';
            let opacityClass = 'opacity-0 pointer-events-none';

            if (isActive) {
              if (stepProgress < 0.2) {
                // Entering
                transformClass = 'translate-y-8 md:translate-y-0 opacity-30 scale-95 ' + (isLeft ? 'md:-translate-x-[60vw]' : 'md:translate-x-[60vw]');
              } else if (stepProgress > 0.8) {
                // Exiting
                transformClass = 'translate-y-8 md:translate-y-0 opacity-0 scale-95 ' + (isLeft ? 'md:-translate-x-[60vw]' : 'md:translate-x-[60vw]');
              } else {
                // Fully active in position
                transformClass = 'translate-x-0 translate-y-0 scale-100 opacity-100 z-30';
              }
            } else {
              // Inactive steps
              transformClass = 'translate-y-12 md:translate-y-0 opacity-0 pointer-events-none ' + (isLeft ? 'md:-translate-x-[80vw]' : 'md:translate-x-[80vw]');
            }

            return (
              <div
                key={item.step}
                className={`absolute w-full md:w-[46%] left-0 right-0 md:left-auto md:right-auto ${isLeft ? 'md:left-0' : 'md:right-0'
                  } transition-all duration-700 ease-out ${transformClass}`}
              >
                <div className="group relative p-5 sm:p-9 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400/20 transition-all duration-300 space-y-4 sm:space-y-6 select-none overflow-hidden">
                  {/* Glowing Vertical Accent Line */}
                  <div
                    className={`absolute top-0 bottom-0 w-1 bg-amber-400/60 ${isLeft ? 'left-0 md:left-auto md:right-0' : 'left-0'
                      }`}
                  />

                  {/* Giant Translucent Background Step Number */}
                  <span
                    className={`font-mono text-6xl sm:text-[10rem] font-extrabold text-amber-400/10 absolute -top-4 sm:-top-8 pointer-events-none select-none transition-colors duration-500 ${isLeft ? 'left-4 md:left-auto md:right-4' : 'left-4'
                      }`}
                  >
                    {item.step}
                  </span>

                  {/* Top Tag & Scroll Indicator */}
                  <div className="relative z-20 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] sm:text-xs font-mono text-amber-300 tracking-wider">
                      STEP {item.step} OF 04
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <span>Scroll for next</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="relative z-20 font-serif italic text-3xl sm:text-6xl font-normal text-white group-hover:text-amber-300 transition-colors duration-300 tracking-tight leading-tight">
                    {item.title}
                  </h3>

                  {/* Description Text */}
                  <p className="relative z-20 text-xs sm:text-lg text-gray-300 font-light leading-relaxed max-w-lg">
                    {item.desc}
                  </p>

                  {/* Bottom Milestone Indicator */}
                  <div className="relative z-20 pt-4 sm:pt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono text-gray-300">
                    <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>{item.milestone}</span>
                    </div>
                    <span className="text-gray-400 text-[10px] sm:text-[11px] tracking-widest">
                      STAGE {item.step} / 04
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Step Indicator Dots */}
        {/* <div className="z-30 pb-4 flex items-center justify-center gap-3">
          {PROCESS_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeStep
                ? 'w-10 bg-amber-400 shadow-[0_0_10px_#fde047]'
                : 'w-2 bg-white/20'
                }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

