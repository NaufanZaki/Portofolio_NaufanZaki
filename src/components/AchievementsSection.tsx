import React from 'react';
import { Award } from 'lucide-react';

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Recognition
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 font-subtitle">
            Achievements and milestones in my journey
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="card-portfolio bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl text-center max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Award className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-foreground mb-4">
              Finalist
            </h3>
            
            <h4 className="text-xl font-semibold text-secondary dark:text-secondary-foreground mb-4">
              Smart City Division - GemasTIK 2024
            </h4>
            
            <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
              Recognized among the top participants in the Smart City competition, 
              demonstrating innovative solutions for urban technological challenges 
              and sustainable city development.
            </p>
            
            <div className="mt-8 pt-6 border-t border-border-soft dark:border-gray-700">
              <span className="font-subtitle text-sm text-primary dark:text-primary-foreground bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                Competition Excellence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;