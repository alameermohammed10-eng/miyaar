import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] hover:border-[var(--color-gold-champagne)] hover:text-[var(--color-gold-champagne)] transition-all duration-200 text-sm font-medium text-[var(--color-slate-titanium)] cursor-pointer"
      aria-label="Toggle language between Arabic and English"
    >
      <Globe className="w-4 h-4 text-[var(--color-gold-champagne)]" />
      <span>{t.header.langToggle}</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-charcoal-elevated)] text-[var(--color-gold-champagne)] uppercase font-mono">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
};
