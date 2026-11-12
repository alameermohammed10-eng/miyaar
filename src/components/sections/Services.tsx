import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMascot } from '../../context/MascotContext';
import { FadeIn, StaggerContainer, StaggerItem, TiltCard } from '../motion/MotionWrappers';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { 
  Globe, 
  ShoppingBag, 
  UtensilsCrossed, 
  QrCode, 
  CalendarCheck, 
  Gamepad2, 
  Building2, 
  ArrowUpRight, 
  Check, 
  Sparkles 
} from 'lucide-react';

export const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const { triggerReaction, resetMood } = useMascot();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'web-design-dev':
        return <Globe className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'ecommerce':
        return <ShoppingBag className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'restaurants-cafes':
        return <UtensilsCrossed className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'digital-menus':
        return <QrCode className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'booking-systems':
        return <CalendarCheck className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'educational-interactive':
        return <Gamepad2 className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      case 'corporate-business':
        return <Building2 className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--color-gold-champagne)]" />;
    }
  };

  return (
    <section id="services" className="relative py-20 scroll-mt-24">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/3 start-0 w-80 h-80 bg-[var(--color-gold-champagne)]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-xs text-[var(--color-gold-champagne)] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.servicesSection.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--color-alabaster)] tracking-tight leading-tight">
              {t.servicesSection.title}
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-slate-titanium)] leading-relaxed">
              {t.servicesSection.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* 7 Services Grid with 3D Tilt & Mascot Reactions */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.services.map((service, index) => (
            <StaggerItem key={service.id} className={index === 6 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <TiltCard
                maxTilt={6}
                onHover={() =>
                  triggerReaction(
                    'happy',
                    language === 'ar'
                      ? `خدمة ${service.title} ✨`
                      : `Exploring ${service.title} ✨`,
                    2200
                  )
                }
                onLeave={resetMood}
                className="h-full"
              >
                <div className="group relative h-full p-8 rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-gold-champagne)]/60 transition-all duration-300 flex flex-col justify-between space-y-8 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden">
                  
                  {/* Subtle Amber Glow Highlight */}
                  <div className="absolute -top-16 -end-16 w-36 h-36 bg-[var(--color-gold-champagne)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-gold-champagne)]/15 transition-all duration-500 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Card Header: Icon & Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)] flex items-center justify-center group-hover:border-[var(--color-gold-champagne)]/40 transition-colors shadow-inner">
                        {getServiceIcon(service.id)}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-charcoal-elevated)] text-[var(--color-gold-champagne)] font-bold border border-[var(--color-charcoal-border)]">
                          {service.number}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-medium text-[var(--color-gold-champagne)] block mb-1">
                        {service.category}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--color-alabaster)] group-hover:text-[var(--color-gold-light)] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--color-slate-titanium)] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Benefits Checklist */}
                    <div className="space-y-2 pt-2 border-t border-[var(--color-charcoal-border)]/60">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-slate-titanium)]">
                        {t.servicesSection.exploreBenefits}
                      </div>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-[var(--color-slate-titanium)] flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[var(--color-gold-champagne)] shrink-0 mt-0.5" />
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action: WhatsApp Inquiry */}
                  <div className="relative z-10 pt-4 border-t border-[var(--color-charcoal-border)]">
                    <a
                      href={getWhatsAppUrl(service.whatsappMessage, language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-[var(--color-charcoal-elevated)] hover:bg-[var(--color-gold-champagne)] hover:text-[var(--color-charcoal-base)] text-xs font-bold text-[var(--color-alabaster)] transition-all group/btn shadow-sm"
                    >
                      <span>{t.servicesSection.orderCta}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>

                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
