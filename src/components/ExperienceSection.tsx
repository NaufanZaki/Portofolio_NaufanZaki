import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Briefcase,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Code2,
  ArrowUpRight,
  ArrowUp,
  X,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  organization: string;
  duration: string;
  period: string;
  location: string;
  type: string;
  typeMark: string;
  typeVariant: "enterprise" | "academic" | "leadership";
  icon: React.ElementType;
  details: string[];
  skills: string[];
  image: string;
  metrics: { label: string; value: string }[];
  highlight: string;
  accentColor: string;
}

// Rubber document stamp — double border, inset white ring, rotated
const TypeTag: React.FC<{ variant: ExperienceItem["typeVariant"]; label: string; size?: "sm" | "md" }> = ({ variant, label, size = "md" }) => {
  const configs = {
    enterprise: {
      bg: "bg-red-600",
      rotate: "-rotate-[2deg]",
      shadow: "shadow-red-900/40",
    },
    academic: {
      bg: "bg-blue-700",
      rotate: "rotate-[1.5deg]",
      shadow: "shadow-blue-900/40",
    },
    leadership: {
      bg: "bg-emerald-700",
      rotate: "-rotate-[1deg]",
      shadow: "shadow-emerald-900/40",
    },
  };

  const { bg, rotate, shadow } = configs[variant];
  const outerPad = size === "sm" ? "p-[2.5px]" : "p-[3px]";
  const innerPad = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = size === "sm" ? "text-[8px]" : "text-[10px]";

  return (
    <span
      className={`inline-flex flex-shrink-0 ${rotate} ${bg} ${outerPad} rounded-[5px] shadow-md ${shadow}`}
      style={{ mixBlendMode: "multiply" }}
    >
      {/* Inner white inset ring — the double-border stamp effect */}
      <span className={`flex items-center justify-center border border-white/60 rounded-[3px] ${innerPad}`}>
        <span className={`font-black font-mono tracking-[0.25em] uppercase text-white ${textSize} leading-none`}>
          {label}
        </span>
      </span>
    </span>
  );
};


const experiences: ExperienceItem[] = [
  {
    id: "exp1",
    index: "01",
    role: "Project Performance & Support Admin Intern",
    organization: "PT Semen Indonesia Tbk",
    duration: "Aug 2025 – Jan 2026",
    period: "6 months",
    location: "Indonesia",
    type: "Enterprise Internship",
    typeMark: "Enterprise",
    typeVariant: "enterprise" as const,
    icon: Building2,
    details: [
      "Built an automated Power BI dashboard via Power Query to centralize raw SharePoint data across multiple operating departments.",
      "Enabled risk management across 9 OpCos by programming DAX measures for real-time S-Curves and Estimate at Completion (EAC).",
      "Eliminated server costs by migrating infrastructure to cloud SaaS with Row-Level Security (RLS) policies.",
    ],
    skills: ["Power BI", "DAX Measures", "Power Query", "SharePoint", "Row-Level Security", "Cloud SaaS", "Risk Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "OpCos Integrated", value: "9 OpCos" },
      { label: "Infrastructure", value: "100% Cloud" },
      { label: "Duration", value: "6 Months" },
    ],
    highlight: "Enterprise BI & Risk Dashboards",
    accentColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "exp2",
    index: "02",
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 – Apr 2025",
    period: "4 months",
    location: "Madiun, East Java",
    type: "Enterprise Internship",
    typeMark: "Enterprise",
    typeVariant: "enterprise" as const,
    icon: Code2,
    details: [
      "Developed a Legal Management System (LMS) using ReactJS and Strapi to digitize corporate legal workflows.",
      "Boosted operational efficiency by building automated monitoring modules for legal cases, contracts, and licensing deadlines.",
      "Directed the full project lifecycle from UI/UX design wireframing and database blueprinting to final cloud deployment.",
    ],
    skills: ["React.js", "Strapi", "Node.js", "SQLite", "Tailwind CSS", "RESTful APIs", "UI/UX Design"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Stack", value: "React + Strapi" },
      { label: "System", value: "Legal LMS" },
      { label: "Duration", value: "4 Months" },
    ],
    highlight: "Corporate Legal LMS Digitalization",
    accentColor: "from-amber-500 to-orange-400",
  },
  {
    id: "exp3",
    index: "03",
    role: "Lecturer Assistant — Web Programming",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 – Nov 2024",
    period: "4 months",
    location: "Surabaya, East Java",
    type: "Academic",
    typeMark: "Academic",
    typeVariant: "academic" as const,
    icon: GraduationCap,
    details: [
      "Developed and delivered course materials covering Javascript, Express JS & MongoDB, and Nuxt.js framework.",
      "Created comprehensive examination materials, hands-on lab exercises, and assessment criteria.",
      "Supported students through regular consultation sessions and code debugging assistance.",
    ],
    skills: ["JavaScript", "Express.js", "MongoDB", "Nuxt.js", "Lab Instruction", "Technical Mentoring"],
    image: "https://images.unsplash.com/photo-1555066931-4365d1469c9b?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Curriculum", value: "JS + Nuxt.js" },
      { label: "Format", value: "Hands-on Labs" },
      { label: "Duration", value: "4 Months" },
    ],
    highlight: "Full-Stack Web Mentoring",
    accentColor: "from-emerald-500 to-teal-400",
  },
  {
    id: "exp4",
    index: "04",
    role: "Lecturer Assistant — Data Structures",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 – May 2024",
    period: "4 months",
    location: "Surabaya, East Java",
    type: "Academic",
    typeMark: "Academic",
    typeVariant: "academic" as const,
    icon: Code2,
    details: [
      "Created online programming exercises on HackerRank platform to evaluate algorithm efficiency.",
      "Developed supplementary learning materials for complex algorithms, linked lists, trees, and graph data structures.",
      "Mentored undergraduate students by providing targeted technical support, achieving a 100% class pass rate.",
    ],
    skills: ["Data Structures", "Algorithms", "HackerRank", "Problem Solving", "Technical Mentoring"],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
    metrics: [
      { label: "Pass Rate", value: "100%" },
      { label: "Platform", value: "HackerRank" },
      { label: "Duration", value: "4 Months" },
    ],
    highlight: "Algorithm & DS Mastery",
    accentColor: "from-violet-500 to-purple-400",
  },
  {
    id: "exp5",
    index: "05",
    role: "Head of Sponsorship Division",
    organization: "A Renewal Agent 5.0",
    duration: "Aug 2023 – Mar 2024",
    period: "8 months",
    location: "Surabaya, East Java",
    type: "Leadership",
    typeMark: "Leadership",
    typeVariant: "leadership" as const,
    icon: Award,
    details: [
      "Led a 6-member team in developing and executing comprehensive sponsorship outreach strategies.",
      "Secured funding and sponsorship deals totaling 80 million rupiah for event execution.",
      "Managed sponsor relationships, contract agreements, and branding deliverables with 7 corporate partners.",
    ],
    skills: ["Team Leadership", "Sponsorship Strategy", "Negotiation", "Stakeholder Management", "Budgeting"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Funding Secured", value: "80M IDR" },
      { label: "Partners", value: "7 Corps" },
      { label: "Team Size", value: "6 Members" },
    ],
    highlight: "Strategic Leadership & Deals",
    accentColor: "from-rose-500 to-pink-400",
  },
];

const ExperienceSection: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  const openModal = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  // Spotlight = first two (enterprise), list = rest
  const spotlight = experiences.slice(0, 2);
  const listItems = experiences.slice(2);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20 md:py-32">

      {/* Floating Bubble */}
      <AnimatePresence>
        {showFloatingBubble && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.85 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="fixed top-5 left-4 sm:left-10 z-50 pointer-events-auto cursor-pointer"
            onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="h-[38px] sm:h-[44px] flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 rounded-full bg-[#FDFBF7]/40 dark:bg-[#1C1917]/40 text-[#2C1A11] dark:text-[#FDFBF7] backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.15)] group overflow-hidden">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                Work Experience
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold">
                5 Roles
              </span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ─── SECTION HEADER — editorial style ─── */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-muted-foreground border border-border/60 px-3 py-1 rounded-full bg-card/50">
                Professional Journey
              </span>
              <div className="h-px flex-1 bg-border/40 max-w-[80px]" />
            </div>
            <h2
              className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              WORK
            </h2>
            <div className="flex items-end gap-4 md:gap-8">
              <h2
                className="font-title font-black leading-[0.9] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                EXPERIENCE
              </h2>
              <p className="hidden md:block text-sm font-subtitle text-muted-foreground max-w-xs mb-2 leading-relaxed">
                Enterprise internships, teaching assistantships & leadership roles that shaped my engineering thinking.
              </p>
            </div>
            <div className="mt-4 md:mt-6 pt-4 border-t border-border/40 flex flex-wrap items-center gap-4">
              {[
                { label: "Enterprise Internships", val: "2" },
                { label: "Academic Roles", val: "2" },
                { label: "Leadership", val: "1" },
                { label: "Total Duration", val: "26 months" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-title font-black text-2xl md:text-3xl text-foreground">{s.val}</span>
                  <span className="text-xs font-subtitle text-muted-foreground">{s.label}</span>
                  {i < 3 && <span className="text-border/60 ml-2">·</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── SPOTLIGHT: 2 BIG ENTERPRISE CARDS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/30 rounded-[28px] overflow-hidden border border-border/40 mb-4">
          {spotlight.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onClick={() => openModal(exp)}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative bg-card/70 dark:bg-zinc-900/70 backdrop-blur-sm p-7 md:p-10 cursor-pointer group overflow-hidden hover:bg-primary/5 transition-colors duration-500"
            >
              {/* Gradient accent blob */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${exp.accentColor} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

              {/* Index number — giant behind content */}
              <span
                className="absolute -bottom-4 -right-2 font-title font-black text-[8rem] leading-none text-foreground/5 select-none pointer-events-none"
              >
                {exp.index}
              </span>

              {/* Type marker + duration */}
              <div className="flex items-center justify-between mb-6">
                <TypeTag variant={exp.typeVariant} label={exp.typeMark} />
                <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
              </div>

              {/* Role headline */}
              <h3
                className="font-title font-black text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                {exp.role}
              </h3>

              {/* Org + location */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                <span className="font-subtitle font-bold text-primary">{exp.organization}</span>
                <span className="text-border/60">·</span>
                <span className="flex items-center gap-1 text-muted-foreground font-mono text-xs">
                  <MapPin className="w-3.5 h-3.5" />{exp.location}
                </span>
                <span className="text-border/60">·</span>
                <span className="flex items-center gap-1 text-muted-foreground font-mono text-xs">
                  <Calendar className="w-3.5 h-3.5" />{exp.duration}
                </span>
              </div>

              {/* Image thumbnail */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/7] mb-6 border border-border/40">
                <img
                  src={exp.image}
                  alt={exp.role}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 font-mono text-white text-xs bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                  {exp.highlight}
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/30 mb-6">
                {exp.metrics.map((m, i) => (
                  <div key={i} className="bg-card/60 dark:bg-zinc-900/60 px-4 py-3">
                    <p className="text-[10px] font-mono text-muted-foreground mb-0.5">{m.label}</p>
                    <p className="text-sm font-title font-black text-foreground group-hover:text-primary transition-colors">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.slice(0, 5).map((s, i) => (
                  <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-elevated border border-border/50 text-muted-foreground">
                    {s}
                  </span>
                ))}
                {exp.skills.length > 5 && (
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    +{exp.skills.length - 5} more
                  </span>
                )}
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                <span>View full details</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── STACKED LIST: remaining 3 roles ─── */}
        <div className="bg-border/30 rounded-[28px] overflow-hidden border border-border/40 divide-y divide-border/30">
          {listItems.map((exp, idx) => {
            const isHovered = hoveredId === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => openModal(exp)}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative bg-card/60 dark:bg-zinc-900/60 backdrop-blur-sm px-6 md:px-10 py-6 md:py-7 cursor-pointer hover:bg-primary/5 transition-colors duration-300 group"
              >
                {/* hidden index */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-title font-black text-6xl text-foreground/5 select-none pointer-events-none">
                  {exp.index}
                </span>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Left: type + role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <TypeTag variant={exp.typeVariant} label={exp.typeMark} size="sm" />
                      <span className="text-[10px] font-mono text-muted-foreground">{exp.duration}</span>
                    </div>
                    <h3 className="font-title font-black text-lg md:text-xl text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-subtitle font-semibold text-primary mt-0.5">{exp.organization}</p>
                  </div>

                  {/* Middle: metrics chips */}
                  <div className="hidden md:flex items-center gap-3">
                    {exp.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="text-center px-4 py-2 rounded-xl bg-surface-elevated border border-border/50">
                        <p className="text-sm font-title font-black text-foreground">{m.value}</p>
                        <p className="text-[9px] font-mono text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Right: skills + arrow */}
                  <div className="flex items-center gap-3">
                    <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[240px]">
                      {exp.skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-elevated border border-border/50 text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="w-9 h-9 rounded-full border border-border/60 group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-auto">
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ─── DETAIL MODAL ─── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedExperience && (
          <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[88vh] overflow-y-auto bg-background dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 p-0 shadow-2xl rounded-3xl">
            {/* Modal hero image */}
            <div className="relative h-48 md:h-56 overflow-hidden rounded-t-3xl">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.role}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-16">
                <span className="mb-2 inline-block text-[10px] font-mono font-bold tracking-widest uppercase text-white/80 border-b border-white/40 pb-px">
                  {selectedExperience.typeMark}
                </span>
                <h2 className="text-white font-title font-black text-xl md:text-2xl leading-tight">
                  {selectedExperience.role}
                </h2>
                <p className="text-white/70 text-sm font-subtitle mt-0.5">{selectedExperience.organization}</p>
              </div>
              <DialogClose asChild>
                <button className="absolute right-4 top-4 rounded-full p-2 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </DialogClose>
            </div>

            <div className="p-6 space-y-5">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4">
                <TypeTag variant={selectedExperience.typeVariant} label={selectedExperience.typeMark} />
                <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground"><Calendar size={13} className="text-primary" />{selectedExperience.duration}</span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground"><MapPin size={13} className="text-primary" />{selectedExperience.location}</span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/30">
                {selectedExperience.metrics.map((m, i) => (
                  <div key={i} className="bg-card/60 dark:bg-zinc-900/60 px-4 py-3 text-center">
                    <p className="text-[10px] font-mono text-muted-foreground">{m.label}</p>
                    <p className="text-base font-title font-black text-foreground">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-title font-bold text-foreground mb-3">Key Responsibilities & Deliverables</h4>
                <ul className="space-y-3">
                  {selectedExperience.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-title font-bold text-foreground mb-2">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExperience.skills.map((s, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-surface-elevated border border-border/50 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default ExperienceSection;