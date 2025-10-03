import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Code2, Database, Lock } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  icon: React.ReactNode;
  color: string;
}

const projects: Project[] = [
  {
    title: "Scalable Machine Learning with PySpark",
    description: "Built a distributed machine learning pipeline capable of processing large datasets efficiently using Apache Spark. Implemented various ML algorithms optimized for big data workloads with automated model evaluation and deployment strategies.",
    techStack: ["PySpark", "Machine Learning", "Big Data", "Apache Spark", "Python"],
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Cloud Resource Optimization with Crow Search Algorithm",
    description: "Developed an intelligent cloud resource allocation system using the Crow Search Algorithm for optimization. The system automatically adjusts resource distribution based on workload patterns, reducing costs while maintaining performance.",
    techStack: ["Algorithms", "Optimization", "Cloud Computing", "Python", "AWS"],
    icon: <Database className="w-8 h-8" />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Secure Attendance System with Encryption",
    description: "Created a robust attendance management system with end-to-end encryption using RSA algorithm. Features include biometric integration, real-time synchronization, and comprehensive audit trails for enhanced security.",
    techStack: ["Cryptography", "Security", "RSA", "Biometrics", "Java"],
    icon: <Lock className="w-8 h-8" />,
    color: "from-orange-500/20 to-red-500/20"
  }
];

const ProjectsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-subtitle text-primary">Featured Work</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Projects that{' '}
            <span className="text-gradient">make a difference</span>
          </h2>
          <p className="text-lg text-muted-foreground font-subtitle max-w-2xl mx-auto">
            Innovative solutions combining cutting-edge technology with practical applications
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              className="relative group cursor-pointer"
            >
              {/* Card Container with Tilt Effect */}
              <motion.div
                className="relative h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Main Card */}
                <div className="relative bg-surface-elevated border border-border-soft rounded-3xl p-8 h-full overflow-hidden">
                  {/* Animated Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"
                    animate={{
                      scale: hoveredIndex === index ? 1.5 : 1,
                      opacity: hoveredIndex === index ? 0.6 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon with Glow */}
                  <motion.div
                    className="relative mb-6 inline-flex"
                    animate={{
                      rotate: hoveredIndex === index ? 5 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} backdrop-blur-sm border border-primary/10`}>
                      <div className="text-primary">
                        {project.icon}
                      </div>
                    </div>
                    
                    {/* Pulse Ring on Hover */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-primary"
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <motion.p
                    className="text-muted-foreground mb-6 leading-relaxed text-sm"
                    animate={{
                      height: selectedProject === index ? 'auto' : '4.5rem'
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      >
                        <Badge 
                          className="skill-tag px-3 py-1 text-xs font-medium rounded-full hover:scale-105 transition-transform"
                          variant="secondary"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge 
                        className="skill-tag px-3 py-1 text-xs font-medium rounded-full"
                        variant="secondary"
                      >
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Animated CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-sm font-subtitle text-primary pt-4 border-t border-border-soft"
                    animate={{
                      x: hoveredIndex === index ? 4 : 0
                    }}
                  >
                    <span>Explore Project</span>
                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 4 : 0
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Sparkle Effect on Hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary rounded-full"
                            initial={{
                              x: 50 + i * 20,
                              y: 50 + i * 15,
                              scale: 0,
                              opacity: 0
                            }}
                            animate={{
                              x: [50 + i * 20, 80 + i * 30, 50 + i * 20],
                              y: [50 + i * 15, 20 + i * 10, 50 + i * 15],
                              scale: [0, 1, 0],
                              opacity: [0, 0.6, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;