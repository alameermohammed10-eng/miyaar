import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMascot } from '../../context/MascotContext';
import { useSmoothScroll } from './SmoothScroll';
import { LanguageToggle } from '../common/LanguageToggle';
import { MagneticHover } from '../motion/MotionWrappers';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const { triggerReaction, resetMood } = useMascot();
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.header.services, href: '#services' },
    { label: t.header.showcase, href: '#showcase' },
    { label: t.header.about, href: '#about' },
    { label: t.header.whyUs, href: '#why-us' },
    { label: t.header.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -90 });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[var(--color-charcoal-base)]/85 backdrop-blur-xl border-b border-[var(--color-charcoal-border)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[var(--color-charcoal-surface)] border border-[var(--color-gold-champagne)]/40 flex items-center justify-center text-[var(--color-gold-champagne)] font-bold text-xl font-heading shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:border-[var(--color-gold-champagne)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all">
              <span>مِ</span>
              <div className="absolute inset-0 rounded-xl bg-[var(--color-gold-champagne)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-alabaster)] group-hover:text-[var(--color-gold-champagne)] transition-colors">
                {t.studioName}
              </span>
              <span className="text-[11px] text-[var(--color-slate-titanium)] font-medium hidden sm:block">
                {language === 'ar' ? 'استوديو الحلول الرقمية' : 'Digital Craft Studio'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[var(--color-charcoal-surface)]/80 backdrop-blur-md border border-[var(--color-charcoal-border)]/70 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-[var(--color-slate-titanium)] hover:text-[var(--color-alabaster)] hover:bg-[var(--color-charcoal-elevated)] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Language Switch & Direct WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageToggle />

            <MagneticHover strength={0.2}>
              <a
                href={getWhatsAppUrl(undefined, language)}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  triggerReaction(
                    'happy',
                    language === 'ar'
                      ? 'مرحباً! فريق مِعيار متاح الآن عبر واتساب 💬'
                      : 'Hello! Miyaar team is ready on WhatsApp 💬',
                    2200
                  )
                }
                onMouseLeave={resetMood}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold-champagne)] hover:bg-[var(--color-gold-light)] text-[var(--color-charcoal-base)] font-bold text-xs transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{t.header.startProject}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </MagneticHover>
          </div>

          {/* Mobile Menu Trigger & Language Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[var(--color-alabaster)] hover:text-[var(--color-gold-champagne)] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-2xl bg-[var(--color-charcoal-surface)]/95 backdrop-blur-2xl border border-[var(--color-charcoal-border)] shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-slate-titanium)] hover:text-[var(--color-alabaster)] hover:bg-[var(--color-charcoal-elevated)] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-gold-champagne)] opacity-60" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[var(--color-charcoal-border)]">
              <a
                href={getWhatsAppUrl(undefined, language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-gold-champagne)] hover:bg-[var(--color-gold-light)] text-[var(--color-charcoal-base)] font-bold text-xs transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.header.startProject}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
