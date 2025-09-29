import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onViewWork: () => void;
  onGetInTouch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onGetInTouch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const calculateLetterOffset = (letterIndex: number, totalLetters: number, lineIndex: number) => {
    const letterElement = document.querySelector(`[data-letter-id="${lineIndex}-${letterIndex}"]`);
    if (!letterElement) return { x: 0, y: 0 };
    
    const rect = letterElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: 0, y: 0 };
    
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - letterCenterX, 2) + 
      Math.pow(mousePosition.y - letterCenterY, 2)
    );
    
    const maxDistance = 150;
    const repelStrength = Math.max(0, (maxDistance - distance) / maxDistance);
    
    if (repelStrength === 0) return { x: 0, y: 0 };
    
    const angle = Math.atan2(letterCenterY - mousePosition.y, letterCenterX - mousePosition.x);
    const offsetX = Math.cos(angle) * repelStrength * 30;
    const offsetY = Math.sin(angle) * repelStrength * 30;
    
    return { x: offsetX, y: offsetY };
  };

  const AnimatedLetter: React.FC<{ 
    children: string; 
    index: number; 
    totalLetters: number; 
    lineIndex: number;
  }> = ({ children, index, totalLetters, lineIndex }) => {
    const offset = calculateLetterOffset(index, totalLetters, lineIndex);
    
    return (
      <motion.span
        data-letter-id={`${lineIndex}-${index}`}
        initial={{ opacity: 0, y: 50, rotateX: -90 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          x: offset.x,
          translateY: offset.y
        }}
        transition={{
          opacity: { delay: index * 0.05, duration: 0.8 },
          y: { delay: index * 0.05, duration: 0.8, type: "spring" },
          rotateX: { delay: index * 0.05, duration: 0.8 },
          x: { type: "spring", stiffness: 200, damping: 20 },
          translateY: { type: "spring", stiffness: 200, damping: 20 }
        }}
        className="inline-block"
        style={{
          transformStyle: 'preserve-3d'
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
        onMouseMove={handleMouseMove}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Full-Stack Developer & Creative Technologist
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;