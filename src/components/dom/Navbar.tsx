import React, { useState } from 'react';
import { Eye, Menu, X, ArrowUpRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Language } from '../../store/useAppStore';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  wireframeMode: boolean;
  setWireframeMode: (val: boolean) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  wireframeMode,
  setWireframeMode,
  onOpenContact,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navLinks = [
    { id: 'about', label: lang === 'EN' ? 'About' : 'Acerca', num: '01' },
    { id: 'services', label: lang === 'EN' ? 'Services' : 'Servicios', num: '02' },
    { id: 'work', label: lang === 'EN' ? 'Work' : 'Proyectos', num: '03' },
    { id: 'process', label: lang === 'EN' ? 'Process' : 'Proceso', num: '04' },
    { id: 'faq', label: 'FAQ', num: '05' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Top Left: Brand Name */}
          <ScrollLink
            to="hero"
            smooth={true}
            duration={800}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-heading font-semibold text-lg sm:text-xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
              Mahesh
            </span>
          </ScrollLink>

          {/* Top Right Controls: Wireframe, EN/ES, & Clean White Menu Icon Only */}
          <div className="flex items-center gap-6">
            {/* Wireframe 3D Toggle */}
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                wireframeMode
                  ? 'bg-white/20 text-white border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
              }`}
              title="Toggle 3D Wireframe Mesh"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3D Wireframe</span>
            </button>

            {/* Language Selector (EN / ES) */}
            <div className="flex items-center gap-1 text-xs font-mono tracking-wider">
              <button
                onClick={() => setLang('EN')}
                className={`transition-colors ${
                  lang === 'EN' ? 'text-white font-bold underline underline-offset-4 decoration-white/60' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-gray-600">/</span>
              <button
                onClick={() => setLang('ES')}
                className={`transition-colors ${
                  lang === 'ES' ? 'text-white font-bold underline underline-offset-4 decoration-white/60' : 'text-gray-400 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            {/* Clean White Menu Icon Only (No Background, No Yellow) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:text-gray-300 p-1.5 transition-transform hover:scale-110 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop Dimmed Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-500 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Ultra-Professional Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[320px] sm:max-w-sm sm:w-96 bg-[#040406]/95 backdrop-blur-3xl border-l border-white/10 z-50 shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-500 ease-out transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">
            NAVIGATION
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col gap-6 py-6">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.id}
              to={link.id}
              smooth={true}
              duration={800}
              spy={true}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center justify-between text-2xl sm:text-3xl font-heading font-light text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">
                  {link.num}
                </span>
                <span className="group-hover:font-normal">{link.label}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </ScrollLink>
          ))}

          {/* Contact Link inside Sidebar */}
          <button
            onClick={() => {
              setIsSidebarOpen(false);
              onOpenContact();
            }}
            className="flex items-center justify-between text-2xl sm:text-3xl font-heading font-light text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer group pt-2"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">
                06
              </span>
              <span className="group-hover:font-normal">{lang === 'EN' ? 'Contact' : 'Contacto'}</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
              SAY HELLO
            </span>
            <a
              href="mailto:hello@maheshsain.com"
              className="text-sm font-mono text-white hover:text-gray-300 hover:underline block transition-colors"
            >
              hello@maheshsain.com
            </a>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">© 2026 Mahesh</span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setLang('EN')}
                className={lang === 'EN' ? 'text-white font-bold' : 'text-gray-600'}
              >
                EN
              </button>
              <span className="text-gray-700">/</span>
              <button
                onClick={() => setLang('ES')}
                className={lang === 'ES' ? 'text-white font-bold' : 'text-gray-600'}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
