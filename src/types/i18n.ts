export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  benefits: string[];
  whatsappMessage: string;
}

export interface DemoProject {
  id: string;
  name: string;
  category: string;
  clientType: string;
  description: string;
  highlights: string[];
  features: string[];
  techStack: string[];
  demoTag: string;
  mockupType: 'cafe' | 'corporate' | 'ecommerce' | 'booking' | 'interactive';
}

export interface Translations {
  studioName: string;
  tagline: string;
  header: {
    services: string;
    showcase: string;
    about: string;
    whyUs: string;
    contact: string;
    startProject: string;
    langToggle: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    statusAvailability: string;
    trustFeatures: string[];
  };
  servicesSection: {
    badge: string;
    title: string;
    subtitle: string;
    orderCta: string;
    exploreBenefits: string;
  };
  services: ServiceItem[];
  demoSection: {
    badge: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    viewDetails: string;
    orderSimilar: string;
  };
  demoProjects: DemoProject[];
  aboutSection: {
    badge: string;
    title: string;
    subtitle: string;
    lead: string;
    body1: string;
    body2: string;
    pillarsTitle: string;
    pillars: {
      title: string;
      desc: string;
    }[];
  };
  whyChooseSection: {
    badge: string;
    title: string;
    subtitle: string;
    guaranteeNote: string;
    points: {
      title: string;
      desc: string;
      badgeText: string;
    }[];
  };
  inquirySection: {
    badge: string;
    title: string;
    subtitle: string;
    servicesLabel: string;
    timelineLabel: string;
    timelines: { id: string; label: string }[];
    notesLabel: string;
    notesPlaceholder: string;
    whatsappButton: string;
    guaranteeDisclaimer: string;
  };
  footer: {
    copyright: string;
    allRightsReserved: string;
    riyadhTime: string;
    dubaiTime: string;
    disclaimer: string;
  };
}
