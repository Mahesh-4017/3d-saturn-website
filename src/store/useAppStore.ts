import { useState } from 'react';

export type Language = 'EN' | 'ES';
export type ProjectCategory = 'all' | '3d' | 'webgl' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  client: string;
  liveUrl: string;
  tags: string[];
  gradient: string;
  featured: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'nk-studio',
    title: '/nk.studio',
    category: '3d',
    year: '2026',
    description: 'Immersive 3D architectural portfolio & real-time WebGL studio website with interactive lighting and spatial sound.',
    client: 'NK Creative Studio',
    liveUrl: 'https://www.nk.studio/',
    tags: ['Three.js', 'R3F', 'GSAP', 'Lenis'],
    gradient: 'from-cyan-500/20 to-blue-600/20',
    featured: true,
  },
  {
    id: 'flixxo',
    title: 'Flixxo Platform',
    category: 'webgl',
    year: '2025',
    description: 'Decentralized video platform interface with micro-interactions, custom shader transitions, and motion storytelling.',
    client: 'Flixxo Labs',
    liveUrl: 'https://www.flixxo.com/',
    tags: ['React', 'WebGL', 'GLSL Shaders', 'Tailwind'],
    gradient: 'from-purple-500/20 to-pink-600/20',
    featured: true,
  },
  {
    id: 'suku-world',
    title: 'Suku Ecosystem',
    category: 'fullstack',
    year: '2025',
    description: 'Next-generation Web3 brand identity, 3D product showcase, and scroll-driven interactive launch website.',
    client: 'Suku Inc',
    liveUrl: 'https://www.suku.world/',
    tags: ['Next.js', 'Three.js', 'Design System', 'Framer Motion'],
    gradient: 'from-emerald-500/20 to-teal-600/20',
    featured: true,
  },
  {
    id: 'aura-sound',
    title: 'AURA Hyper-Sound',
    category: '3d',
    year: '2026',
    description: 'Exploded 3D audio hardware showcase with real-time material customizer and Web Audio sound synthesizer.',
    client: 'AURA Audio',
    liveUrl: '#',
    tags: ['R3F', 'Drei', 'Web Audio API', 'GSAP'],
    gradient: 'from-amber-500/20 to-orange-600/20',
    featured: true,
  },
];

export const useAppState = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  return {
    lang,
    setLang,
    selectedCategory,
    setSelectedCategory,
    activeProject,
    setActiveProject,
    isContactOpen,
    setIsContactOpen,
    wireframeMode,
    setWireframeMode,
  };
};
