import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSmoothScroll } from '../layout/SmoothScroll';
import { useMascot } from '../../context/MascotContext';
import { FadeIn, MagneticHover } from '../motion/MotionWrappers';
import { HeroCanvas3D } from '../ui/HeroCanvas3D';
import { MiyaarMascot } from '../mascot/MiyaarMascot';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { MessageSquare, ArrowDown, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const { triggerReaction, resetMood } = useMascot();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-6 pb-16 overflow-hidden">
      {/* 3D Geometric Prism Canvas Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-65 pointer-events-none">
        <div className="w-full max-w-4xl h-[620px]">
          <HeroCanvas3D />
        </div>
      </div>

      {/* Radial Gold Ambient Glow Behind Content */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[var(--color-gold-champagne)]/6 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Hero Main Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column (7 cols on desktop) */}
          <div className="lg:col-span-7 text-center lg:text-start space-y-8">
            
            {/* Availability Status Badge */}
            <FadeIn direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--color-charcoal-surface)]/90 backdrop-blur-md border border-[var(--color-gold-champagne)]/30 text-[var(--color-gold-champagne)] text-xs font-medium shadow-[0_0_20px_rgba(212,175,55,0.12)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-whatsapp)] animate-pulse" />
                <span>{t.hero.badge}</span>
                <span className="text-[10px] text-[var(--color-slate-titanium)] border-s border-[var(--color-charcoal-border)] ps-2 hidden sm:inline">
                  {t.hero.statusAvailability}
                </span>
              </div>
            </FadeIn>

            {/* Mobile Mascot Placement (Visible only on mobile/tablet) */}
            <div className="block lg:hidden py-2">
              <FadeIn direction="up" delay={0.15}>
                <MiyaarMascot size="sm" showSpeech={true} />
              </FadeIn>
            </div>

            {/* Main Headline with Luxury Gradient */}
            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight text-[var(--color-alabaster)] leading-[1.18] sm:leading-[1.14]">
                <span>{t.hero.titleMain}</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold-light)] via-[var(--color-gold-champagne)] to-[#B38F2A] drop-shadow-[0_4px_25px_rgba(212,175,55,0.25)]">
                  {t.hero.titleHighlight}
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn direction="up" delay={0.3}>
              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl text-[var(--color-slate-titanium)] leading-relaxed font-normal">
                {t.hero.description}
              </p>
            </FadeIn>

            {/* Dual Primary & Secondary CTAs with Mascot Interactions */}
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                <MagneticHover strength={0.25}>
                  <a
                    href={getWhatsAppUrl(undefined, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() =>
                      triggerReaction(
                        'happy',
                        language === 'ar'
                          ? 'تواصل معنا مباشرة عبر واتساب! 💬'
                          : 'Connect directly with us on WhatsApp! 💬'
                      )
                    }
                    onMouseLeave={resetMood}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--color-gold-champagne)] hover:bg-[var(--color-gold-light)] text-[var(--color-charcoal-base)] font-bold text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    <span>{t.hero.primaryCta}</span>
                  </a>
                </MagneticHover>

                <MagneticHover strength={0.15}>
                  <button
                    onClick={() => scrollTo('#services', { offset: -80 })}
                    onMouseEnter={() =>
                      triggerReaction(
                        'curious',
                        language === 'ar'
                          ? 'استكشف خدماتنا السبع المتخصصة 🚀'
                          : 'Discover our 7 core digital services 🚀'
                      )
                    }
                    onMouseLeave={resetMood}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-charcoal-surface)] hover:bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-gold-champagne)]/60 text-[var(--color-alabaster)] font-semibold text-sm sm:text-base transition-all cursor-pointer"
                  >
                    <span>{t.hero.secondaryCta}</span>
                    <ArrowDown className="w-4 h-4 text-[var(--color-gold-champagne)]" />
                  </button>
                </MagneticHover>

              </div>
            </FadeIn>

            {/* Core Technical Value Chips */}
            <FadeIn direction="up" delay={0.5}>
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[var(--color-slate-titanium)] font-medium">
                {t.hero.trustFeatures.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-charcoal-surface)]/80 border border-[var(--color-charcoal-border)]/70 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gold-champagne)] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>

          {/* Interactive Mascot Stage (5 cols on desktop) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
            <FadeIn direction="start" delay={0.25} className="w-full flex flex-col items-center">
              
              {/* Mascot Glass Pedestal Card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[var(--color-charcoal-surface)]/90 via-[var(--color-charcoal-surface)]/60 to-[var(--color-charcoal-base)]/90 border border-[var(--color-charcoal-border)] shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl flex flex-col items-center space-y-6 max-w-sm w-full">
                
                {/* Radial Glow Halo Behind Mascot */}
                <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-gold-champagne)]/15 rounded-full blur-2xl pointer-events-none" />

                {/* The Interactive 3D Mascot */}
                <MiyaarMascot size="md" showSpeech={true} />

                {/* Interactive Status Indicator & Accents */}
                <div className="w-full pt-4 border-t border-[var(--color-charcoal-border)]/70 grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-[var(--color-charcoal-base)]/80 border border-[var(--color-charcoal-border)] flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-gold-champagne)] shrink-0" />
                    <span className="text-[var(--color-slate-titanium)]">{language === 'ar' ? 'معيار مِعيار' : 'Miyaar Std'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--color-charcoal-base)]/80 border border-[var(--color-charcoal-border)] flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-whatsapp)] shrink-0" />
                    <span className="text-[var(--color-slate-titanium)]">{language === 'ar' ? 'تفاعل حي' : 'Interactive'}</span>
                  </div>
                </div>

              </div>

            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
