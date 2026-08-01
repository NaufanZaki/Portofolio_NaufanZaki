import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  FileCode2,
  Cpu,
  Brain,
  CheckCircle2,
  Building,
  ArrowUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const EducationSection: React.FC = () => {
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !headerRef.current) return;
      const headerRect = headerRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      const headerScrolledPast = headerRect.top <= 100;
      const sectionStillVisible = sectionRect.bottom >= 180;

      setShowFloatingBubble(headerScrolledPast && sectionStillVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const academicTracks = [
    {
      title: "Software Engineering & Systems",
      icon: Cpu,
      courses: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Software Architecture",
        "Web Programming & Frameworks",
      ],
    },
    {
      title: "AI & Data Science",
      icon: Brain,
      courses: [
        "Artificial Intelligence",
        "Machine Learning",
        "Explainable AI (CAM / Grad-CAM)",
        "Edge Model Quantization",
      ],
    },
    {
      title: "IT Governance & Management",
      icon: Building,
      courses: [
        "IT Governance & Compliance",
        "Project Management",
        "Smart City Systems",
        "Enterprise Information Systems",
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="education" className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      
      {/* Floating Glassmorphism Header Bubble (Positioned on the LEFT side) */}
      <AnimatePresence>
        {showFloatingBubble && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.85 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="fixed top-5 left-4 sm:left-10 max-w-[calc(100vw-180px)] sm:max-w-none z-50 pointer-events-auto cursor-pointer"
            onClick={() => {
              sectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="h-[38px] sm:h-[44px] flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 rounded-full bg-[#FDFBF7]/40 dark:bg-[#1C1917]/40 text-[#2C1A11] dark:text-[#FDFBF7] backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.15)] group relative overflow-hidden">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                Education & Degree
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold whitespace-nowrap">
                GPA 3.66
              </span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              Academic Background
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-title text-foreground mb-3">
              Education & <span className="text-primary">Degree</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base lg:text-lg font-subtitle max-w-2xl mx-auto leading-relaxed">
              Formal computer science engineering degree from Institut Teknologi Sepuluh Nopember (ITS Surabaya).
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/80 shadow-2xl rounded-[32px] md:rounded-[36px] p-6 md:p-10 relative">
            
            {/* Top Institutional Header Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[22px] bg-card border-2 border-primary/40 flex items-center justify-center text-primary shadow-md flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-3xl font-bold font-title text-foreground leading-tight">
                    Institut Teknologi Sepuluh Nopember (ITS)
                  </h3>
                  <p className="text-xs md:text-sm font-subtitle font-semibold text-primary mt-0.5">
                    Department of Informatics / Computer Science
                  </p>
                </div>
              </div>

              {/* GPA Badge */}
              <div className="bg-surface-elevated border border-border/60 px-4 py-2.5 rounded-[20px] text-left md:text-right font-mono">
                <p className="text-[10px] text-muted-foreground uppercase leading-none mb-0.5">Cumulative GPA</p>
                <p className="text-base md:text-lg font-bold text-primary">3.66 <span className="text-xs text-muted-foreground font-normal">/ 4.00</span></p>
              </div>
            </div>

            {/* Degree Meta & Timeline */}
            <div className="py-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg md:text-xl font-bold font-title text-foreground">
                    Bachelor of Science in Computer Science (Information Technology)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-subtitle mt-0.5">
                    Focus Area: Software Engineering, Data Engineering & Machine Learning
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-surface-elevated px-3.5 py-1 rounded-full border border-border/50">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Expected Sept 2026
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface-elevated px-3.5 py-1 rounded-full border border-border/50">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Surabaya, ID
                  </span>
                </div>
              </div>

              {/* Undergraduate Thesis Box */}
              <div className="bg-surface-elevated/70 border border-border/60 rounded-[24px] p-6 space-y-2 mt-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-primary" />
                    Undergraduate Thesis / Capstone Project
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono px-2.5 py-0.5 bg-primary/10 text-primary border-primary/30 rounded-full">
                    Ongoing Thesis
                  </Badge>
                </div>
                <p className="text-sm md:text-base font-bold font-title text-foreground leading-snug">
                  Early Detection of Cervical Cancer using CNN-Based Models with Quantization and Explainable AI (XAI)
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed font-subtitle">
                  Developed lightweight deep learning models (MobileNet, ResNet, EfficientNet) optimized via post-training quantization for deployment on resource-constrained mobile devices, integrated with Grad-CAM heatmaps for medical explainability.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                  <Badge variant="secondary" className="bg-card rounded-xl">CNN Models</Badge>
                  <Badge variant="secondary" className="bg-card rounded-xl">Grad-CAM XAI</Badge>
                  <Badge variant="secondary" className="bg-card rounded-xl">Model Quantization</Badge>
                  <Badge variant="secondary" className="bg-card rounded-xl">Kotlin Android</Badge>
                  <Badge variant="secondary" className="bg-card rounded-xl">Python & TensorFlow</Badge>
                </div>
              </div>
            </div>

            {/* Academic Coursework Tracks */}
            <div className="pt-6 border-t border-border/60">
              <h4 className="text-sm font-semibold text-foreground font-title mb-4">
                Structured Academic Specialization Tracks
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {academicTracks.map((track, idx) => {
                  const TrackIcon = track.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-surface-elevated/60 border border-border/50 rounded-[24px] p-5 space-y-3"
                    >
                      <div className="flex items-center gap-2 font-subtitle text-xs font-bold text-foreground">
                        <div className="p-1.5 rounded-xl bg-primary/10 text-primary">
                          <TrackIcon className="w-4 h-4" />
                        </div>
                        {track.title}
                      </div>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {track.courses.map((course, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2 font-subtitle">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
