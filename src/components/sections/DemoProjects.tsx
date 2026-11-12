import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMascot } from '../../context/MascotContext';
import { FadeIn, StaggerContainer, StaggerItem, TiltCard } from '../motion/MotionWrappers';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { DemoProject } from '../../types/i18n';
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Coffee, 
  Building, 
  ShoppingBag, 
  Calendar, 
  Gamepad2, 
  ArrowUpRight,
  X
} from 'lucide-react';

export const DemoProjects: React.FC = () => {
  const { t, language } = useLanguage();
  const { triggerReaction, resetMood } = useMascot();
  const [activeModalProject, setActiveModalProject] = useState<DemoProject | null>(null);

  const getMockupIcon = (type: DemoProject['mockupType']) => {
    switch (type) {
      case 'cafe':
        return <Coffee className="w-8 h-8 text-[var(--color-gold-champagne)]" />;
      case 'corporate':
        return <Building className="w-8 h-8 text-[var(--color-gold-champagne)]" />;
      case 'ecommerce':
        return <ShoppingBag className="w-8 h-8 text-[var(--color-gold-champagne)]" />;
      case 'booking':
        return <Calendar className="w-8 h-8 text-[var(--color-gold-champagne)]" />;
      case 'interactive':
        return <Gamepad2 className="w-8 h-8 text-[var(--color-gold-champagne)]" />;
    }
  };

  return (
    <section id="showcase" className="relative py-24 scroll-mt-24 border-t border-[var(--color-charcoal-border)]/40">
      {/* Background Glow */}
      <div className="absolute top-1/2 end-0 w-96 h-96 bg-[var(--color-gold-champagne)]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header & Disclaimer */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-gold-champagne)]/30 text-xs text-[var(--color-gold-champagne)] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.demoSection.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--color-alabaster)] tracking-tight">
                {t.demoSection.title}
              </h2>

              <p className="text-base sm:text-lg text-[var(--color-slate-titanium)] leading-relaxed">
                {t.demoSection.subtitle}
              </p>
            </div>

            {/* Prominent Demo Notice */}
            <div className="p-4 rounded-2xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] max-w-md flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[var(--color-gold-champagne)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-slate-titanium)] leading-relaxed">
                {t.demoSection.disclaimer}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* 5 Demo Concepts Showcase Grid with 3D Tilt */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.demoProjects.map((project, index) => (
            <StaggerItem 
              key={project.id} 
              className={index === 0 ? 'lg:col-span-2' : ''}
            >
              <TiltCard
                maxTilt={5}
                onHover={() =>
                  triggerReaction(
                    'curious',
                    language === 'ar'
                      ? `نموذج تجريبي: ${project.name} 💡`
                      : `Demo Concept: ${project.name} 💡`,
                    2200
                  )
                }
                onLeave={resetMood}
                className="h-full"
              >
                <div className="group relative h-full rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-gold-champagne)]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                  
                  {/* Visual Concept Mockup Canvas */}
                  <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[var(--color-charcoal-elevated)] via-[var(--color-charcoal-surface)] to-[var(--color-charcoal-base)] border-b border-[var(--color-charcoal-border)] overflow-hidden">
                    
                    {/* Subtle Grid Lines Inside Mockup */}
                    <div className="absolute inset-0 bg-[radial-gradient(#2D3442_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
                    
                    <div className="flex items-center justify-between relative z-10 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-charcoal-base)]/80 backdrop-blur-md border border-[var(--color-gold-champagne)]/40 text-[var(--color-gold-champagne)] text-[11px] font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-champagne)] animate-pulse" />
                        <span>{project.demoTag}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-charcoal-base)] text-[var(--color-slate-titanium)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mockup Focal Visual */}
                    <div className="flex items-center justify-center py-6 sm:py-10 relative z-10">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[var(--color-charcoal-base)] border border-[var(--color-gold-champagne)]/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:scale-105 group-hover:border-[var(--color-gold-champagne)] transition-all">
                        {getMockupIcon(project.mockupType)}
                      </div>
                    </div>

                    {/* Highlights Bar */}
                    <div className="relative z-10 p-3 rounded-xl bg-[var(--color-charcoal-base)]/70 backdrop-blur-md border border-[var(--color-charcoal-border)]/60 text-xs text-[var(--color-slate-titanium)] flex items-center justify-between">
                      <span className="font-medium text-[var(--color-alabaster)]">{project.category}</span>
                      <span className="text-[11px] text-[var(--color-gold-champagne)] font-mono">{project.clientType}</span>
                    </div>
                  </div>

                  {/* Concept Narrative & Details */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-heading text-2xl font-bold text-[var(--color-alabaster)] group-hover:text-[var(--color-gold-champagne)] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-sm text-[var(--color-slate-titanium)] leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-mono uppercase text-[var(--color-gold-champagne)]">
                          {language === 'ar' ? 'أبرز مميزات النموذج التجريبي:' : 'Key Concept Highlights:'}
                        </div>
                        <ul className="space-y-1.5">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-xs text-[var(--color-slate-titanium)] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-champagne)] shrink-0 mt-1.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Direct WhatsApp Inquiry for Similar Solution */}
                    <div className="pt-4 border-t border-[var(--color-charcoal-border)]/60 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setActiveModalProject(project);
                          triggerReaction(
                            'surprised',
                            language === 'ar'
                              ? `تفاصيل: ${project.name}`
                              : `Details: ${project.name}`,
                            3000
                          );
                        }}
                        className="px-4 py-2 rounded-xl bg-[var(--color-charcoal-elevated)] hover:bg-[var(--color-charcoal-border)] text-xs font-semibold text-[var(--color-alabaster)] transition-colors cursor-pointer"
                      >
                        {t.demoSection.viewDetails}
                      </button>

                      <a
                        href={getWhatsAppUrl(`مرحباً، اطلعت على النموذج التجريبي (${project.name}) وأرغب بطلب حل مماثل لمشروعي.`, language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-gold-champagne)] hover:bg-[var(--color-gold-light)] text-[var(--color-charcoal-base)] font-bold text-xs transition-all shadow-sm cursor-pointer"
                      >
                        <span>{t.demoSection.orderSimilar}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </a>
                    </div>

                  </div>

                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Concept Deep Dive Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-gold-champagne)]/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[var(--color-charcoal-border)] pb-4">
              <div>
                <span className="text-xs text-[var(--color-gold-champagne)] font-mono block">
                  {activeModalProject.demoTag}
                </span>
                <h3 className="font-heading text-2xl font-bold text-[var(--color-alabaster)]">
                  {activeModalProject.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full bg-[var(--color-charcoal-elevated)] text-[var(--color-slate-titanium)] hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-[var(--color-slate-titanium)] leading-relaxed">
              {activeModalProject.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-heading text-sm font-bold text-[var(--color-alabaster)] uppercase tracking-wider">
                {language === 'ar' ? 'المعايير المطبقة في هذا المفهوم:' : 'Applied Engineering Standards:'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-slate-titanium)]">
                {activeModalProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-champagne)] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-charcoal-base)] border border-[var(--color-charcoal-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--color-slate-titanium)]">Technology Stack:</span>
              <span className="text-[var(--color-gold-champagne)]">{activeModalProject.techStack.join(' • ')}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[var(--color-slate-titanium)]">
                {language === 'ar' ? 'تواصل معنا لتنفيذ حل مماثل وفق هويتك الخاصة.' : 'Contact us to build a tailored solution for your brand.'}
              </span>
              <a
                href={getWhatsAppUrl(`مرحباً، اطلعت على تفاصيل النموذج التجريبي (${activeModalProject.name}) وأرغب بطلب موقع مماثل.`, language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)]/90 text-white font-bold text-xs transition-all shadow-md shrink-0 cursor-pointer"
              >
                <span>{language === 'ar' ? 'اطلب هذا الحل عبر واتساب' : 'Inquire on WhatsApp'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
