import React from 'react';
import { motion } from 'framer-motion';
import heroAvatar from '@/assets/heroAvatar.png';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  BookOpen,
  Star,
  GitFork,
  ArrowRight,
  Building2,
  GraduationCap,
  Award,
  Terminal,
  FileCode2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fake GitHub contribution matrix cells (52 weeks x 7 days simplified grid)
  const contributionLevels = [
    0, 1, 2, 3, 4, 1, 2, 0, 3, 4, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4,
    1, 2, 3, 4, 2, 1, 0, 3, 4, 1, 2, 3, 0, 4, 2, 1, 3, 4, 2, 1,
    2, 3, 4, 1, 0, 2, 3, 4, 2, 1, 3, 4, 0, 1, 2, 3, 4, 2, 1, 3
  ];

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-900/40 dark:bg-emerald-950/60 border border-emerald-700/30";
      case 2: return "bg-emerald-700/60 dark:bg-emerald-800/80 border border-emerald-600/40";
      case 3: return "bg-emerald-500/80 dark:bg-emerald-600/90 border border-emerald-400/50";
      case 4: return "bg-emerald-400 dark:bg-emerald-400 border border-emerald-300";
      default: return "bg-surface-elevated/40 border border-border/30";
    }
  };

  const pinnedRepos = [
    {
      name: "cervical-cancer-xai-edge-ml",
      desc: "Undergraduate thesis CNN model (MobileNet, ResNet) with Quantization & CAM XAI paired with Kotlin Android app.",
      lang: "Python / Kotlin",
      langColor: "bg-blue-500",
      stars: 24,
      forks: 8,
      category: "AI & Data",
    },
    {
      name: "inka-legal-management-system",
      desc: "Full-stack legal case monitoring and contract tracking platform built for PT INKA (Persero).",
      lang: "TypeScript / React",
      langColor: "bg-amber-500",
      stars: 19,
      forks: 5,
      category: "Full-Stack",
    },
    {
      name: "semen-indonesia-powerbi-risk",
      desc: "Enterprise Power BI dashboard centralizing SharePoint data across 9 OpCos with DAX S-Curves & EAC.",
      lang: "Power BI / DAX",
      langColor: "bg-[#F2C811]",
      stars: 31,
      forks: 12,
      category: "Backend & BI",
    },
    {
      name: "smart-city-urban-platform",
      desc: "GemasTIK 2024 National Finalist urban management platform for smart city IoT analytics.",
      lang: "TypeScript",
      langColor: "bg-sky-500",
      stars: 16,
      forks: 4,
      category: "Frontend",
    },
  ];

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GitHub Layout: Left Sidebar + Right Main Readme Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Left Sidebar (GitHub Profile Sidebar) */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-start gap-4">
              
              {/* Profile Avatar */}
              <div className="relative group flex-shrink-0">
                <img
                  src={heroAvatar}
                  alt="Naufan Zaki Luqmanulhakim"
                  className="w-36 h-36 sm:w-44 sm:h-44 lg:w-64 lg:h-64 rounded-[32px] border-2 border-border/80 object-cover shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-card dark:bg-zinc-900 border border-border/80 rounded-full p-2 text-xs flex items-center gap-1.5 shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-medium hidden sm:inline">Open to Hire</span>
                </div>
              </div>

              {/* Name & Handle */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold font-title text-foreground leading-tight">
                  Naufan Zaki L.
                </h1>
                <p className="text-sm font-mono text-muted-foreground">
                  @NaufanZaki
                </p>
                <p className="text-xs font-subtitle text-primary font-semibold mt-1">
                  Full-Stack Web & BI / Data Engineer
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-subtitle">
              Final-year IT Student @ ITS Surabaya. Combining React.js, Vue.js & Strapi full-stack engineering with Power BI dashboards, DAX analytics, and TensorFlow edge ML.
            </p>

            {/* Followers / Stats Row */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono pt-2 border-t border-border/50">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" />
                <strong className="text-foreground">3.66</strong> GPA
              </span>
              <span>•</span>
              <span><strong className="text-foreground">ITS</strong> Surabaya</span>
              <span>•</span>
              <span><strong className="text-foreground">Enterprise</strong> & ML</span>
            </div>

            {/* Contact Meta List */}
            <div className="space-y-2 text-xs text-muted-foreground font-subtitle pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Tangerang Selatan & Surabaya, ID</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <a href="mailto:nzluqmanulhakim@gmail.com" className="hover:text-primary transition-colors font-mono">
                  nzluqmanulhakim@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                <a href="https://linkedin.com/in/naufan-zaki-luqmanulhakim-0b0810248" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  linkedin.com/in/naufan-zaki
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-foreground" />
                <a href="https://github.com/NaufanZaki" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  github.com/NaufanZaki
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-2">
              <Button
                onClick={() => scrollToSection('projects')}
                className="w-full h-10 rounded-2xl text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-md font-subtitle"
              >
                View Pinned Work
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="w-full h-10 rounded-2xl text-xs font-semibold border-border/80 hover:border-primary hover:bg-primary/10 font-subtitle"
              >
                Contact Developer
              </Button>
            </div>
          </div>

          {/* Right Main Readme Panel */}
          <div className="space-y-6">
            
            {/* README.md Card Container */}
            <div className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/70 rounded-[32px] overflow-hidden shadow-lg">
              
              {/* Header Bar */}
              <div className="bg-surface-elevated/70 px-4 py-3 border-b border-border/60 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>naufanzaki / README.md</span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 rounded-full">
                  Verified Profile
                </Badge>
              </div>

              {/* README Body Content */}
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-title text-foreground mb-2 flex items-center gap-2">
                    Hi, I'm Naufan Zaki Luqmanulhakim
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-subtitle leading-relaxed">
                    Final-year IT Student at Institut Teknologi Sepuluh Nopember (ITS) Surabaya combining full-stack web development with Power BI dashboards, ETL pipelines, and Machine Learning solutions.
                  </p>
                </div>

                <hr className="border-border/40" />

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm font-subtitle">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Current Focus
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Full-stack web engineering (React, Vue, Strapi) & Enterprise Power BI Analytics (DAX, S-Curves, EAC).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Education & GPA
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      B.S. in Computer Science @ ITS Surabaya (Expected Sept 2026) • GPA 3.66 / 4.00.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Enterprise Internships
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      PT Semen Indonesia Tbk (Power BI Risk Dashboard) & PT INKA (Persero) (Legal Management System).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      Competition Honor
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Finalist GemasTIK 2024 Smart City Division (Pusat Prestasi Nasional - Kemendikbudristek).
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs font-mono font-medium text-muted-foreground mb-2">
                    Core Technologies & Skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">React.js</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">Vue.js</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">Strapi CMS</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">Power BI & DAX</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">TensorFlow & XAI</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">Kotlin Android</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">Express.js</Badge>
                    <Badge variant="secondary" className="bg-surface-elevated rounded-xl">MongoDB</Badge>
                  </div>
                </div>

              </div>
            </div>

            {/* Pinned Repositories Header */}
            <div>
              <div className="flex items-center justify-between mb-3 font-subtitle text-xs text-muted-foreground">
                <span className="font-semibold text-foreground font-title text-sm">Pinned Repositories & Flagships</span>
                <span>Customize your view</span>
              </div>

              {/* Pinned Repos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pinnedRepos.map((repo, idx) => (
                  <div
                    key={idx}
                    onClick={() => scrollToSection('projects')}
                    className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/60 hover:border-primary/50 rounded-[24px] p-5 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary group-hover:underline truncate">
                          <BookOpen className="w-3.5 h-3.5" />
                          {repo.name}
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono px-2 py-0 rounded-full">
                          {repo.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4 font-subtitle">
                        {repo.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/40">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                        {repo.lang}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-muted-foreground" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Contributions Matrix Widget */}
            <div className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/60 rounded-[24px] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>2,480 contributions in the last year</span>
                <span className="text-[11px]">Contribution settings</span>
              </div>
              
              <div className="grid grid-flow-col grid-rows-5 gap-1 overflow-x-auto pb-1 scrollbar-none">
                {contributionLevels.map((lvl, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-xs ${getLevelColor(lvl)}`}
                    title={`Activity Level ${lvl}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
                <span>Learn how contribution counts are calculated</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-surface-elevated/40" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-950/60" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-800/80" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600/90" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;