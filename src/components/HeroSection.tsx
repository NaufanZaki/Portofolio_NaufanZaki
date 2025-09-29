import React from 'react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

interface HeroSectionProps {
  onViewWork: () => void;
  onGetInTouch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onGetInTouch }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Interactive particles overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-accent/30 rounded-full animate-float stagger-delay-1" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float stagger-delay-2" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/25 rounded-full animate-float stagger-delay-3" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
          From Big Data to{' '}
          <span className="text-gradient">Secure Systems</span>,
          <br />
          I Build Robust and{' '}
          <span className="text-gradient">Intelligent Solutions</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-12 font-subtitle text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-delay-1">
          Web Developer & Machine Learning Engineer with expertise in scalable systems and secure applications
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-delay-2">
          <Button 
            onClick={onViewWork}
            className="btn-hero px-8 py-4 text-lg font-medium rounded-xl"
            size="lg"
          >
            View My Work
          </Button>
          <Button 
            onClick={onGetInTouch}
            className="btn-outline-hero px-8 py-4 text-lg font-medium rounded-xl"
            variant="outline"
            size="lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;