import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language, ProjectCategory, FEATURED_PROJECTS, Project } from '../../store/useAppStore';

interface WorkSectionProps {
  lang: Language;
  selectedCategory: ProjectCategory;
  setSelectedCategory: (cat: ProjectCategory) => void;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`card-3d-tilt group relative p-5 sm:p-10 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-400/40 transition-all duration-700 ease-out flex flex-col justify-between space-y-6 sm:space-y-8 overflow-hidden transform ${
        inView
          ? 'translate-x-0 translate-y-0 opacity-100 scale-100'
          : isLeft
          ? 'translate-y-8 md:translate-y-0 md:-translate-x-[220px] opacity-0 pointer-events-none scale-95'
          : 'translate-y-8 md:translate-y-0 md:translate-x-[220px] opacity-0 pointer-events-none scale-95'
      }`}
    >
      {/* Top Info */}
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-mono text-gray-400">
            {project.client} • {project.year}
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-amber-400 hover:text-amber-300 text-[11px] sm:text-xs font-mono text-white transition-all duration-300 hover:scale-105"
          >
            <span>See Live</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <h3 className="font-serif italic text-2xl sm:text-4xl font-normal text-white group-hover:text-amber-300 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Tag Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-4 sm:pt-6 border-t border-white/10">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono text-gray-300 group-hover:border-amber-400/30 group-hover:text-amber-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const WorkSection: React.FC<WorkSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const filteredProjects =
    selectedCategory === 'all'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  const categories: ProjectCategory[] = ['all', '3d', 'webgl', 'fullstack'];

  return (
    <section
      id="work"
      className="relative py-16 sm:py-32 px-4 sm:px-12 max-w-7xl mx-auto space-y-10 sm:space-y-16 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <div className="space-y-3 sm:space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-gray-300 tracking-wider">
            <span>FEATURED WORKS</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.12]">
            Creating Experiences <br />
            <span className="font-sans not-italic font-light text-gray-300">
              That People Love to Use
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Starting from the user's perspective to build digital products, platforms, and interactive experiences.
          </p>
        </div>

        {/* Filter Pill Buttons (Horizontally scrollable on mobile) */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/15 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Individual Left / Right Scroll Entrance Animation */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};



