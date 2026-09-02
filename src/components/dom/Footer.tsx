import React from 'react';
import { ArrowUpRight, ArrowUp, Mail, Copy, Linkedin, Instagram, Facebook, Ghost } from 'lucide-react';
import { Language } from '../../store/useAppStore';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenContact }) => {
  const [copied, setCopied] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@maheshsain.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="footer" className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Full-Width Editorial Contact Header */}
      <div className="space-y-8 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-amber-300 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>LET'S TALK</span>
        </div>

        <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
          Interested in <br />
          <span className="font-serif italic font-normal bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
            Working Together?
          </span>
        </h2>

        <p className="text-base sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
          Drop a line or simply get in touch for international project inquiries, WebGL creative engineering, or design partnerships.
        </p>

        {/* Action CTA Row: Get In Touch + Email Copy Pill */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-white text-black hover:bg-cyan-400 transition-all duration-300 shadow-xl group"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4.5 h-4.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <div className="inline-flex items-center rounded-full bg-white/5 border border-white/15 p-1.5 backdrop-blur-md hover:border-amber-400/50 transition-all">
            <a
              href="mailto:hello@maheshsain.com"
              className="flex items-center gap-2.5 px-4 py-2 font-mono text-sm text-white hover:text-amber-300 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>hello@maheshsain.com</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black font-mono text-xs text-amber-300 transition-all flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/15 pt-10 text-xs text-gray-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-wide">Mahesh © 2026</span>
          <span className="text-amber-400">•</span>
          <span className="text-gray-300">Creative Developer</span>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="https://www.linkedin.com/in/mahesh-sain/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5 text-amber-400" />
            <span>mahesh-sain</span>
          </a>
          <a
            href="https://www.instagram.com/sain_4017/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-amber-400" />
            <span>sain_4017</span>
          </a>
          <a
            href="https://www.facebook.com/maheh.thakur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Facebook className="w-3.5 h-3.5 text-amber-400" />
            <span>mahesh thakur</span>
          </a>
          <a
            href="https://www.snapchat.com/add/M.sain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Ghost className="w-3.5 h-3.5 text-amber-400" />
            <span>M.sain</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 border border-white/15 hover:bg-amber-400 hover:text-black hover:border-amber-400 text-white transition-all ml-2"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
