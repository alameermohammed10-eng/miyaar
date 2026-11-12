import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '../motion/MotionWrappers';
import { Sparkles, Compass, Feather, Activity, Gauge } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Compass className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 1:
        return <Feather className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 2:
        return <Activity className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 3:
      default:
        return <Gauge className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
    }
  };

  return (
    <section id="about" className="relative py-24 scroll-mt-24 border-t border-[var(--color-charcoal-border)]/40 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 start-1/3 w-96 h-96 bg-[var(--color-gold-champagne)]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-xs text-[var(--color-gold-champagne)] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.aboutSection.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--color-alabaster)] tracking-tight leading-tight">
              {t.aboutSection.title}
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-slate-titanium)] leading-relaxed">
              {t.aboutSection.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Text */}
          <FadeIn direction="start" delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] space-y-6 relative overflow-hidden">
              <div className="text-sm font-semibold text-[var(--color-gold-champagne)] uppercase tracking-wider font-mono">
                The Miyaar Approach
              </div>

              <p className="text-lg font-medium text-[var(--color-alabaster)] leading-relaxed">
                {t.aboutSection.lead}
              </p>

              <p className="text-sm text-[var(--color-slate-titanium)] leading-relaxed">
                {t.aboutSection.body1}
              </p>

              <p className="text-sm text-[var(--color-slate-titanium)] leading-relaxed">
                {t.aboutSection.body2}
              </p>
            </div>
          </FadeIn>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="end" delay={0.2}>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--color-alabaster)]">
                {t.aboutSection.pillarsTitle}
              </h3>
            </FadeIn>

            <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.aboutSection.pillars.map((pillar, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full p-6 rounded-2xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-gold-champagne)]/40 transition-all duration-300 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)] flex items-center justify-center shadow-inner">
                      {getPillarIcon(idx)}
                    </div>
                    
                    <h4 className="font-heading text-base font-bold text-[var(--color-alabaster)]">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-[var(--color-slate-titanium)] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>

      </div>
    </section>
  );
};
