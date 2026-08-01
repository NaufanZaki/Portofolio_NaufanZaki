import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Briefcase,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Code2,
  ArrowUpRight,
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
      "Mentored 90 students by providing targeted technical support, ultimately achieving a 100% class pass rate.",
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
  },
];

const ExperienceSection: React.FC = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-24">
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
            <p className="text-muted-foreground text-xs sm:text-base lg:text-lg font-subtitle max-w-2xl mx-auto leading-relaxed">
              A comprehensive record of enterprise roles, software engineering, business intelligence, and academic leadership.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Spine Line (Visible on Mobile & Desktop) */}
          <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-amber-500/60 to-primary/20 -translate-x-1/2" />

          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, idx) => {
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

                  {/* Content Card */}
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

                  {/* Right Column (Spacer for opposite side on Desktop) */}
                  <div
                    className={`flex-1 hidden md:block ${
                      isEven ? "order-2" : "order-1"
                    }`}
                  />
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