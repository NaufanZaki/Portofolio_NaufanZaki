import React from 'react';
import { Award, Trophy, MapPin, Calendar, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground font-title">
              Honors & <span className="text-primary">Achievements</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-subtitle max-w-2xl mx-auto">
              National competition milestones and recognition.
            </p>
          </motion.div>
        </div>
        
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-border/60 hover:border-primary/40 transition-all duration-500 shadow-2xl relative overflow-hidden text-center group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
              
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-primary text-white rounded-3xl mb-6 shadow-lg">
                <Trophy className="w-10 h-10" />
              </div>
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
                National Level Recognition
              </div>
              
              <h3 className="text-2xl md:text-4xl font-bold font-title text-foreground mb-2">
                Finalist – Smart City Division
              </h3>
              
              <h4 className="text-lg md:text-xl font-semibold text-primary font-subtitle mb-4">
                Pagelaran Mahasiswa TIK (GemasTIK 2024)
              </h4>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
                Organized by Pusat Prestasi Nasional (Puspresnas), Ministry of Education, Culture, Research, and Technology of Indonesia. Recognized among the top university teams for designing innovative urban technology solutions for sustainable smart cities.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border/50 text-xs md:text-sm font-subtitle text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" />
                  Pusat Prestasi Nasional (Kemendikbudristek)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  Semarang, Indonesia
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  2024
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;