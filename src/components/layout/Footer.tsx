import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSmoothScroll } from './SmoothScroll';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { MessageSquare, ArrowUp, Clock, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const [times, setTimes] = useState({ riyadh: '', dubai: '' });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const riyadhFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Riyadh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const dubaiFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      setTimes({
        riyadh: riyadhFormatter.format(now),
        dubai: dubaiFormatter.format(now),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-24 border-t border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-base)] overflow-hidden">
      {/* Subtle Ambient Gold Gradient */}
      <div className="absolute bottom-0 start-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[var(--color-gold-champagne)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top Row: Studio Identity & Live Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-gold-champagne)]/40 flex items-center justify-center text-[var(--color-gold-champagne)] font-bold text-lg font-heading">
                مِ
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-[var(--color-alabaster)]">
                {t.studioName}
              </span>
            </div>
            
            <p className="text-sm text-[var(--color-slate-titanium)] max-w-md leading-relaxed">
              {t.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-xs text-[var(--color-slate-titanium)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-whatsapp)] animate-pulse" />
              <span>{language === 'ar' ? 'متاحون لاستقبال المشاريع الجديدة' : 'Available for New Projects'}</span>
            </div>
          </div>

          {/* Live Studio Clocks & Locations */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--color-slate-titanium)]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-gold-champagne)]" />
                  <span>{language === 'ar' ? 'الرياض' : 'Riyadh'}</span>
                </span>
                <span className="font-mono text-[11px] text-[var(--color-gold-champagne)]">UTC+3</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-gold-champagne)]" />
                <span className="font-mono text-xl font-bold text-[var(--color-alabaster)] tracking-wider">
                  {times.riyadh || '--:--:--'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--color-slate-titanium)]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-gold-champagne)]" />
                  <span>{language === 'ar' ? 'دبي' : 'Dubai'}</span>
                </span>
                <span className="font-mono text-[11px] text-[var(--color-gold-champagne)]">UTC+4</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-gold-champagne)]" />
                <span className="font-mono text-xl font-bold text-[var(--color-alabaster)] tracking-wider">
                  {times.dubai || '--:--:--'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Row: Direct Conversion Shortcut */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-charcoal-surface)] via-[var(--color-charcoal-elevated)] to-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <h4 className="font-heading text-base font-bold text-[var(--color-alabaster)]">
              {language === 'ar' ? 'هل لديك فكرة أو مشروع رقمي تود مناقشته؟' : 'Have a digital project or vision to discuss?'}
            </h4>
            <p className="text-xs text-[var(--color-slate-titanium)]">
              {language === 'ar' ? 'فريقنا متاح للاستشارة المباشرة وتحديد نطاق العمل عبر واتساب فوراً.' : 'Our team is available for instant consultation and scoping via WhatsApp.'}
            </p>
          </div>

          <a
            href={getWhatsAppUrl(undefined, language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)]/90 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,211,102,0.25)] shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{language === 'ar' ? 'تحدث مباشرة عبر واتساب' : 'Chat Directly via WhatsApp'}</span>
          </a>
        </div>

        {/* Bottom Row: Copyright, Disclaimer & Back to Top */}
        <div className="pt-8 border-t border-[var(--color-charcoal-border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-slate-titanium)]">
          <div className="space-y-1 text-center sm:text-start">
            <div className="font-semibold text-[var(--color-alabaster)]">{t.footer.copyright}</div>
            <div className="text-[11px] text-[var(--color-slate-titanium)] max-w-xl">{t.footer.disclaimer}</div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">{t.footer.allRightsReserved}</span>
            <button
              onClick={() => scrollTo(0)}
              className="p-2.5 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[var(--color-slate-titanium)] hover:text-[var(--color-gold-champagne)] hover:border-[var(--color-gold-champagne)] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
