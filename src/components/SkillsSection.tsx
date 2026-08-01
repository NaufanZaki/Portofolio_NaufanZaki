import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ArrowUp,
  Search,
  Terminal,
  Cpu,
  Brain,
  BarChart3,
  Palette,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "Full-Stack Web" | "AI & Machine Learning" | "BI & Data Engineering" | "Design & UI/UX" | "Strategy & Governance";
  levelLabel: "Core Expertise" | "Production Ready" | "Enterprise Scaled";
  application: string;
  iconName: string;
}

const skillsData: SkillItem[] = [
  // Full-Stack Web
  { name: "React.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "PT INKA Legal LMS & Modern Web Apps", iconName: "Zap" },
  { name: "Vue.js & Nuxt.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "SSR Web Apps & ITS Web Programming Lab", iconName: "Zap" },
  { name: "Strapi Headless CMS", category: "Full-Stack Web", levelLabel: "Production Ready", application: "PT INKA Legal Case Management System", iconName: "Layers" },
  { name: "Express.js & Node.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "RESTful Microservices & Backend APIs", iconName: "Code2" },
  { name: "MongoDB & SQLite", category: "Full-Stack Web", levelLabel: "Production Ready", application: "Database Schemas & Local Embedded DBs", iconName: "Layers" },
  { name: "TypeScript & JS (ES6+)", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "Type-Safe Enterprise Web Frontend", iconName: "Code2" },
  
  // AI & Machine Learning
  { name: "TensorFlow & Keras", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Cervical Cancer CNN Models (ResNet, MobileNet)", iconName: "Brain" },
  { name: "Explainable AI (Grad-CAM)", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Medical Heatmap Visualization for Diagnosis", iconName: "Brain" },
  { name: "Edge Model Quantization", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "TFLite Optimization for Kotlin Mobile", iconName: "Cpu" },
  { name: "Kotlin Android", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "On-Device Medical Inference App", iconName: "Cpu" },
  { name: "PyTorch & OpenCV", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "Computer Vision & Image Preprocessing", iconName: "Brain" },
  { name: "Python Data Science", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Pandas, NumPy, Scikit-Learn Pipelines", iconName: "Code2" },

  // BI & Data Engineering
  { name: "Microsoft Power BI", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "PT Semen Indonesia 9 OpCos Centralized BI", iconName: "BarChart3" },
  { name: "DAX Measures & Power Query", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "Real-Time S-Curves & EAC Calculation Engine", iconName: "BarChart3" },
  { name: "Row-Level Security (RLS)", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "Departmental Data Privacy Policies", iconName: "ShieldCheck" },
  { name: "ETL Pipelines & SharePoint", category: "BI & Data Engineering", levelLabel: "Production Ready", application: "Automated Data Ingestion & Transformation", iconName: "Layers" },
  { name: "Google Looker Studio", category: "BI & Data Engineering", levelLabel: "Production Ready", application: "Executive Performance Reporting", iconName: "BarChart3" },

  // Design & UI/UX
  { name: "Figma UI/UX Design", category: "Design & UI/UX", levelLabel: "Core Expertise", application: "Interactive Wireframes & Component Design Systems", iconName: "Palette" },
  { name: "Responsive Web Design", category: "Design & UI/UX", levelLabel: "Core Expertise", application: "Mobile-First Apple-Style Glassmorphic UIs", iconName: "Palette" },
  { name: "UI/UX Blueprinting", category: "Design & UI/UX", levelLabel: "Production Ready", application: "User Flow Mapping & Interaction Specs", iconName: "Palette" },

  // Strategy & Governance
  { name: "IT Governance & Strategy", category: "Strategy & Governance", levelLabel: "Production Ready", application: "Enterprise Systems Alignment & Risk Planning", iconName: "ShieldCheck" },
  { name: "Technical Leadership & Mentoring", category: "Strategy & Governance", levelLabel: "Core Expertise", application: "ITS Lecturer Assistant & Sponsorship Lead (80M IDR)", iconName: "ShieldCheck" },
  { name: "Data Governance & Security", category: "Strategy & Governance", levelLabel: "Production Ready", application: "Cloud SaaS Security & Access Controls", iconName: "ShieldCheck" },
];

const SkillsSection: React.FC = () => {
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"interactive" | "compact">("interactive");

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

  const categories = [
    "All",
    "Full-Stack Web",
    "AI & Machine Learning",
    "BI & Data Engineering",
    "Design & UI/UX",
    "Strategy & Governance",
  ];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.application.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Full-Stack Web":
        return Code2;
      case "AI & Machine Learning":
        return Brain;
      case "BI & Data Engineering":
        return BarChart3;
      case "Design & UI/UX":
        return Palette;
      case "Strategy & Governance":
        return ShieldCheck;
      default:
        return Cpu;
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      
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
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                Technical Skills
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold whitespace-nowrap">
                {skillsData.length} Skills
              </span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              Interactive Tech Hub & Radar
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 text-foreground font-title">
              Technical <span className="text-primary">Skills Playground</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base lg:text-lg font-subtitle max-w-2xl mx-auto leading-relaxed">
              Explore full-stack web engineering, enterprise Power BI analytics, TensorFlow Edge ML, and IT strategy.
            </p>
          </motion.div>
        </div>

        {/* Live Workstation Status Terminal Banner */}
        <div className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/80 rounded-[32px] p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-foreground flex items-center gap-2">
                  <span>nzluqmanulhakim@dev-workstation:~$</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Stack Status: <span className="text-emerald-500 font-semibold">22 Production Technologies Active</span>
                </p>
              </div>
            </div>

            {/* Live Search & View Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Filter skills (e.g. React, DAX)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 rounded-2xl bg-surface-elevated border-border/60 text-xs font-mono focus:border-primary"
                />
              </div>

              <div className="flex items-center bg-surface-elevated p-1 rounded-2xl border border-border/60 font-mono text-xs">
                <button
                  onClick={() => setViewMode("interactive")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    viewMode === "interactive"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    viewMode === "compact"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Tags
                </button>
              </div>
            </div>

          </div>

          {/* Filter Pills Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-border/50 mt-5">
            {categories.map((cat) => {
              const IconComp = getCategoryIcon(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-subtitle transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground font-semibold shadow-md"
                      : "bg-surface-elevated text-foreground hover:bg-surface border border-border/50"
                  }`}
                >
                  {cat !== "All" && <IconComp className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Display Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "interactive" ? (
            <motion.div
              key="interactive-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSkills.map((skill, idx) => {
                const IconComp = getCategoryIcon(skill.category);
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-md border border-border/70 hover:border-primary/50 rounded-[28px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 font-subtitle text-xs font-semibold text-primary">
                          <div className="p-1.5 rounded-xl bg-primary/10 text-primary">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span>{skill.category}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border-border/60">
                          {skill.levelLabel}
                        </Badge>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold font-title text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed font-subtitle">
                        <span className="font-semibold text-foreground">Practical Use:</span> {skill.application}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="compact-cloud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/80 rounded-[32px] p-8 shadow-xl"
            >
              <div className="flex flex-wrap gap-2.5">
                {filteredSkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="px-4 py-2 text-xs md:text-sm font-mono font-medium rounded-2xl bg-surface-elevated hover:bg-primary/10 text-foreground hover:text-primary border border-border/60 hover:border-primary/50 transition-all cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-1.5 inline" />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SkillsSection;