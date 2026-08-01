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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  location: string;
  type: string;
  icon: React.ElementType;
  details: string[];
  skills: string[];
  image: string;
  metrics: { label: string; value: string }[];
  highlight: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Project Performance & Support Admin Intern",
    organization: "PT Semen Indonesia Tbk",
    duration: "Aug 2025 – Jan 2026",
    location: "Indonesia",
    type: "Enterprise Internship",
    icon: Building2,
    details: [
      "Built an automated Power BI dashboard via Power Query to centralize raw SharePoint data across multiple operating departments.",
      "Enabled risk management across 9 OpCos by programming DAX measures for real-time S-Curves and Estimate at Completion (EAC).",
      "Eliminated server costs by migrating infrastructure to cloud SaaS with Row-Level Security (RLS) policies.",
    ],
    skills: [
      "Power BI",
      "DAX Measures",
      "Power Query",
      "SharePoint",
      "Row-Level Security",
      "Cloud SaaS",
      "Risk Analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "OpCos Integrated", value: "9 Operating Cos" },
      { label: "Cost Savings", value: "100% Cloud SaaS" },
    ],
    highlight: "Enterprise BI & Data Pipelines",
  },
  {
    id: "exp2",
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 – Apr 2025",
    location: "Madiun, East Java",
    type: "Enterprise Internship",
    icon: Code2,
    details: [
      "Developed a Legal Management System (LMS) using ReactJS and Strapi to digitize corporate legal workflows.",
      "Boosted operational efficiency by building automated monitoring modules for legal cases, contracts, and licensing deadlines.",
      "Directed the full project lifecycle from UI/UX design wireframing and database blueprinting to final cloud deployment.",
    ],
    skills: [
      "React.js",
      "Strapi",
      "Node.js",
      "SQLite",
      "Tailwind CSS",
      "RESTful APIs",
      "UI/UX Design",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Stack", value: "ReactJS + Strapi" },
      { label: "Modules", value: "Legal & Case LMS" },
    ],
    highlight: "Digitalized Corporate Legal LMS",
  },
  {
    id: "exp3",
    role: "Lecturer Assistant, Web Programming Course",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 – Nov 2024",
    location: "Surabaya, East Java",
    type: "Academic Mentoring",
    icon: GraduationCap,
    details: [
      "Developed and delivered course materials covering Javascript, Express JS & MongoDB, and Nuxt.js framework.",
      "Created comprehensive examination materials, hands-on lab exercises, and assessment criteria.",
      "Supported students through regular consultation sessions and code debugging assistance.",
    ],
    skills: [
      "JavaScript",
      "Express.js",
      "MongoDB",
      "Nuxt.js",
      "Lab Instruction",
      "Technical Mentoring",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d1469c9b?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Course Curriculum", value: "JS, Express & Nuxt" },
      { label: "Lab Modules", value: "Hands-on Exercises" },
    ],
    highlight: "Full-Stack Web Mentoring",
  },
  {
    id: "exp4",
    role: "Lecturer Assistant, Data Structure Course",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 – May 2024",
    location: "Surabaya, East Java",
    type: "Academic Mentoring",
    icon: Code2,
    details: [
      "Created online programming exercises on HackerRank platform to evaluate algorithm efficiency.",
      "Developed supplementary learning materials for complex algorithms, linked lists, trees, and graph data structures.",
      "Mentored undergraduate students by providing targeted technical support, achieving a 100% class pass rate.",
    ],
    skills: [
      "Data Structures",
      "Algorithms",
      "HackerRank",
      "Problem Solving",
      "Technical Mentoring",
    ],
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
    metrics: [
      { label: "Pass Rate", value: "100% Class Pass" },
      { label: "Platform", value: "HackerRank Practice" },
    ],
    highlight: "Algorithm & DS Mastery",
  },
  {
    id: "exp5",
    role: "Head of Sponsorship Division",
    organization: "A Renewal Agent 5.0",
    duration: "Aug 2023 – Mar 2024",
    location: "Surabaya, East Java",
    type: "Leadership Role",
    icon: Award,
    details: [
      "Led a 6-member team in developing and executing comprehensive sponsorship outreach strategies.",
      "Secured funding and sponsorship deals totaling 80 million rupiah for event execution.",
      "Managed sponsor relationships, contract agreements, and branding deliverables with 7 corporate partners.",
    ],
    skills: [
      "Team Leadership",
      "Sponsorship Strategy",
      "Negotiation",
      "Stakeholder Management",
      "Budgeting",
    ],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Funding Secured", value: "80M IDR" },
      { label: "Corporate Partners", value: "7 Partners" },
    ],
    highlight: "Strategic Leadership & Deals",
  },
];

const ExperienceSection: React.FC = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const [filterType, setFilterType] = useState<string>("All");

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

  const openModal = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  const filteredExperiences =
    filterType === "All"
      ? experiences
      : experiences.filter((exp) => exp.type === filterType);

  return (
    <section ref={sectionRef} id="experience" className="py-20 md:py-32 relative overflow-hidden">
      
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
              
              {/* Briefcase Icon */}
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>

              {/* Title Text */}
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                Work Experience
              </span>

              {/* Counter Badge */}
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold whitespace-nowrap">
                5 Roles
              </span>

              {/* Scroll Top Arrow Accent */}
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Static Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              Professional Journey
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-title text-foreground mb-3">
              Work <span className="text-primary">Experience</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base lg:text-lg font-subtitle max-w-2xl mx-auto leading-relaxed mb-6">
              Impactful enterprise internships, software engineering, business intelligence, and academic mentoring.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["All", "Enterprise Internship", "Academic Mentoring", "Leadership Role"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3.5 py-1.5 rounded-full font-subtitle text-xs transition-all duration-300 ${
                      filterType === type
                        ? "bg-primary text-primary-foreground shadow-md font-semibold"
                        : "bg-surface-elevated text-foreground hover:bg-surface border border-border/50"
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Spine Line */}
          <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-amber-500/60 to-primary/20 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-20">
            {filteredExperiences.map((exp, idx) => {
              const IconComponent = exp.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-12 pl-12 md:pl-0"
                >
                  {/* Timeline Center Node Badge */}
                  <div className="absolute left-5 md:left-1/2 top-6 md:top-8 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-2xl bg-card dark:bg-zinc-900 border-2 border-primary text-primary shadow-lg flex items-center justify-center font-bold transition-transform hover:scale-110">
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                  </div>

                  {/* Main Experience Card */}
                  <div
                    className={`flex-1 ${
                      isEven ? "md:pr-14 md:text-right" : "md:order-2 md:pl-14 md:text-left"
                    }`}
                  >
                    <Card
                      onClick={() => openModal(exp)}
                      className="bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/70 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl rounded-3xl p-5 md:p-8 cursor-pointer group hover:-translate-y-1"
                    >
                      {/* Top Header inside Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border border-primary/20 font-mono text-[11px] md:text-xs px-3 py-1 rounded-full"
                        >
                          {exp.duration}
                        </Badge>
                        <Badge className="bg-surface-elevated text-foreground border border-border/50 font-subtitle text-[11px]">
                          {exp.type}
                        </Badge>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-lg md:text-2xl font-bold font-title text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                        {exp.role}
                      </h3>

                      <p className="text-xs md:text-sm font-subtitle font-semibold text-primary mb-2">
                        {exp.organization}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs font-subtitle text-muted-foreground mb-3">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {exp.location}
                      </div>

                      <hr className="border-border/40 mb-3" />

                      {/* Bullets */}
                      <ul className="space-y-2 text-xs md:text-sm text-muted-foreground dark:text-gray-300 text-left mb-4">
                        {exp.details.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {exp.skills.map((skill, sIdx) => (
                          <Badge
                            key={sIdx}
                            variant="outline"
                            className="text-[10px] md:text-[11px] font-mono px-2.5 py-0.5 bg-surface-elevated text-foreground border border-border/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors font-subtitle">
                        <span>View Role Visuals</span>
                        <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Card>
                  </div>

                  {/* Opposite Side Feature Widget (Eliminates Empty Whitespace on Desktop) */}
                  <div
                    className={`flex-1 hidden md:flex flex-col justify-center ${
                      isEven ? "order-2 md:pl-14" : "order-1 md:pr-14"
                    }`}
                  >
                    <div 
                      onClick={() => openModal(exp)}
                      className="bg-card/60 dark:bg-zinc-900/60 backdrop-blur-md border border-border/50 hover:border-primary/40 rounded-3xl p-6 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group space-y-4"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-border/40">
                        <img
                          src={exp.image}
                          alt={exp.role}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                          {exp.highlight}
                        </div>
                      </div>

                      {/* Key Metrics Chips */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {exp.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="bg-surface-elevated/80 border border-border/50 rounded-2xl p-3 text-left"
                          >
                            <p className="text-[10px] font-mono text-muted-foreground leading-none mb-1">
                              {m.label}
                            </p>
                            <p className="text-xs font-bold font-title text-foreground group-hover:text-primary transition-colors">
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Experience Detail Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedExperience && (
          <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-background dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 p-6 flex flex-col gap-0 shadow-2xl rounded-3xl">
            <DialogHeader className="pb-4 border-b border-border text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-primary/30">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-lg md:text-2xl font-bold font-title text-foreground dark:text-white break-words">
                    {selectedExperience.role}
                  </DialogTitle>
                  <p className="text-primary font-subtitle font-medium text-xs md:text-sm mt-0.5 break-words">
                    {selectedExperience.organization}
                  </p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto pr-1 mt-4 space-y-4">
              <img 
                src={selectedExperience.image} 
                alt={selectedExperience.role} 
                className="rounded-2xl object-cover w-full h-44 md:h-56 shadow-md border border-border" 
              />
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" />
                  {selectedExperience.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary" />
                  {selectedExperience.location}
                </span>
              </div>

              <div>
                <h4 className="text-base font-semibold text-foreground dark:text-white mb-3 font-title">
                  Key Responsibilities & Deliverables
                </h4>
                <ul className="space-y-3">
                  {selectedExperience.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground dark:text-zinc-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground dark:text-white mb-2 font-title">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExperience.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="font-mono text-xs px-3 py-1 bg-surface-elevated">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <button className="absolute right-4 top-4 rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-surface transition-opacity">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default ExperienceSection;