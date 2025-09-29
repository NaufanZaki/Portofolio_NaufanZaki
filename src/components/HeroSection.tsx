import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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
          opacity: { delay: isInView ? index * 0.03 : 0, duration: 0.6 },
          y: { 
            delay: isInView ? index * 0.03 : 0, 
            duration: 0.6, 
            type: "spring",
            stiffness: 100,
            damping: 20
          }
        }}
        className="inline-block cursor-pointer relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          filter: isHovered ? 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0))',
          transition: 'filter 0.3s ease'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div 
        ref={containerRef}
        className="relative z-10 text-center px-6"
      >
        {/* Main Name Block */}
        <div className="mb-8">
          <motion.div 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
          className="font-subtitle text-lg md:text-xl text-muted-foreground tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30 
          }}
          transition={{ delay: isInView ? 0.8 : 0, duration: 0.8 }}
        >
          Full-Stack Developer & Creative Technologist
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;