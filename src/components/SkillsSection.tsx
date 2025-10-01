import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Web Development",
    skills: ["React.js", "Vue.js", "Nuxt.js", "Strapi", "HTML", "CSS", "JavaScript", "TypeScript", "Node.js"]
  },
  {
    category: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Pandas", "NumPy", "Jupyter"]
  },
  {
    category: "Backend & Database",
    skills: ["Express.js", "MongoDB", "PostgreSQL", "RESTful APIs", "GraphQL", "Docker"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Apache Spark", "Git", "CI/CD", "Linux", "Docker", "Kubernetes"]
  },
  {
    category: "Design & Tools",
    skills: ["Figma", "Adobe Lightroom", "UI/UX Design", "Responsive Design"]
  }
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section-padding bg-surface/20 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 font-subtitle">
            A comprehensive toolkit for building modern applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="card-portfolio bg-white dark:bg-gray-800 p-8 rounded-2xl animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-6 text-primary dark:text-primary-foreground font-title">
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    className="skill-tag px-4 py-2 text-sm font-medium rounded-full"
                    variant="secondary"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;