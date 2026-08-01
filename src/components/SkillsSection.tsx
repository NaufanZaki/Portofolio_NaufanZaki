import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Full-Stack Web Development",
    skills: ["React.js", "Vue.js", "Nuxt.js", "Strapi", "Express.js", "MongoDB", "SQLite", "JavaScript", "TypeScript", "HTML5 & CSS3"]
  },
  {
    category: "Machine Learning & AI",
    skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Quantization", "Explainable AI (CAM)", "Python", "Kotlin (Android)"]
  },
  {
    category: "Business Intelligence & Data",
    skills: ["Microsoft Power BI", "DAX Measures", "Power Query", "Row-Level Security (RLS)", "ETL Pipelines", "Google Looker Studio", "Excel Analytics"]
  },
  {
    category: "Design & Product UI/UX",
    skills: ["Figma", "Adobe Lightroom", "UI/UX Blueprinting", "Wireframing", "Responsive Web Design"]
  },
  {
    category: "Strategy & Professional Skills",
    skills: ["IT Infrastructure Strategy", "Stakeholder Management", "Executive Reporting", "Data Governance & Security", "Technical Documentation", "Microsoft Project", "Notion"]
  }
];

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground font-title">
              Technical <span className="text-primary">Skills</span> & Expertise
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-subtitle max-w-2xl mx-auto">
              A comprehensive technical toolkit spanning web engineering, BI analytics, machine learning, and IT governance.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-3xl border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-5 text-primary font-title">
                  {category.category}
                </h3>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      className="px-3.5 py-1.5 text-xs md:text-sm font-medium font-mono rounded-xl bg-surface-elevated text-foreground border border-border/50 hover:border-primary/50 transition-colors"
                      variant="secondary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;