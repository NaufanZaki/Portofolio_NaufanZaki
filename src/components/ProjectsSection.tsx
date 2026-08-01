import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { projects, Project } from "@/data/projects";

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<
    "All" | "Full-Stack" | "AI & Data" | "Backend" | "Frontend"
  >("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const displayProject = hoveredProject || selectedProject;

  useEffect(() => {
    setImageLoaded(false);
  }, [displayProject.id]);

  // Handle pinned scroll behavior for desktop view
  useEffect(() => {
    const updateSectionHeight = () => {
      if (sectionRef.current && listRef.current && window.innerWidth >= 1024) {
        const listScrollHeight = listRef.current.scrollHeight - listRef.current.clientHeight;
        sectionRef.current.style.height = `${window.innerHeight + Math.max(listScrollHeight, 450)}px`;
      } else if (sectionRef.current) {
        sectionRef.current.style.height = "auto";
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (!sectionRef.current || !listRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (sectionRect.top <= 0 && sectionRect.bottom >= windowHeight) {
        const list = listRef.current;
        const maxListScroll = list.scrollHeight - list.clientHeight;
        const totalSectionScrollable = sectionRect.height - windowHeight;

        if (totalSectionScrollable > 0 && maxListScroll > 0) {
          const scrolled = Math.abs(sectionRect.top);
          const progress = Math.min(Math.max(scrolled / totalSectionScrollable, 0), 1);

          list.scrollTop = progress * maxListScroll;

          const index = Math.min(
            Math.floor(progress * filteredProjects.length),
            filteredProjects.length - 1
          );
          if (filteredProjects[index] && !hoveredProject) {
            setSelectedProject(filteredProjects[index]);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateSectionHeight);

    const timer = setTimeout(updateSectionHeight, 150);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, [filteredProjects, hoveredProject]);

  return (
    <section id="projects" className="relative bg-transparent">
      {/* Outer Container with Dynamic Scroll Height for Sticky Pinning */}
      <div ref={sectionRef} className="relative w-full">
        {/* Sticky Viewport Wrapper */}
        <div className="sticky top-0 min-h-screen lg:h-screen flex flex-col justify-start overflow-hidden pt-6 md:pt-8 pb-4">
          <div className="max-w-[1600px] w-full mx-auto px-6 md:px-16 flex flex-col h-full">
            
            {/* Pinned Header */}
            <div className="flex-shrink-0 mb-4 md:mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight font-title">
                  <span className="text-foreground">SELECTED</span>{" "}
                  <span className="text-primary">PROJECTS</span>
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm max-w-2xl leading-relaxed font-subtitle mb-3 md:mb-4">
                  Featured solutions spanning edge Machine Learning, web digitalization, and enterprise BI analytics.
                </p>

                {/* Filter Tabs */}
                <div className="flex gap-2.5 flex-wrap">
                  {(["All", "Full-Stack", "AI & Data", "Backend", "Frontend"] as const).map(
                    (category) => (
                      <motion.button
                        key={category}
                        onClick={() => setFilter(category)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-4 py-2 rounded-xl font-medium text-xs transition-all duration-300 ${
                          filter === category
                            ? "bg-primary text-primary-foreground shadow-lg font-semibold"
                            : "bg-surface-elevated text-foreground hover:bg-surface border border-border/50"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-1.5">
                          {category}
                          {category !== "All" && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                filter === category
                                  ? "bg-primary-foreground/20"
                                  : "bg-surface font-mono"
                              }`}
                            >
                              {
                                projects.filter((p) => p.category === category)
                                  .length
                              }
                            </span>
                          )}
                        </span>
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            </div>

            {/* Split Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.25fr_1fr] gap-6 md:gap-8 min-h-0 items-start overflow-hidden">
              
              {/* Left - Premium Flagship Feature Preview (Sticky Pinned) */}
              <div className="hidden lg:block h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayProject.id}
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full flex items-start"
                  >
                    <div 
                      onClick={() => {
                        setSelectedProject(displayProject);
                        setDialogOpen(true);
                      }}
                      className="w-full group bg-card/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-border/70 hover:border-primary/50 transition-all duration-500 overflow-hidden relative rounded-3xl p-5 shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer max-h-full flex flex-col justify-between"
                    >
                      {/* Ambient Glow Pill Background */}
                      <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />

                      {/* Image Frame */}
                      <div className="relative rounded-2xl overflow-hidden bg-surface-elevated aspect-[16/9] max-h-[230px] xl:max-h-[260px] mb-4 border border-border/40 shadow-md">
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface animate-pulse" />
                        )}

                        <img
                          src={displayProject.previewImage}
                          alt={displayProject.title}
                          onLoad={() => setImageLoaded(true)}
                          className={`w-full h-full object-cover rounded-2xl transition-all duration-700 ${
                            imageLoaded
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-105"
                          } group-hover:scale-105`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Top-Left Category Overlay */}
                        <div className="absolute top-3 left-3 bg-black/60 text-white backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-mono font-medium">
                          {displayProject.category}
                        </div>

                        {/* Top-Right Index Overlay */}
                        <div className="absolute top-3 right-3 bg-black/60 text-amber-400 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
                          {String(displayProject.id).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Info & Typography */}
                      <div className="px-1 space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold font-title text-foreground group-hover:text-primary transition-colors leading-tight">
                          {displayProject.title}
                        </h3>
                        
                        <p className="text-xs font-subtitle font-semibold text-primary uppercase tracking-wider">
                          {displayProject.subtitle}
                        </p>

                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {displayProject.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {displayProject.techStack.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono px-3 py-1 rounded-xl bg-surface-elevated text-foreground border border-border/60 shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                          {displayProject.techStack.length > 4 && (
                            <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-surface-elevated text-muted-foreground border border-border/60">
                              +{displayProject.techStack.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Button at bottom */}
                      <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors font-subtitle">
                          View Project Architecture
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-300 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right - Project List Column */}
              <div
                ref={listRef}
                className="h-full overflow-y-auto pr-2 space-y-4 scrollbar-none pb-36"
                style={{ scrollBehavior: "smooth" }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.08 }}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => {
                        setSelectedProject(project);
                        setDialogOpen(true);
                      }}
                      className={`group relative p-5 md:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedProject.id === project.id
                          ? "bg-card dark:bg-zinc-900 border-primary shadow-xl scale-[1.01]"
                          : "bg-card/70 dark:bg-zinc-900/70 border-border/60 hover:border-primary/40 hover:bg-card shadow-sm"
                      }`}
                    >
                      {/* Left Accent Bar */}
                      <div
                        className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full transition-all duration-300 ${
                          selectedProject.id === project.id || hoveredProject?.id === project.id
                            ? "bg-primary opacity-100"
                            : "bg-border/40 opacity-0 group-hover:opacity-100"
                        }`}
                      />

                      {/* Mobile Preview Image */}
                      <div className="lg:hidden mb-3 rounded-xl overflow-hidden border border-border/50">
                        <img
                          src={project.previewImage}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>

                      <div className="flex gap-4 items-start">
                        {/* Index Badge */}
                        <div className="flex-shrink-0">
                          <div
                            className={`flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-2xl font-mono text-base md:text-xl font-bold transition-all duration-300 border ${
                              selectedProject.id === project.id || hoveredProject?.id === project.id
                                ? "bg-primary/20 text-primary border-primary/40"
                                : "bg-surface-elevated text-muted-foreground border-border/50 group-hover:text-foreground"
                            }`}
                          >
                            {String(project.id).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <Badge
                            variant="secondary"
                            className={`mb-1.5 text-[11px] font-mono px-2.5 py-0.5 ${
                              selectedProject.id === project.id || hoveredProject?.id === project.id
                                ? "bg-primary/20 text-primary border-primary/30"
                                : ""
                            }`}
                          >
                            {project.category}
                          </Badge>
                          <h3
                            className={`text-base md:text-lg font-bold font-title mb-1 transition-colors leading-tight ${
                              selectedProject.id === project.id || hoveredProject?.id === project.id
                                ? "text-primary"
                                : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="text-xs text-primary font-subtitle font-medium mb-1.5">
                            {project.subtitle}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2.5">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-[10px] font-mono px-2 py-0.5 bg-surface-elevated border-border/50"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 4 && (
                              <Badge
                                variant="outline"
                                className="text-[10px] font-mono px-2 py-0.5 bg-surface-elevated border-border/50"
                              >
                                +{project.techStack.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 self-center hidden sm:block">
                          <div
                            className={`p-2 rounded-full transition-all duration-300 ${
                              selectedProject.id === project.id || hoveredProject?.id === project.id
                                ? "bg-primary text-primary-foreground scale-110"
                                : "bg-surface-elevated text-muted-foreground group-hover:text-foreground"
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedProject && (
          <DialogContent className="w-full max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto bg-background dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8">
            <DialogHeader className="pb-4 border-b border-border text-left">
              <Badge className="bg-primary/20 text-primary border-primary/30 w-fit mb-2 font-mono">
                {selectedProject.category}
              </Badge>
              <DialogTitle className="text-2xl md:text-4xl font-bold font-title text-foreground dark:text-white leading-tight">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-base md:text-lg text-primary font-subtitle font-medium mt-1">
                {selectedProject.subtitle}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <img
                src={selectedProject.previewImage}
                alt={selectedProject.title}
                className="w-full h-auto max-h-[380px] object-cover rounded-2xl border border-border"
              />

              <div className="bg-card dark:bg-zinc-800/60 rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 font-title">
                  About Project
                </h3>
                <p className="text-sm md:text-base text-muted-foreground dark:text-zinc-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div className="bg-card dark:bg-zinc-800/60 rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground dark:text-white mb-3 font-title">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs md:text-sm px-3 py-1 font-mono bg-surface-elevated"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedProject.codeSnippet && (
                <div className="bg-card dark:bg-zinc-800/60 rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground dark:text-white mb-3 flex items-center gap-2 font-mono">
                    <Code2 className="w-5 h-5 text-primary" />
                    Key Architecture Snippet
                  </h3>
                  <pre className="bg-black/80 text-green-400 rounded-xl p-4 overflow-x-auto text-xs md:text-sm font-mono border border-zinc-800">
                    <code>{selectedProject.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                {selectedProject.links.github && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 h-12 text-sm font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full shadow-md"
                  >
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
