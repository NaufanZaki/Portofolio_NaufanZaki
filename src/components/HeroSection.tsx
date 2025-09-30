import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import heroAvatar from '@/assets/heroAvatar.png';

interface HeroSectionProps {
  onViewWork: () => void;
  onGetInTouch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onGetInTouch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });

  const AnimatedLetter: React.FC<{ 
    children: string; 
    index: number; 
    totalLetters: number; 
    lineIndex: number;
  }> = ({ children, index, totalLetters, lineIndex }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.span
        data-letter-id={`${lineIndex}-${index}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: isInView ? 1 : 0, 
          y: isInView ? 0 : 100,
        }}
        whileHover={{
          y: -20,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        transition={{
          opacity: { delay: isInView ? 2.5 + (index * 0.04) : 0, duration: 0.5 },
          y: { 
            delay: isInView ? 0.1 + (index * 0.04) : 0, 
            duration: 0.2, 
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
        className="inline-block cursor-pointer relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          filter: isHovered ? 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0))',
          transition: 'filter 0.1s ease'
        }}
      >
        {children === ' ' ? '\u00A0' : children}
      </motion.span>
    );
  };

  const AnimatedWord: React.FC<{ 
    children: string; 
    startIndex: number; 
    lineIndex: number;
  }> = ({ children, startIndex, lineIndex }) => {
    return (
      <>
        {children.split('').map((letter, letterIndex) => (
          <AnimatedLetter 
            key={letterIndex} 
            index={startIndex + letterIndex}
            totalLetters={children.length}
            lineIndex={lineIndex}
          >
            {letter}
          </AnimatedLetter>
        ))}
      </>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div 
        ref={containerRef}
        className="relative z-10 px-6"
      >
        <div className="flex items-start md:items-center gap-x-4 md:gap-x-8">
          {/* Avatar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: [0, 1, 1, 1],
              scale: [0, 1.8, 1.8, 1],
              rotate: [0, 0, 5, 0],
              y: [0, 0, -10, 0]
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 2.2,
              times: [0, 0.3, 0.7, 1],
              ease: [0.34, 1.56, 0.64, 1], // Bouncy ease for greeting effect
              delay: isInView ? 0.3 : 0,
            }}
            whileHover={{
              rotate: [0, -4, 4, -4, 4, 0],
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            <img src={heroAvatar} alt="Avatar" className="h-48 md:h-52 lg:h-64 w-auto" />
          </motion.div>

          {/* Text Content */}
          <div>
            {/* Main Name Block */}
            <div className="mb-4">
              <motion.div 
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: isInView ? 2.5 : 0 }}
              >
                <div className="block">
                  <AnimatedWord lineIndex={0} startIndex={0}>Naufan Zaki</AnimatedWord>
                </div>
                <div className="block">
                  <AnimatedWord lineIndex={1} startIndex={0}>Luqmanulhakim</AnimatedWord>
                </div>
              </motion.div>
            </div>
            {/* Subtitle */}
            <motion.p 
              className="font-subtitle text-lg md:text-xl text-muted-foreground tracking-wider text-left py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 20 
              }}
              transition={{ delay: isInView ? 3.2 : 0, duration: 0.8 }}
            >
              Data Enthusiast | Web Developer | Project Management Learner
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;