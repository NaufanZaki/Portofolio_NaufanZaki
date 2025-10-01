import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  description: string;
  techStack: string[];
}

const projects: Project[] = [
  {
    title: "Scalable Machine Learning with PySpark",
    description: "Built a distributed machine learning pipeline capable of processing large datasets efficiently using Apache Spark. Implemented various ML algorithms optimized for big data workloads with automated model evaluation and deployment strategies.",
    techStack: ["PySpark", "Machine Learning", "Big Data", "Apache Spark", "Python"]
  },
  {
    title: "Cloud Resource Optimization with Crow Search Algorithm",
    description: "Developed an intelligent cloud resource allocation system using the Crow Search Algorithm for optimization. The system automatically adjusts resource distribution based on workload patterns, reducing costs while maintaining performance.",
    techStack: ["Algorithms", "Optimization", "Cloud Computing", "Python", "AWS"]
  },
  {
    title: "Secure Attendance System with Encryption",
    description: "Created a robust attendance management system with end-to-end encryption using RSA algorithm. Features include biometric integration, real-time synchronization, and comprehensive audit trails for enhanced security.",
    techStack: ["Cryptography", "Security", "RSA", "Biometrics", "Java"]
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 font-subtitle">
            Innovative solutions combining cutting-edge technology with practical applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="card-portfolio bg-white dark:bg-gray-800 p-8 rounded-2xl group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex} 
                    className="skill-tag px-3 py-1 text-xs font-medium rounded-full"
                    variant="secondary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border-soft dark:border-gray-700">
                <span className="text-sm font-subtitle text-primary dark:text-primary-foreground group-hover:text-accent transition-colors">
                  View Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;