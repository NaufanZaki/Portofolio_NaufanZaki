import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Briefcase, Calendar, Building, Plus, Minus } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  details: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 - Apr 2025",
    details: "Led complete project lifecycle from blueprint creation to production deployment. Developed a legal workflow dashboard utilizing Strapi headless CMS and ReactJS. Customized features based on user feedback and requirements."
  },
  {
    id: "exp2", 
    role: "Lecturer Assistant, Web Programming",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 - Nov 2024",
    details: "Developed and delivered course materials covering HTML, CSS, Javascript, Express JS & MongoDB, and Nuxt.js. Created comprehensive examination materials and supported students through regular consultation sessions."
  },
  {
    id: "exp3",
    role: "Lecturer Assistant, Data Structures", 
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 - May 2024",
    details: "Created programming exercises using the HackerRank platform and developed supplementary learning materials for complex algorithms. Provided technical support and guidance to students."
  }
];

const ExperienceSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    dragFree: true,
    containScroll: "trimSnaps"
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const toggleCard = useCallback((cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  }, [expandedCard]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  return (
    <section id="experience" className="section-padding bg-background/80 backdrop-blur-sm relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Work
            </span>
            <br />
            <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground font-subtitle leading-relaxed max-w-2xl mx-auto">
            Explore my professional journey through interactive cards. Click to expand and learn more.
          </p>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8 pb-8">
            {experiences.map((experience, index) => {
              const isExpanded = expandedCard === experience.id;
              
              return (
                <motion.div
                  key={experience.id}
                  className="flex-none w-80 md:w-96 cursor-pointer select-none"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleCard(experience.id)}
                >
                  <motion.div
                    className="bg-[#FBF9F1] rounded-2xl p-8 shadow-lg border border-[#87602D]/10 relative overflow-hidden group h-full"
                    style={{
                      background: `linear-gradient(135deg, #FBF9F1 0%, #F8F5EA 100%)`,
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(135, 96, 45, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    layout
                  >
                    {/* Expand/Collapse Icon */}
                    <motion.div 
                      className="absolute top-6 right-6 w-8 h-8 bg-[#87602D] rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isExpanded ? (
                          <Minus className="w-4 h-4 text-white" />
                        ) : (
                          <Plus className="w-4 h-4 text-white" />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Card Content */}
                    <div className="space-y-4">
                      {/* Role - Primary */}
                      <motion.h3 
                        className="text-2xl font-bold text-[#87602D] leading-tight"
                        style={{ fontFamily: 'Source Serif Pro, serif' }}
                        layout
                      >
                        {experience.role}
                      </motion.h3>

                      {/* Organization */}
                      <motion.div 
                        className="flex items-center gap-2"
                        layout
                      >
                        <Building className="w-4 h-4 text-[#676556]" />
                        <p 
                          className="text-[#676556] font-medium"
                          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                          {experience.organization}
                        </p>
                      </motion.div>

                      {/* Duration */}
                      <motion.div 
                        className="flex items-center gap-2"
                        layout
                      >
                        <Calendar className="w-4 h-4 text-[#676556]" />
                        <p 
                          className="text-[#676556] text-sm"
                          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                          {experience.duration}
                        </p>
                      </motion.div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: "auto",
                              transition: { 
                                height: { duration: 0.3, ease: "easeOut" },
                                opacity: { duration: 0.2, delay: 0.1 }
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0,
                              transition: { 
                                height: { duration: 0.3, ease: "easeIn" },
                                opacity: { duration: 0.1 }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-[#87602D]/20">
                              <div className="w-12 h-1 bg-[#87602D] rounded-full mb-4" />
                              <p 
                                className="text-[#676556] leading-relaxed"
                                style={{ fontFamily: 'Jakarta Sans, sans-serif' }}
                              >
                                {experience.details}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#87602D]/5 rounded-full blur-2xl" />
                    <div className="absolute -left-2 -top-2 w-16 h-16 bg-[#87602D]/10 rounded-full blur-xl" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-[#FBF9F1]/80 rounded-full border border-[#87602D]/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#87602D] rounded-full animate-pulse" />
            <p className="text-xs text-[#676556] font-medium" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
              Drag to explore
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;