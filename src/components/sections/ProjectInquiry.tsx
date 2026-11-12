import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FadeIn, MagneticHover } from '../motion/MotionWrappers';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE_AR } from '../../utils/whatsapp';
import { 
  MessageSquare, 
  Check, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck 
} from 'lucide-react';

export const ProjectInquiry: React.FC = () => {
  const { t, language } = useLanguage();

  // State for user interactive selection
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design-dev']);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [projectNotes, setProjectNotes] = useState<string>('');

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((s) => s !== id)
          : prev
        : [...prev, id]
    );
  };

  // Compile selected services titles for message
  const selectedServiceTitles = t.services
    .filter((s) => selectedServices.includes(s.id))
    .map((s) => s.title)
    .join('، ');

  const timelineLabel = t.inquirySection.timelines.find((tl) => tl.id === selectedTimeline)?.label || '';

  // Generate structured WhatsApp inquiry message
  const generateWhatsAppMessage = () => {
    if (language === 'ar') {
      let msg = `${DEFAULT_WHATSAPP_MESSAGE_AR}\n\n`;
      msg += `الخدمات المختارة: ${selectedServiceTitles}\n`;
      msg += `الجدول الزمني المفضل: ${timelineLabel}`;
      if (projectNotes.trim()) {
        msg += `\nتفاصيل إضافية: ${projectNotes.trim()}`;
      }
      return msg;
    } else {
      let msg = `Hello, I would like to inquire about Miyaar services and request a design.\n\n`;
      msg += `Selected Services: ${selectedServiceTitles}\n`;
      msg += `Preferred Timeline: ${timelineLabel}`;
      if (projectNotes.trim()) {
        msg += `\nAdditional Notes: ${projectNotes.trim()}`;
      }
      return msg;
    }
  };

  const whatsappInquiryUrl = getWhatsAppUrl(generateWhatsAppMessage(), language);

  return (
    <section id="contact" className="relative py-24 scroll-mt-24 border-t border-[var(--color-charcoal-border)]/40">
      {/* Ambient Radial Spotlight */}
      <div className="absolute -bottom-24 start-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--color-gold-champagne)]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-xs text-[var(--color-gold-champagne)] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.inquirySection.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--color-alabaster)] tracking-tight">
              {t.inquirySection.title}
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-slate-titanium)] leading-relaxed">
              {t.inquirySection.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Interactive Estimator & Configurator Card */}
        <FadeIn direction="up" delay={0.1}>
          <div className="p-8 sm:p-12 rounded-3xl bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] space-y-10 shadow-2xl relative overflow-hidden">
            
            {/* Step 1: Select Services */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-alabaster)] flex items-center justify-between">
                <span>{t.inquirySection.servicesLabel}</span>
                <span className="text-xs text-[var(--color-gold-champagne)] font-mono">
                  {selectedServices.length} {language === 'ar' ? 'محددة' : 'selected'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {t.services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[var(--color-gold-champagne)]/10 border-[var(--color-gold-champagne)] text-[var(--color-alabaster)] shadow-sm'
                          : 'bg-[var(--color-charcoal-elevated)] border-[var(--color-charcoal-border)] text-[var(--color-slate-titanium)] hover:border-[var(--color-gold-champagne)]/40 hover:text-[var(--color-alabaster)]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold block leading-snug">
                          {service.title}
                        </span>
                        <span className="text-[11px] text-[var(--color-slate-titanium)] block">
                          {service.category}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-gold-champagne)] text-[var(--color-charcoal-base)]'
                            : 'border border-[var(--color-charcoal-border)]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Timeline */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-[var(--color-alabaster)] block">
                {t.inquirySection.timelineLabel}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t.inquirySection.timelines.map((timeline) => {
                  const isSelected = selectedTimeline === timeline.id;
                  return (
                    <button
                      key={timeline.id}
                      type="button"
                      onClick={() => setSelectedTimeline(timeline.id)}
                      className={`p-4 rounded-xl border text-start transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[var(--color-gold-champagne)]/10 border-[var(--color-gold-champagne)] text-[var(--color-gold-champagne)] font-semibold'
                          : 'bg-[var(--color-charcoal-elevated)] border-[var(--color-charcoal-border)] text-[var(--color-slate-titanium)] hover:border-[var(--color-gold-champagne)]/40'
                      }`}
                    >
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="text-xs">{timeline.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Notes */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[var(--color-alabaster)] block">
                {t.inquirySection.notesLabel}
              </label>
              <textarea
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                rows={3}
                placeholder={t.inquirySection.notesPlaceholder}
                className="w-full p-4 rounded-xl bg-[var(--color-charcoal-elevated)] border border-[var(--color-charcoal-border)] focus:border-[var(--color-gold-champagne)] text-sm text-[var(--color-alabaster)] placeholder-[var(--color-slate-titanium)]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Message Preview Box */}
            <div className="p-4 rounded-2xl bg-[var(--color-charcoal-base)] border border-[var(--color-charcoal-border)] space-y-2">
              <div className="text-[11px] font-mono text-[var(--color-gold-champagne)] uppercase flex items-center justify-between">
                <span>{language === 'ar' ? 'معاينة نص الرسالة التي ستصلنا:' : 'Generated WhatsApp Message Preview:'}</span>
                <span className="text-[10px] text-[var(--color-slate-titanium)]">+968 97775262</span>
              </div>
              <p className="text-xs text-[var(--color-slate-titanium)] whitespace-pre-line leading-relaxed font-mono">
                {generateWhatsAppMessage()}
              </p>
            </div>

            {/* Submit Action */}
            <div className="space-y-4 pt-2">
              <MagneticHover strength={0.2} className="w-full">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)]/90 text-white font-bold text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>{t.inquirySection.whatsappButton}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </a>
              </MagneticHover>

              <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-slate-titanium)] text-center">
                <ShieldCheck className="w-4 h-4 text-[var(--color-gold-champagne)] shrink-0" />
                <span>{t.inquirySection.guaranteeDisclaimer}</span>
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
};
