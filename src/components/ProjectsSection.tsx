import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Code2, Database, Lock, Github, Link as LinkIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  icon: React.ReactNode;
  color: string;
  links: {
    demo: string;
    github: string;
  };
  repo: string;
  codeSnippet: string;
}

const projects: Project[] = [
  {
    title: "Scalable Machine Learning with PySpark",
    description: "A distributed ML pipeline for large datasets using Apache Spark.",
    longDescription: "Built a distributed machine learning pipeline capable of processing large datasets efficiently using Apache Spark. Implemented various ML algorithms optimized for big data workloads with automated model evaluation and deployment strategies. This project demonstrates expertise in big data technologies and scalable machine learning.",
    techStack: ["PySpark", "Machine Learning", "Big Data", "Apache Spark", "Python"],
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500/20 to-pink-500/20",
    links: {
      demo: "#",
      github: "#"
    },
    repo: "pyspark-ml-pipeline",
    codeSnippet: `from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression
# ... (more code)`
  },
  {
    title: "Cloud Resource Optimization",
    description: "An intelligent cloud resource allocation system using Crow Search Algorithm.",
    longDescription: "Developed an intelligent cloud resource allocation system using the Crow Search Algorithm for optimization. The system automatically adjusts resource distribution based on workload patterns, reducing costs while maintaining performance. This highlights skills in optimization algorithms and cloud infrastructure management.",
    techStack: ["Algorithms", "Optimization", "Cloud Computing", "Python", "AWS"],
    icon: <Database className="w-8 h-8" />,
    color: "from-blue-500/20 to-cyan-500/20",
    links: {
      demo: "#",
      github: "#"
    },
    repo: "cloud-resource-optimizer",
    codeSnippet: `def crow_search_optimizer(objective_function, ...):
    # ... (optimization logic)
    return best_solution`
  },
  {
    title: "Secure Attendance System",
    description: "A robust attendance system with end-to-end RSA encryption.",
    longDescription: "Created a robust attendance management system with end-to-end encryption using the RSA algorithm. Features include biometric integration, real-time synchronization, and comprehensive audit trails for enhanced security. This project showcases strong knowledge of cryptography and secure system design.",
    techStack: ["Cryptography", "Security", "RSA", "Biometrics", "Java"],
    icon: <Lock className="w-8 h-8" />,
    color: "from-orange-500/20 to-red-500/20",
    links: {
      demo: "#",
      github: "#"
    },
    repo: "secure-attendance-system",
    codeSnippet: `import javax.crypto.Cipher;
// ... (encryption/decryption logic)
`
  }
];

const ProjectsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative group cursor-pointer h-full"
                >
                  <motion.div
                    className="relative h-full"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative bg-surface-elevated border border-border-soft rounded-3xl p-8 h-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"
                        animate={{
                          scale: hoveredIndex === index ? 1.5 : 1,
                          opacity: hoveredIndex === index ? 0.6 : 0.3
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
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
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm h-[4.5rem] overflow-hidden">
                        {project.description}
                      </p>
                      
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
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-surface-elevated-2 border-border-soft">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground">{project.title}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="overview" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <p className="text-muted-foreground">{project.longDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-4">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm font-mono text-muted-foreground">
                        {project.codeSnippet}
                      </code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="links" className="mt-4">
                    <div className="flex flex-col gap-4">
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                        <LinkIcon className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                        <Github className="w-4 h-4" />
                        <span>GitHub Repository</span>
                      </a>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;