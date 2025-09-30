import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen relative">
      {/* Fixed Parallax Background */}
      <div className="fixed inset-0 z-0 overflow-hidden blur-3xl bg-background">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-red-400/20 rounded-full"
          style={{ top: '10%', left: '20%' }}
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, 45, -30, 0],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-cyan-400/25 rounded-full"
          style={{ bottom: '5%', right: '15%' }}
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -80, 80, 0],
            scale: [1, 0.7, 1.3, 1],
            rotate: [0, -60, 30, 0],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-orange-300/15 rounded-full"
          style={{ top: '40%', left: '45%' }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <Navigation />
      
      <main className="relative z-10">
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