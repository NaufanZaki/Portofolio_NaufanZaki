import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Code2 } from 'lucide-react';
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
  }
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Full-Stack' | 'Backend'>('All');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const displayProject = hoveredProject || selectedProject;

  return (
    <section id="projects" className="relative min-h-screen">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Header - Always visible */}
        <div className="px-6 md:px-12 pt-20 pb-8 bg-background/80 backdrop-blur-sm z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-foreground">SELECTED</span>
              <br />
              <span className="text-gradient">PROJECTS</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Projects I've enjoyed working on—built, tweaked, and learned from.
            </p>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {(['All', 'Frontend', 'Full-Stack', 'Backend'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    filter === category
                      ? 'bg-foreground text-background'
                      : 'bg-surface-elevated text-muted-foreground hover:bg-surface-elevated-2'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 text-xs opacity-60">
                      {projects.filter(p => p.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Split Layout - Sticky */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Left - Preview (Sticky) */}
          <motion.div 
            className="relative h-full min-h-[400px] lg:min-h-[500px]"
            key={displayProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="sticky top-32 group">
              <div className="relative rounded-3xl overflow-hidden bg-surface-elevated border border-border-soft aspect-[4/3] shadow-2xl">
                {/* Preview Image */}
                <img 
                  src={displayProject.previewImage} 
                  alt={displayProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                
                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                      {displayProject.category}
                    </Badge>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {displayProject.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {displayProject.subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Project List (Scrollable) */}
          <div className="overflow-y-auto pr-4 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    setSelectedProject(project);
                    setDialogOpen(true);
                  }}
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedProject.id === project.id
                      ? 'bg-surface-elevated-2 border-primary shadow-lg'
                      : 'bg-surface-elevated border-border-soft hover:border-primary/50 hover:bg-surface-elevated-2'
                  }`}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <span className="text-4xl font-bold text-muted-foreground/30">
                        {String(project.id).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-elevated-2 border-border-soft">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground">
              {selectedProject.title}
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              {selectedProject.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Preview Image */}
            <div className="rounded-2xl overflow-hidden border border-border-soft">
              <img 
                src={selectedProject.previewImage} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Code Snippet
              </h3>
              <pre className="bg-background border border-border-soft rounded-xl p-4 overflow-x-auto">
                <code className="text-sm font-mono text-muted-foreground">
                  {selectedProject.codeSnippet}
                </code>
              </pre>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-border-soft">
              {selectedProject.links.demo && (
                <Button 
                  asChild
                  className="flex-1"
                >
                  <a 
                    href={selectedProject.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
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
                    className="flex items-center gap-2"
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