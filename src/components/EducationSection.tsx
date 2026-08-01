import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const EducationSection: React.FC = () => {
  const coursework = [
    "Data Structures & Algorithms",
    "Project Management",
    "Operating Systems",
    "Artificial Intelligence",
    "IT Governance",
    "Smart City Systems",
  ];

  return (
    <section id="education" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-foreground mb-4">
              Academic <span className="text-primary">Education</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300 font-subtitle max-w-2xl mx-auto">
              Foundation of theoretical knowledge and hands-on computer science engineering.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card/70 dark:bg-zinc-900/80 backdrop-blur-xl border border-border/60 shadow-2xl rounded-3xl p-6 md:p-10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Institution Emblem/Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white shadow-xl flex-shrink-0">
                <GraduationCap className="w-9 h-9 md:w-11 md:h-11" />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold font-title text-foreground">
                      Institut Teknologi Sepuluh Nopember (ITS)
                    </h3>
                    <Badge className="bg-primary/20 text-primary border border-primary/30 font-mono px-3 py-1 text-sm">
                      GPA: 3.66 / 4.00
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg md:text-xl font-medium text-amber-700 dark:text-amber-400 font-subtitle">
                    Bachelor of Science in Computer Science (Information Technology)
                  </h4>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                    <span className="flex items-center gap-1.5 font-subtitle">
                      <Calendar className="w-4 h-4 text-primary" />
                      Expected Graduation: Sept 2026
                    </span>
                    <span className="flex items-center gap-1.5 font-subtitle">
                      <MapPin className="w-4 h-4 text-primary" />
                      Surabaya, Indonesia
                    </span>
                  </div>
                </div>

                <hr className="border-border/50" />

                {/* Coursework */}
                <div>
                  <h5 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Key Relevant Coursework
                  </h5>
                  <div className="flex flex-wrap gap-2.5">
                    {coursework.map((course, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-surface-elevated dark:bg-zinc-800 text-foreground dark:text-gray-200 border border-border/50 px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-xl hover:border-primary/40 transition-colors"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
