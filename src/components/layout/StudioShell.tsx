import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '../../context/LanguageContext';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { MessageSquare } from 'lucide-react';

export const StudioShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[var(--color-charcoal-base)] text-[var(--color-alabaster)] flex flex-col selection:bg-[var(--color-gold-champagne)]/20 selection:text-[var(--color-gold-light)] overflow-x-hidden">
      
      {/* Ambient Canvas Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top Centered Subtle Gold Glow */}
        <div className="absolute -top-32 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[var(--color-gold-champagne)]/4 rounded-full blur-[140px]" />
        
        {/* Subtle Charcoal Vignette & Dot Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#2D3442_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 pt-24 sm:pt-28">
        {children}
      </main>

      {/* Floating Sticky WhatsApp Quick Action */}
      <aside 
        className="fixed bottom-6 start-6 z-40" 
        aria-label="Quick WhatsApp Contact"
      >
        <a
          href={getWhatsAppUrl(undefined, language)}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--color-charcoal-surface)]/95 hover:bg-[var(--color-charcoal-elevated)] border border-[var(--color-whatsapp)]/50 hover:border-[var(--color-whatsapp)] shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
        >
          {/* Radar Glow Ring */}
          <span className="absolute -inset-0.5 rounded-full bg-[var(--color-whatsapp)]/20 animate-ping opacity-75 pointer-events-none" />
          
          <div className="w-8 h-8 rounded-full bg-[var(--color-whatsapp)] flex items-center justify-center text-white shrink-0 shadow-md">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>

          <div className="flex flex-col text-start">
            <span className="text-[10px] text-[var(--color-slate-titanium)] font-medium leading-none">
              {language === 'ar' ? 'تواصل فوري' : 'Direct Chat'}
            </span>
            <span className="text-xs font-bold text-[var(--color-alabaster)] group-hover:text-[var(--color-gold-champagne)] transition-colors leading-tight">
              {language === 'ar' ? 'واتساب مِعيار' : 'WhatsApp'}
            </span>
          </div>
        </a>
      </aside>

      {/* Studio Footer */}
      <Footer />

    </div>
  );
};
