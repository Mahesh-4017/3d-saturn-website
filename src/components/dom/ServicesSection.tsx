import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../../store/useAppStore';

interface ServicesSectionProps {
  lang: Language;
}

interface ServiceItem {
  title: string;
  desc: string;
  category: string;
  categoryNumber: string;
}

const ALL_SERVICES: ServiceItem[] = [
  // Group 1: Immersive Web Experiences
  {
    category: 'Immersive Web Experiences',
    categoryNumber: '01',
    title: '3D Interactive Experiences',
    desc: 'Real-time 3D scenes built for the web. Product visualizers, interactive environments, and narrative experiences that run smoothly in the browser.',
  },
  {
    category: 'Immersive Web Experiences',
    categoryNumber: '01',
    title: 'WebGL & Shader Effects',
    desc: 'Custom GLSL shaders for transitions, distortions, particle systems, and post-processing effects that elevate brand presence.',
  },
  {
    category: 'Immersive Web Experiences',
    categoryNumber: '01',
    title: 'Scroll Storytelling',
    desc: 'Scroll-driven narratives where every pixel of movement is intentional. Sequential animations, pinned sections, and parallax.',
  },

  // Group 2: Premium Websites
  {
    category: 'Premium Websites',
    categoryNumber: '02',
    title: 'Creative Marketing Sites',
    desc: 'Launch sites and product pages where visual impact is the primary driver. Built from scratch with motion and 3D when projects call for it.',
  },
  {
    category: 'Premium Websites',
    categoryNumber: '02',
    title: 'Portfolio & Brand Sites',
    desc: 'Identity-driven design, fluid page transitions, and performance built-in for studios, agencies, and creative leaders.',
  },
  {
    category: 'Premium Websites',
    categoryNumber: '02',
    title: 'Motion-rich Interfaces',
    desc: 'UIs where motion is part of the core design language — animated components, micro-interactions, and tactile gesture feedback.',
  },

  // Group 3: Design + Development
  {
    category: 'Design + Development',
    categoryNumber: '03',
    title: 'Full Design & Build',
    desc: 'One person. Full ownership. From concept to launch — visual design, interaction design, and high-performance WebGL code.',
  },
  {
    category: 'Design + Development',
    categoryNumber: '03',
    title: 'Creative Dev Partnership',
    desc: 'Partnering with agencies as a technical collaborator to execute 3D, WebGL shaders, and complex animations.',
  },
  {
    category: 'Design + Development',
    categoryNumber: '03',
    title: 'Visual Design Systems',
    desc: 'Brand-aligned visual design delivered in production-ready Figma specs with technical awareness for seamless implementation.',
  },
];

interface TimelineItemProps {
  item: ServiceItem;
  index: number;
}

const ServiceTimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative w-full my-4 md:my-10">
      {/* Central Y-Axis Glowing Node Dot */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 border-2 border-black shadow-[0_0_15px_#fde047] z-20 hidden md:flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      </div>

      {/* Alternating Card Container */}
      <div
        className={`w-full md:w-[46%] ${isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
          }`}
      >
        <div
          className={`card-3d-tilt group p-5 sm:p-9 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-all duration-700 ease-out space-y-3 sm:space-y-4 overflow-hidden transform ${inView
            ? 'translate-x-0 translate-y-0 opacity-100 scale-100'
            : isLeft
              ? 'translate-y-8 md:translate-y-0 md:-translate-x-[220px] opacity-0 pointer-events-none scale-95'
              : 'translate-y-8 md:translate-y-0 md:translate-x-[220px] opacity-0 pointer-events-none scale-95'
            }`}
        >
          {/* Category Tag */}
          <div
            className={`flex items-center gap-2 text-xs font-mono text-amber-300/90 ${isLeft ? 'md:justify-end' : 'md:justify-start'
              }`}
          >
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono">
              {item.categoryNumber} • {item.category}
            </span>
          </div>

          {/* Service Title */}
          <h3 className="font-serif italic text-xl sm:text-3xl font-normal text-white group-hover:text-amber-300 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang }) => {
  return (
    <section
      id="services"
      className="relative py-16 sm:py-32 px-4 sm:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-20 select-none overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-gray-300 tracking-wider">
          <span>CAPABILITIES & SERVICES</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.12]">
          From Ideation to Launch, <br />
          <span className="font-sans not-italic font-light text-gray-300">
            I've Got You Covered.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-xl mx-auto">
          Designing and building web experiences that go beyond the expected — 3D scenes, scroll narratives, and motion interfaces.
        </p>
      </div>

      {/* Central Y-Axis Timeline Grid */}
      <div className="relative pt-8">
        {/* Glowing Central Y-Axis Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent -translate-x-1/2 hidden md:block" />

        {/* Services Timeline List */}
        <div className="space-y-4">
          {ALL_SERVICES.map((service, index) => (
            <ServiceTimelineItem key={index} item={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

