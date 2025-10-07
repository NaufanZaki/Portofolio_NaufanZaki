import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Code2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'Frontend' | 'Full-Stack' | 'Backend';
  links: {
    demo?: string;
    github?: string;
  };
  previewImage: string;
  codeSnippet: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PySpark ML Pipeline",
    subtitle: "Machine Learning Platform",
    description: "A distributed ML pipeline for large datasets using Apache Spark.",
    longDescription: "Built a distributed machine learning pipeline capable of processing large datasets efficiently using Apache Spark. Implemented various ML algorithms optimized for big data workloads with automated model evaluation and deployment strategies. This project demonstrates expertise in big data technologies and scalable machine learning.",
    techStack: ["PySpark", "Machine Learning", "Big Data", "Apache Spark", "Python"],
    category: 'Backend',
    links: {
      demo: "#",
      github: "#"
    },
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    codeSnippet: `from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import LogisticRegression
from pyspark.ml import Pipeline

# Create feature vector
assembler = VectorAssembler(inputCols=features, outputCol="features")
lr = LogisticRegression(maxIter=10)
pipeline = Pipeline(stages=[assembler, lr])

# Train model
model = pipeline.fit(training_data)
predictions = model.transform(test_data)`
  },
  {
    id: 2,
    title: "Cloud Resource Optimizer",
    subtitle: "Optimization System",
    description: "An intelligent cloud resource allocation system using Crow Search Algorithm.",
    longDescription: "Developed an intelligent cloud resource allocation system using the Crow Search Algorithm for optimization. The system automatically adjusts resource distribution based on workload patterns, reducing costs while maintaining performance. This highlights skills in optimization algorithms and cloud infrastructure management.",
    techStack: ["Algorithms", "Optimization", "Cloud Computing", "Python", "AWS"],
    category: 'Full-Stack',
    links: {
      demo: "#",
      github: "#"
    },
    previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    codeSnippet: `def crow_search_optimizer(objective_function, bounds, n_crows=50, max_iter=100):
    crows = initialize_population(n_crows, bounds)
    memory = crows.copy()
    
    for iteration in range(max_iter):
        for i in range(n_crows):
            # Follow and search
            j = random.randint(0, n_crows - 1)
            new_position = crows[i] + random.random() * (memory[j] - crows[i])
            
            # Update if better
            if objective_function(new_position) < objective_function(memory[i]):
                memory[i] = new_position
    
    return best_solution(memory)`
  },
  {
    id: 3,
    title: "Secure Attendance System",
    subtitle: "Security Application",
    description: "A robust attendance system with end-to-end RSA encryption.",
    longDescription: "Created a robust attendance management system with end-to-end encryption using the RSA algorithm. Features include biometric integration, real-time synchronization, and comprehensive audit trails for enhanced security. This project showcases strong knowledge of cryptography and secure system design.",
    techStack: ["Cryptography", "Security", "RSA", "Biometrics", "Java"],
    category: 'Full-Stack',
    links: {
      demo: "#",
      github: "#"
    },
    previewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    codeSnippet: `import javax.crypto.Cipher;
import java.security.*;

public class RSAEncryption {
    private KeyPair keyPair;
    
    public RSAEncryption() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        keyPair = generator.generateKeyPair();
    }
    
    public byte[] encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
        return cipher.doFinal(data.getBytes());
    }
}`
  },
  {
    id: 4,
    title: "Real-time Analytics Dashboard",
    subtitle: "Data Visualization",
    description: "Interactive dashboard for real-time data monitoring and analytics.",
    longDescription: "Built a comprehensive analytics dashboard with real-time data processing capabilities. Features include customizable widgets, data export functionality, and advanced filtering options for deep insights.",
    techStack: ["React", "D3.js", "WebSocket", "Node.js", "MongoDB"],
    category: 'Frontend',
    links: {
      demo: "#",
      github: "#"
    },
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    codeSnippet: `const Dashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setData(prev => [...prev, JSON.parse(event.data)]);
    };
    return () => ws.close();
  }, []);
  
  return <ChartComponent data={data} />;
}`
  }
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Full-Stack' | 'Backend'>('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const displayProject = hoveredProject || selectedProject;

  // Reset image loaded state when display project changes
  useEffect(() => {
    setImageLoaded(false);
  }, [displayProject.id]);

  return (
    <section id="projects" className="relative bg-background">
      {/* Main container with proper height for scroll */}
      <div className="min-h-screen" ref={sectionRef}>
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 px-6 md:px-12 pt-16 md:pt-20 pb-6 md:pb-8 bg-background/95 backdrop-blur-sm z-20 border-b border-border-soft">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4">
                <span className="text-foreground">SELECTED</span>
                <br />
                <span className="text-gradient">PROJECTS</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 max-w-2xl">
                Projects I've enjoyed working on—built, tweaked, and learned from.
              </p>
              
              {/* Filter Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(['All', 'Frontend', 'Full-Stack', 'Backend'] as const).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all ${
                      filter === category
                        ? 'bg-foreground text-background shadow-md'
                        : 'bg-surface-elevated text-muted-foreground hover:bg-surface-elevated hover:text-foreground'
                    }`}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className="ml-2 text-xs opacity-60">
                        {projects.filter(p => p.category === category).length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 px-6 md:px-12 py-6 md:py-8 max-w-7xl mx-auto">
              {/* Left - Preview (Sticky on desktop) */}
              <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={displayProject.id}
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full flex items-center"
                  >
                    <div className="w-full group">
                      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-surface-elevated border border-border-soft aspect-[4/3] shadow-xl">
                        {/* Loading skeleton */}
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-surface-elevated animate-pulse" />
                        )}
                        
                        {/* Preview Image */}
                        <img 
                          src={displayProject.previewImage} 
                          alt={displayProject.title}
                          onLoad={() => setImageLoaded(true)}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          } group-hover:scale-105`}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70" />
                        
                        {/* Project Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                              {displayProject.category}
                            </Badge>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                              {displayProject.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-4">
                              {displayProject.subtitle}
                            </p>
                            
                            {/* Tech Stack Preview */}
                            <div className="flex flex-wrap gap-2">
                              {displayProject.techStack.slice(0, 3).map((tech, i) => (
                                <span 
                                  key={i}
                                  className="text-xs px-2 py-1 rounded bg-background/50 backdrop-blur-sm text-foreground border border-border-soft"
                                >
                                  {tech}
                                </span>
                              ))}
                              {displayProject.techStack.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded bg-background/50 backdrop-blur-sm text-foreground border border-border-soft">
                                  +{displayProject.techStack.length - 3}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        {/* Hover indicator */}
                        <motion.div 
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <ExternalLink className="w-4 h-4 text-foreground" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right - Project List (Scrollable) */}
              <div 
                ref={listRef}
                className="overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                style={{ maxHeight: 'calc(100vh - 280px)' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        layout: { duration: 0.3 }
                      }}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => {
                        setSelectedProject(project);
                        setDialogOpen(true);
                      }}
                      className={`relative p-4 md:p-6 rounded-xl md:rounded-2xl border cursor-pointer transition-all duration-300 ${
                        selectedProject.id === project.id
                          ? 'bg-surface-elevated border-primary shadow-lg scale-[1.02]'
                          : 'bg-surface border-border-soft hover:border-primary/50 hover:bg-surface-elevated hover:shadow-md'
                      }`}
                    >
                      {/* Mobile preview image */}
                      <div className="lg:hidden mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={project.previewImage} 
                          alt={project.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>

                      <div className="flex gap-4 md:gap-6">
                        <div className="flex-shrink-0">
                          <motion.span 
                            className={`text-3xl md:text-4xl font-bold transition-colors ${
                              selectedProject.id === project.id || hoveredProject?.id === project.id
                                ? 'text-primary'
                                : 'text-muted-foreground/30'
                            }`}
                            animate={{
                              scale: selectedProject.id === project.id ? [1, 1.1, 1] : 1
                            }}
                          >
                            {String(project.id).padStart(2, '0')}
                          </motion.span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-lg md:text-xl font-bold mb-2 transition-colors ${
                            selectedProject.id === project.id || hoveredProject?.id === project.id
                              ? 'text-primary'
                              : 'text-foreground'
                          }`}>
                            {project.title}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((tech, i) => (
                              <Badge 
                                key={i} 
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.techStack.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          className="flex-shrink-0 self-center"
                          animate={{
                            x: selectedProject.id === project.id || hoveredProject?.id === project.id ? 4 : 0
                          }}
                        >
                          <ExternalLink className={`w-5 h-5 transition-colors ${
                            selectedProject.id === project.id || hoveredProject?.id === project.id
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-elevated border-border-soft rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {selectedProject.title}
            </DialogTitle>
            <DialogDescription className="text-base md:text-lg text-muted-foreground">
              {selectedProject.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Preview Image */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-border-soft">
              <img 
                src={selectedProject.previewImage} 
                alt={selectedProject.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">About</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed break-words">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs md:text-sm px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Code Snippet
              </h3>
              <pre className="bg-background border border-border-soft rounded-xl p-4 overflow-x-auto">
                <code className="text-xs md:text-sm font-mono text-muted-foreground break-all">
                  {selectedProject.codeSnippet}
                </code>
              </pre>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-border-soft">
              {selectedProject.links.demo && (
                <Button 
                  asChild
                  className="flex-1"
                >
                  <a 
                    href={selectedProject.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {selectedProject.links.github && (
                <Button 
                  asChild
                  variant="outline"
                  className="flex-1"
                >
                  <a 
                    href={selectedProject.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;