import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import LeadershipSection from '@/components/LeadershipSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import { useTheme } from '../hooks/use-theme';

const Index: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed Ambient Parallax Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden blur-3xl bg-background pointer-events-none">
        {/* Blob 1 - Top Left */}
        <motion.div
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-600/15 dark:bg-amber-500/10 rounded-full"
          style={{ top: '5%', left: '10%' }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -60, 0],
            scale: [1, 1.25, 0.85, 1],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        {/* Blob 2 - Bottom Right */}
        <motion.div
          className="absolute w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-orange-500/15 dark:bg-orange-600/10 rounded-full"
          style={{ bottom: '15%', right: '10%' }}
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{
            duration: 16,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />
        {/* Blob 3 - Middle Center */}
        <motion.div
          className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-amber-500/10 dark:bg-amber-600/10 rounded-full"
          style={{ top: '45%', left: '40%' }}
          animate={{
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 22,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 4,
          }}
        />
      </div>

      <Navigation />
      
      <main className="relative z-10">
        <div id="home">
          <HeroSection />
        </div>
        
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <LeadershipSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;