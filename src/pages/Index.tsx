import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';

const Index: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewWork = () => {
    scrollToSection('projects');
  };

  const handleGetInTouch = () => {
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <div id="home">
          <HeroSection 
            onViewWork={handleViewWork}
            onGetInTouch={handleGetInTouch}
          />
        </div>
        
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;