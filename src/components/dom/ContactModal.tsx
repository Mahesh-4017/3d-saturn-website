import React, { useState } from 'react';
import { X, Send, Copy, Check, Mail } from 'lucide-react';
import { Language } from '../../store/useAppStore';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const email = 'hello@maheshsain.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-2xl font-extrabold text-white">
              {lang === 'EN' ? "Let's Build Something Together" : 'Construyamos algo juntos'}
            </h3>
            <p className="text-xs text-aura-muted mt-1">
              Have a project, 3D vision, or technical partnership in mind?
            </p>
          </div>

          {/* Direct Email Pill */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 text-xs font-mono text-white">
              <Mail className="w-4 h-4 text-aura-cyan" />
              <span>{email}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-aura-cyan hover:text-black text-xs font-mono text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-aura-cyan/10 border border-aura-cyan/30 text-center space-y-2">
              <div className="font-heading font-bold text-lg text-aura-cyan">Message Received!</div>
              <p className="text-xs text-gray-300">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-aura-muted uppercase mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name / Company"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-aura-cyan"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-aura-muted uppercase mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-aura-cyan"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-aura-muted uppercase mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your project or vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-aura-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-aura-cyan text-black font-bold text-sm hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
