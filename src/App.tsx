import React from 'react';
import { StudioShell } from './components/layout/StudioShell';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { MascotProvider } from './context/MascotContext';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { DemoProjects } from './components/sections/DemoProjects';
import { About } from './components/sections/About';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { ProjectInquiry } from './components/sections/ProjectInquiry';

export const AppContent: React.FC = () => {
  return (
    <StudioShell>
      {/* 1. Hero Section with 3D Canvas */}
      <Hero />

      {/* 2. Seven Specialized Services */}
      <Services />

      {/* 3. Five Concept Demo Projects */}
      <DemoProjects />

      {/* 4. About Miyaar & Four Core Pillars */}
      <About />

      {/* 5. Why Choose Miyaar (Concrete Guarantees) */}
      <WhyChooseUs />

      {/* 6. Interactive Contact & Project Inquiry */}
      <ProjectInquiry />
    </StudioShell>
  );
};

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <MascotProvider>
        <AppContent />
      </MascotProvider>
    </SmoothScroll>
  );
};
