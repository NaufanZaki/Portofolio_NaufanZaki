import React, { useState, useRef, useEffect } from "react";
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
  Layers,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface SkillItem {
  id: string;
  name: string;
  category: "Full-Stack Web" | "AI & Machine Learning" | "BI & Data Engineering" | "Design & UI/UX" | "Strategy & Governance";
  levelLabel: "Core Expertise" | "Production Ready" | "Enterprise Scaled";
  application: string;
  projectProof: string;
  highlight: string;
}

const skillsData: SkillItem[] = [
  // Full-Stack Web
  { id: "s1", name: "React.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "Built PT INKA Legal Management System (LMS) digitized workflows.", projectProof: "PT INKA (Persero)", highlight: "Frontend Architecture" },
  { id: "s2", name: "Vue.js & Nuxt.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "SSR Web applications & ITS Web Programming course curriculum.", projectProof: "ITS Surabaya", highlight: "SSR & Frameworks" },
  { id: "s3", name: "Strapi Headless CMS", category: "Full-Stack Web", levelLabel: "Production Ready", application: "RESTful headless CMS powering corporate legal case management.", projectProof: "PT INKA (Persero)", highlight: "Headless CMS" },
  { id: "s4", name: "Express.js & Node.js", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "Scalable backend microservices and RESTful API endpoints.", projectProof: "Full-Stack Systems", highlight: "Backend APIs" },
  { id: "s5", name: "MongoDB & SQLite", category: "Full-Stack Web", levelLabel: "Production Ready", application: "Document schemas and lightweight embedded databases.", projectProof: "Enterprise DBs", highlight: "Database Engineering" },
  { id: "s6", name: "TypeScript & JS (ES6+)", category: "Full-Stack Web", levelLabel: "Core Expertise", application: "Type-safe web frontends with strict design systems.", projectProof: "Enterprise Frontends", highlight: "Type-Safe Systems" },
  
  // AI & Machine Learning
  { id: "s7", name: "TensorFlow & Keras", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Undergraduate thesis CNN models (ResNet, MobileNet) for medical diagnostics.", projectProof: "B.S. Thesis @ ITS", highlight: "Deep Learning" },
  { id: "s8", name: "Explainable AI (Grad-CAM)", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Visual heatmap interpretability for CNN classification decisions.", projectProof: "XAI Research", highlight: "Model Interpretability" },
  { id: "s9", name: "Edge Model Quantization", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "TFLite model compression for low-latency mobile inference.", projectProof: "Edge AI", highlight: "Model Optimization" },
  { id: "s10", name: "Kotlin Android", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "Native Android application for real-time medical image inference.", projectProof: "Mobile AI App", highlight: "On-Device Inference" },
  { id: "s11", name: "PyTorch & OpenCV", category: "AI & Machine Learning", levelLabel: "Production Ready", application: "Computer vision preprocessing pipelines & image augmentation.", projectProof: "CV Pipelines", highlight: "Computer Vision" },
  { id: "s12", name: "Python Data Science", category: "AI & Machine Learning", levelLabel: "Core Expertise", application: "Pandas, NumPy, and Scikit-Learn exploratory data pipelines.", projectProof: "Data Analytics", highlight: "Data Science" },

  // BI & Data Engineering
  { id: "s13", name: "Microsoft Power BI", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "Centralized risk management dashboards across 9 operating companies.", projectProof: "PT Semen Indonesia Tbk", highlight: "Enterprise BI" },
  { id: "s14", name: "DAX Measures & Power Query", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "Real-time S-Curves & Estimate at Completion (EAC) calculation engines.", projectProof: "PT Semen Indonesia Tbk", highlight: "DAX Engineering" },
  { id: "s15", name: "Row-Level Security (RLS)", category: "BI & Data Engineering", levelLabel: "Enterprise Scaled", application: "Granular departmental data privacy policies across multi-tenant BI.", projectProof: "BUMN Governance", highlight: "Data Governance" },
  { id: "s16", name: "ETL Pipelines & SharePoint", category: "BI & Data Engineering", levelLabel: "Production Ready", application: "Automated ingestion & transformation of raw SharePoint operational data.", projectProof: "PT Semen Indonesia Tbk", highlight: "Cloud ETL" },
  { id: "s17", name: "Google Looker Studio", category: "BI & Data Engineering", levelLabel: "Production Ready", application: "Executive reporting & interactive performance metrics visualization.", projectProof: "Executive BI", highlight: "Data Viz" },

  // Design & UI/UX
  { id: "s18", name: "Figma UI/UX Design", category: "Design & UI/UX", levelLabel: "Core Expertise", application: "Interactive high-fidelity wireframes and scalable component design systems.", projectProof: "UI/UX Design", highlight: "Design Systems" },
  { id: "s19", name: "Responsive Web Design", category: "Design & UI/UX", levelLabel: "Core Expertise", application: "Mobile-first Apple-style glassmorphic user interfaces.", projectProof: "Web weaver", highlight: "Glassmorphism UI" },
  { id: "s20", name: "UI/UX Blueprinting", category: "Design & UI/UX", levelLabel: "Production Ready", application: "User flow mapping, interaction specs, and design handoff docs.", projectProof: "Product Blueprinting", highlight: "UX Strategy" },

  // Strategy & Governance
  { id: "s21", name: "IT Governance & Strategy", category: "Strategy & Governance", levelLabel: "Production Ready", application: "Enterprise systems alignment, digital transformation & risk planning.", projectProof: "Enterprise IT", highlight: "IT Strategy" },
  { id: "s22", name: "Technical Mentoring", category: "Strategy & Governance", levelLabel: "Core Expertise", application: "ITS Lecturer Assistant & Sponsorship Division Lead (80M IDR funding).", projectProof: "ITS & Sponsorship", highlight: "Tech Leadership" },
  { id: "s23", name: "Data Governance & Security", category: "Strategy & Governance", levelLabel: "Production Ready", application: "Cloud SaaS security, role-based permissions, and access controls.", projectProof: "Cloud Security", highlight: "SaaS Security" },
];

// ── Rubber document stamp component ─────────────────────────────────────
type LevelLabel = "Core Expertise" | "Production Ready" | "Enterprise Scaled";

const levelStampConfig: Record<LevelLabel, { bg: string; rotate: string; shadow: string }> = {
  "Core Expertise":    { bg: "bg-indigo-600",  rotate: "-rotate-[1.5deg]", shadow: "shadow-indigo-900/40" },
  "Production Ready":  { bg: "bg-amber-600",   rotate: "rotate-[1deg]",    shadow: "shadow-amber-900/40"  },
  "Enterprise Scaled": { bg: "bg-emerald-700", rotate: "-rotate-[2deg]",   shadow: "shadow-emerald-900/40" },
};

const SkillStamp: React.FC<{ label: LevelLabel; size?: "sm" | "md" }> = ({ label, size = "md" }) => {
  const { bg, rotate, shadow } = levelStampConfig[label];
  const outerPad = size === "sm" ? "p-[2px]"   : "p-[3px]";
  const innerPad = size === "sm" ? "px-1.5 py-px" : "px-2.5 py-0.5";
  const textSize = size === "sm" ? "text-[7px]"  : "text-[9px]";
  return (
    <span
      className={`inline-flex flex-shrink-0 ${rotate} ${bg} ${outerPad} rounded-[5px] shadow-md ${shadow}`}
      style={{ mixBlendMode: "multiply" }}
    >
      <span className={`flex items-center justify-center border border-white/50 rounded-[3px] ${innerPad}`}>
        <span className={`font-black font-mono tracking-[0.2em] uppercase text-white ${textSize} leading-none`}>
          {label}
        </span>
      </span>
    </span>
  );
};

const categoryPillars = [
  { id: "Full-Stack Web", name: "Full-Stack Web", icon: Code2, accent: "from-blue-600 to-cyan-500", tag: "Frontend & Backend" },
  { id: "AI & Machine Learning", name: "AI & Machine Learning", icon: Brain, accent: "from-purple-600 to-indigo-500", tag: "Edge AI & XAI" },
  { id: "BI & Data Engineering", name: "BI & Data Engineering", icon: BarChart3, accent: "from-emerald-600 to-teal-500", tag: "Power BI & DAX" },
  { id: "Design & UI/UX", name: "Design & UI/UX", icon: Palette, accent: "from-amber-500 to-orange-400", tag: "Design Systems" },
  { id: "Strategy & Governance", name: "Strategy & Governance", icon: ShieldCheck, accent: "from-rose-600 to-pink-500", tag: "IT Strategy" },
];

const SkillsSection: React.FC = () => {
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Full-Stack Web");
  const [activeSkillId, setActiveSkillId] = useState<string>("s1");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !headerRef.current) return;
      const headerRect = headerRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      setShowFloatingBubble(headerRect.top <= 100 && sectionRect.bottom >= 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter skills for active category or global search
  const isSearching = searchQuery.trim().length > 0;
  
  const categorySkills = isSearching
    ? skillsData.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.application.toLowerCase().includes(searchQuery.toLowerCase()))
    : skillsData.filter((s) => s.category === activeCategory);

  // Active highlighted skill object
  const activeSkill = skillsData.find((s) => s.id === activeSkillId) || categorySkills[0] || skillsData[0];

  // Auto update active skill when category changes
  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery("");
    const firstInCat = skillsData.find((s) => s.category === catId);
    if (firstInCat) setActiveSkillId(firstInCat.id);
  };

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 md:py-32 overflow-hidden bg-transparent">

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
            onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })}
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ─── SECTION HEADER — Editorial Style ─── */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-muted-foreground border border-border/60 px-3 py-1 rounded-full bg-card/50">
                Interactive Engineering Matrix
              </span>
              <div className="h-px flex-1 bg-border/40 max-w-[80px]" />
            </div>
            <h2
              className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              TECHNICAL
            </h2>
            <div className="flex items-end gap-4 md:gap-8">
              <h2
                className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                SKILLS RADAR
              </h2>
              <p className="hidden md:block text-sm font-subtitle text-muted-foreground max-w-xs mb-2 leading-relaxed">
                Explore 23 production-proven technologies organized across 5 core engineering pillars.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── INTERACTIVE WORKSTATION CONSOLE (2-Column Bento) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT COLUMN: 5 Category Pillars Hub (4 Cols on LG) ── */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Search Box */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search any tech (e.g. React, Power BI, DAX)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-11 rounded-2xl bg-card/70 dark:bg-zinc-900/70 border-border/70 text-xs font-mono focus:border-primary backdrop-blur-md shadow-sm"
              />
            </div>

            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-1 mb-2">
              Select Engineering Pillar:
            </p>

            {/* 5 Pillar Buttons */}
            {categoryPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              const count = skillsData.filter((s) => s.category === pillar.id).length;
              const isActive = !isSearching && activeCategory === pillar.id;

              return (
                <button
                  key={pillar.id}
                  onClick={() => handleCategoryClick(pillar.id)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-lg scale-[1.01]"
                      : "bg-card/70 dark:bg-zinc-900/70 backdrop-blur-md border-border/70 text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? "bg-background/20 text-background" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}>
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <h4 className={`font-title font-bold text-sm md:text-base leading-tight truncate ${isActive ? "text-background" : "text-foreground"}`}>
                        {pillar.name}
                      </h4>
                      <p className={`text-xs font-mono mt-0.5 truncate ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                        {pillar.tag}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      isActive ? "bg-background/20 text-background" : "bg-surface-elevated border border-border/60 text-muted-foreground"
                    }`}>
                      {count} Techs
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Terminal Status Bar */}
            <div className="p-4 rounded-2xl bg-card/50 dark:bg-zinc-900/50 border border-border/50 backdrop-blur-sm flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span>Status: <strong className="text-foreground">23 Skills Production Active</strong></span>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Active Category Spotlight & Interactive Matrix (7 Cols on LG) ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Active Skill Hero Spotlight Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border-2 border-primary/30 rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden group"
              >
                {/* Background ambient radial highlight */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                      {activeSkill.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">•</span>
                    <span className="text-xs font-mono text-muted-foreground">{activeSkill.highlight}</span>
                  </div>

                  <SkillStamp label={activeSkill.levelLabel} />
                </div>

                <h3 className="font-title font-black text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                  {activeSkill.name}
                </h3>

                <p className="text-sm font-subtitle text-muted-foreground leading-relaxed mb-5">
                  {activeSkill.application}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs font-mono">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Applied @ {activeSkill.projectProof}</span>
                  </div>
                  <span className="text-muted-foreground">Production Proven</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Skill Tiles Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {isSearching ? `Search Results (${categorySkills.length})` : `${activeCategory} Skills Matrix:`}
                </span>
                <span className="text-xs font-mono text-muted-foreground">Click tile to spotlight</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categorySkills.map((skill) => {
                  const isSelected = activeSkill.id === skill.id;

                  return (
                    <motion.div
                      key={skill.id}
                      onClick={() => setActiveSkillId(skill.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-md"
                          : "bg-card/60 dark:bg-zinc-900/60 backdrop-blur-md border-border/60 hover:border-primary/40 hover:bg-card/90"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className={`font-title font-bold text-sm leading-tight transition-colors ${
                          isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}>
                          {skill.name}
                        </h4>
                        <SkillStamp label={skill.levelLabel} size="sm" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/40">
                        <span className="truncate">{skill.highlight}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                          isSelected ? "text-primary translate-x-0.5 -translate-y-0.5" : "text-muted-foreground group-hover:text-primary"
                        }`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SkillsSection;