import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '../motion/MotionWrappers';
import { 
  Sparkles, 
  Code2, 
  Zap, 
  MessageSquare, 
  Smartphone, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const getPointIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 1:
        return <Zap className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 2:
        return <MessageSquare className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 3:
        return <Smartphone className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 4:
        return <ShieldCheck className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 5:
      default:
        return <HeartHandshake className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
    }
  };

  return (
    <section id="why-us" className="relative py-24 scroll-mt-24 border-t border-[var(--color-charcoal-border)]/40">
      {/* Background Lighting */}
      <div className="absolute top-1/2 start-0 w-80 h-80 bg-[var(--color-gold-champagne)]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-xs text-[var(--color-gold-champagne)] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.whyChooseSection.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--color-alabaster)] tracking-tight">
                {t.whyChooseSection.title}
              </h2>

              <p className="text-base sm:text-lg text-[var(--color-slate-titanium)] leading-relaxed">
                {t.whyChooseSection.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-charcoal-surface)] border border-[var(--color-gold-champagne)]/30 max-w-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-champagne)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-slate-titanium)] leading-relaxed">
                {t.whyChooseSection.guaranteeNote}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* 6 Tangible Points Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.whyChooseSection.points.map((point, index) => (
            <StaggerItem key={index}>
              <div className="h-full p-8 rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-gold-champagne)]/50 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)] flex items-center justify-center shadow-inner">
                      {getPointIcon(index)}
                    </div>

                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[var(--color-charcoal-elevated)] text-[var(--color-gold-champagne)] border border-[var(--color-gold-champagne)]/20 font-semibold">
                      {point.badgeText}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[var(--color-alabaster)]">
                    {point.title}
                  </h3>

                  <p className="text-sm text-[var(--color-slate-titanium)] leading-relaxed">
                    {point.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-charcoal-border)]/50 text-[11px] text-[var(--color-gold-champagne)] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-champagne)]" />
                  <span>معيار مِعيار للجودة</span>
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
