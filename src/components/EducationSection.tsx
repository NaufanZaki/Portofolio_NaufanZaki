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
  ArrowUpRight,
  BookOpen,
  Award,
  Sparkles,
} from "lucide-react";

import itsLogo from "@/assets/itsLogo.png";

// ── Rubber document stamp component ─────────────────────────────────────
type StampVariant = "honor" | "thesis" | "dept";

const stampConfigs: Record<StampVariant, { bg: string; rotate: string; shadow: string }> = {
  honor:  { bg: "bg-red-600",   rotate: "-rotate-[2deg]", shadow: "shadow-red-900/40" },
  thesis: { bg: "bg-blue-700",  rotate: "rotate-[1.5deg]", shadow: "shadow-blue-900/40" },
  dept:   { bg: "bg-emerald-700", rotate: "-rotate-[1deg]", shadow: "shadow-emerald-900/40" },
};

const AcademicStamp: React.FC<{ variant: StampVariant; label: string; size?: "sm" | "md" }> = ({ variant, label, size = "md" }) => {
  const { bg, rotate, shadow } = stampConfigs[variant];
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

export const EducationSection: React.FC = () => {
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<number>(0);

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

  const academicTracks = [
    {
      id: 0,
      title: "Software Engineering & Systems",
      tag: "Core Engineering",
      icon: Cpu,
      accent: "from-blue-600 to-cyan-500",
      description: "Building robust, scalable software architectures, algorithms, and full-stack web platforms.",
      courses: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Software Architecture & Design Patterns",
        "Web Programming & Frameworks",
        "Database Systems & Data Modeling",
      ],
      practicalProof: "Built PT INKA Legal Management System & ITS Lab Assistant Curriculum.",
    },
    {
      id: 1,
      title: "AI & Data Science",
      tag: "Machine Learning & XAI",
      icon: Brain,
      accent: "from-purple-600 to-indigo-500",
      description: "Developing lightweight deep learning models, quantization, and explainable AI for mobile edge devices.",
      courses: [
        "Artificial Intelligence",
        "Machine Learning & Neural Networks",
        "Explainable AI (CAM / Grad-CAM)",
        "Edge Model Quantization (TFLite)",
        "Computer Vision & Pattern Recognition",
      ],
      practicalProof: "Undergraduate Thesis on Medical Imaging & Grad-CAM Heatmap Interpretability.",
    },
    {
      id: 2,
      title: "IT Governance & Strategy",
      tag: "Enterprise Alignment",
      icon: Building,
      accent: "from-emerald-600 to-teal-500",
      description: "Aligning technology strategy with corporate risk management, compliance, and smart city platforms.",
      courses: [
        "IT Governance & Compliance Frameworks",
        "Project Management & Agile Scrums",
        "Smart City Urban Systems",
        "Enterprise Information Architecture",
      ],
      practicalProof: "GemasTIK 2024 National Finalist Smart City Platform & PT Semen Indonesia BI.",
    },
  ];

  return (
    <section ref={sectionRef} id="education" className="relative py-20 md:py-32 overflow-hidden bg-transparent">

      {/* Floating Glassmorphism Header Bubble (Positioned on the LEFT side) */}
      <AnimatePresence>
        {showFloatingBubble && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.85 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="fixed top-[72px] sm:top-5 right-4 sm:right-auto sm:left-10 z-50 pointer-events-auto cursor-pointer"
            onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })}
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
                Academic Degree & Foundation
              </span>
              <div className="h-px flex-1 bg-border/40 max-w-[80px]" />
            </div>
            <h2
              className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              ACADEMIC
            </h2>
            <div className="flex items-end gap-4 md:gap-8">
              <h2
                className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                DEGREE
              </h2>
              <p className="hidden md:block text-sm font-subtitle text-muted-foreground max-w-xs mb-2 leading-relaxed">
                Computer Science Engineering Degree from Institut Teknologi Sepuluh Nopember (ITS Surabaya).
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── INTERACTIVE BENTO GRID LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT COLUMN: Degree Badge & Thesis Spotlight (6 Cols) ── */}
          <div className="lg:col-span-6 space-y-6">

            {/* Institution & Degree Main Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border-2 border-border/80 rounded-[32px] p-6 md:p-8 shadow-xl relative overflow-hidden group"
            >
              {/* Faded ITS Logo Watermark Background */}
              <img
                src={itsLogo}
                alt="ITS Logo Watermark"
                className="absolute -bottom-10 -right-10 w-64 h-64 md:w-80 md:h-80 opacity-[0.08] dark:opacity-[0.06] pointer-events-none select-none object-contain grayscale dark:invert transition-opacity group-hover:opacity-[0.12]"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <AcademicStamp variant="dept" label="ITS Information Technology" />
                <AcademicStamp variant="honor" label="GPA 3.66 / 4.00" />
              </div>

              {/* Institution Title */}
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 p-2.5 flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-md">
                  <img src={itsLogo} alt="ITS Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-title font-black text-2xl md:text-3xl text-foreground leading-tight">
                    Institut Teknologi Sepuluh Nopember
                  </h3>
                  <p className="text-sm font-subtitle font-bold text-primary mt-1">
                    ITS Surabaya • Department of Information Technology
                  </p>
                </div>
              </div>

              <hr className="border-border/50 my-5" />

              {/* Degree Title */}
              <div className="space-y-2 mb-6">
                <h4 className="font-title font-bold text-lg md:text-xl text-foreground">
                  Bachelor of Science in Computer Science (Information Technology)
                </h4>
                <p className="text-xs text-muted-foreground font-subtitle leading-relaxed">
                  Rigorous 4-year engineering curriculum covering algorithms, full-stack systems, machine learning, and enterprise governance.
                </p>
              </div>

              {/* Meta Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-muted-foreground border-t border-border/40">
                <span className="flex items-center gap-1.5 bg-surface-elevated px-3 py-1 rounded-full border border-border/60">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Expected Sept 2026
                </span>
                <span className="flex items-center gap-1.5 bg-surface-elevated px-3 py-1 rounded-full border border-border/60">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Surabaya, ID
                </span>
              </div>
            </motion.div>

            {/* Undergraduate Thesis Spotlight Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/70 hover:border-primary/40 rounded-[28px] p-6 shadow-lg relative overflow-hidden group transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <FileCode2 className="w-4 h-4 text-primary" />
                  <span>Capstone Thesis Research</span>
                </div>
                <AcademicStamp variant="thesis" label="Active Thesis" />
              </div>

              <h4 className="font-title font-black text-lg md:text-xl text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                Early Detection of Cervical Cancer using CNN Models with Quantization and Explainable AI (XAI)
              </h4>

              <p className="text-xs font-subtitle text-muted-foreground leading-relaxed mb-4">
                Developed lightweight deep learning models (MobileNet, ResNet) optimized via post-training quantization for deployment on Android devices, integrated with Grad-CAM heatmaps for medical explainability.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border/50 text-foreground">CNN Models</span>
                <span className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border/50 text-foreground">Grad-CAM XAI</span>
                <span className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border/50 text-foreground">TFLite Quantization</span>
                <span className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border/50 text-foreground">Kotlin Mobile</span>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Interactive Specialization Tracks Console (6 Cols) ── */}
          <div className="lg:col-span-6 space-y-6">

            {/* Track Switcher Banner Header */}
            <div className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/80 rounded-[28px] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                  Academic Curriculum Specialization
                </span>
                <span className="text-xs font-mono text-primary font-bold">3 Tracks</span>
              </div>

              {/* Interactive Track Tabs */}
              <div className="grid grid-cols-1 gap-2.5">
                {academicTracks.map((track) => {
                  const TrackIcon = track.icon;
                  const isActive = activeTrackId === track.id;

                  return (
                    <button
                      key={track.id}
                      onClick={() => setActiveTrackId(track.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? "bg-foreground text-background border-foreground shadow-lg scale-[1.01]"
                          : "bg-surface-elevated/70 text-foreground border-border/60 hover:border-primary/40 hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive ? "bg-background/20 text-background" : "bg-primary/10 text-primary"
                        }`}>
                          <TrackIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`font-title font-bold text-sm leading-tight ${isActive ? "text-background" : "text-foreground"}`}>
                            {track.title}
                          </h4>
                          <p className={`text-[11px] font-mono mt-0.5 ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                            {track.tag}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isActive ? "text-background translate-x-0.5 -translate-y-0.5" : "text-muted-foreground group-hover:text-primary"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Track Coursework Spotlight Console */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrackId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border-2 border-primary/30 rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-4 border-b border-border/50 pb-3">
                  <span className="text-xs font-mono font-bold text-primary">
                    Coursework & Lab Curriculum
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {academicTracks[activeTrackId].courses.length} Core Subjects
                  </span>
                </div>

                <p className="text-xs font-subtitle text-muted-foreground leading-relaxed mb-4">
                  {academicTracks[activeTrackId].description}
                </p>

                {/* Course List */}
                <ul className="space-y-2 mb-6">
                  {academicTracks[activeTrackId].courses.map((course, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2 text-xs md:text-sm font-subtitle text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>

                {/* Practical Proof Footer */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Practical Proof:</span>
                  <span className="text-primary font-bold">{academicTracks[activeTrackId].practicalProof}</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EducationSection;
