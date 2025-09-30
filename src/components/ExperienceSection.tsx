import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Briefcase, Calendar, Building, ChevronRight, Sparkles, Award } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  details: string;
  image: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 - Apr 2025",
    details: "Developed a legal workflow dashboard utilizing Strapi headless CMS and ReactJS.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    role: "Lecturer Assistant, Web Programming",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 - Nov 2024",
    details: "Developed course materials for HTML, CSS, Javascript, Express JS, MongoDB, and Nuxt.js.",
    image: "https://images.unsplash.com/photo-1517694712202-1428bc64a25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    role: "Lecturer Assistant, Data Structures",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 - May 2024",
    details: "Created programming exercises using the HackerRank platform.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    role: "Project Manager",
    organization: "Schematics ITS",
    duration: "Feb 2023 - Nov 2023",
    details: "Led the Schematics NLC competition, managing a team of 30+ staff to organize a national-scale logic competition for high school students.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    role: "Data Analyst",
    organization: "Community Service",
    duration: "Aug 2023 - Oct 2023",
    details: "Analyzed data from a local smart farming initiative to provide insights for crop yield optimization and resource management.",
    image: "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  }
];

const ExperienceSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const selectedExperience = experiences[selectedIndex];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="section-padding bg-background/80 backdrop-blur-sm relative overflow-hidden" ref={ref}>
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(120, 120, 120, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(120, 120, 120, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating orbs - static */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column: Title and Navigation */}
          <motion.div 
            className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start"
            variants={titleVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-12 relative">
              <div className="relative">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Professional
                  </span>
                  <br />
                  <span className="text-primary">Journey</span>
                </h2>
                
                <p className="text-lg text-muted-foreground font-subtitle leading-relaxed">
                  Crafting digital experiences and mentoring future developers.
                </p>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <motion.div 
              className="relative space-y-3 lg:max-h-[calc(100vh-20rem)] lg:overflow-y-auto lg:pr-2" 
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {visibleExperiences.map((experience, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="w-full text-left relative group"
                  variants={navItemVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className={`p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 relative overflow-hidden ${
                    selectedIndex === index
                      ? 'bg-gradient-to-r from-primary/15 to-secondary/10 shadow-lg border border-primary/20'
                      : 'bg-surface/50 hover:bg-surface/80 border border-transparent'
                  }`}>
                    
                    {/* Icon */}
                    <div 
                      className={`relative p-3 rounded-xl transition-all duration-300 ${
                        selectedIndex === index 
                          ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg' 
                          : 'bg-muted/50 text-foreground/70 group-hover:bg-muted'
                      }`}
                    >
                      <Briefcase className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <p className={`font-bold text-sm mb-1 transition-colors duration-300 ${
                        selectedIndex === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {experience.organization}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {experience.role}
                      </p>
                    </div>
                    
                    {selectedIndex === index && (
                      <ChevronRight className="w-5 h-5 text-primary transition-opacity duration-300" />
                    )}
                  </div>
                </motion.button>
              ))}
              {experiences.length > 3 && (
                <motion.div className="pt-2" variants={navItemVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full text-center py-3 px-5 rounded-xl bg-surface/50 hover:bg-surface/80 text-sm font-medium text-primary transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-90' : '-rotate-90'}`}
                      style={{ transform: showAll ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                    />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Enhanced Content Display */}
          <motion.div 
            className="lg:col-span-2 relative min-h-[600px]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                className="w-full h-full rounded-3xl overflow-hidden relative group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut"
                }}
              >
                {/* Layered card with depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-card-portfolio to-card-portfolio/80 rounded-3xl transform translate-x-2 translate-y-2 blur-xl opacity-50" />
                
                <div className="relative bg-card-portfolio rounded-3xl shadow-2xl overflow-hidden border border-foreground/5">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={selectedExperience.image} 
                      alt={selectedExperience.organization}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-portfolio via-card-portfolio/90 to-card-portfolio/30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 mix-blend-overlay" />
                  </div>

                  {/* Floating award badge */}
                  <div className="absolute top-8 right-8 p-4 bg-background/90 backdrop-blur-md rounded-2xl shadow-lg z-20">
                    <Award className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content with glassmorphism */}
                  <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[600px]">
                    <div className="bg-background/80 backdrop-blur-xl p-8 rounded-2xl border border-foreground/10 shadow-2xl">
                      {/* Role Title with gradient */}
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                        {selectedExperience.role}
                      </h3>
                      
                      {/* Meta information with icons */}
                      <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
                          <Building className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm text-foreground">
                            {selectedExperience.organization}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-full">
                          <Calendar className="w-4 h-4 text-secondary" />
                          <span className="font-medium text-sm text-muted-foreground">
                            {selectedExperience.duration}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div>
                        <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4" />
                        <p className="leading-relaxed text-foreground/90 text-lg">
                          {selectedExperience.details}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
                      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl" />
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <motion.div 
              className="flex justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index 
                      ? 'w-12 bg-gradient-to-r from-primary to-secondary' 
                      : 'w-2 bg-muted hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;