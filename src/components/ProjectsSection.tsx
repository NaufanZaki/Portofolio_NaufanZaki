import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Code2, X } from "lucide-react";
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
    "All" | "Frontend" | "Full-Stack" | "Backend"
  >("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const displayProject = hoveredProject || selectedProject;

  // Reset image loaded state when display project changes
  // Reset image loaded state when display project changes
  useEffect(() => {
    setImageLoaded(false);
  }, [displayProject.id]);

  // Handle scroll-freeze behavior
  // Handle scroll-freeze behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !listRef.current || !contentRef.current)
        return;

      const section = sectionRef.current;
      const list = listRef.current;

      const sectionRect = section.getBoundingClientRect();

      // Calculate when section enters viewport
      const sectionTop = sectionRect.top;
      const windowHeight = window.innerHeight;

      // Section is in freeze zone when its top reaches the top of viewport
      if (sectionTop <= 0 && sectionRect.bottom > windowHeight) {
        // Calculate scroll progress within the section
        const scrollableHeight = list.scrollHeight - list.clientHeight;
        const sectionHeight = sectionRect.height - windowHeight;
        const scrolled = Math.abs(sectionTop);
        const progress = Math.min(scrolled / sectionHeight, 1);

        setScrollProgress(progress);

        // Scroll the list based on progress
        list.scrollTop = progress * scrollableHeight;
      }
    };

    // Recalculate height when content changes
    const updateHeight = () => {
      if (sectionRef.current && listRef.current) {
        const listHeight =
          listRef.current.scrollHeight - listRef.current.clientHeight;
        sectionRef.current.style.height = `${
          window.innerHeight + listHeight
        }px`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);

    // Initial setup
    setTimeout(updateHeight, 100); // Give time for content to render
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [filteredProjects]);

  return (
    <section id="projects" className="relative bg-background">
      {/* Main container with dynamic height based on scrollable content */}
      <div
        ref={sectionRef}
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Sticky wrapper */}
        <div
          className="sticky top-0 h-screen flex flex-col overflow-hidden"
          ref={contentRef}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-6 md:px-16 pt-10 md:pt-10 pb-4 md:pb-6 bg-background/95 backdrop-blur-md z-20 border-b border-border-soft">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-[1600px] mx-auto"
            >
              <div className="mb-4 md:mb-6">
                <motion.div
                  className="inline-block mb-2 md:mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                </motion.div>
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 leading-tight font-title">
                  <span className="text-foreground">SELECTED</span>{" "}
                  <span className="text-gradient">PROJECTS</span>
                </h2>
                <p className="text-text-subtle text-sm md:text-base mb-4 md:mb-6 max-w-2xl leading-relaxed font-subtitle">
                  Projects I've enjoyed working on—built, tweaked, and learned
                  from.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-3 flex-wrap">
                {(["All", "Frontend", "Full-Stack", "Backend"] as const).map(
                  (category) => (
                    <motion.button
                      key={category}
                      onClick={() => setFilter(category)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative px-3 md:px-6 py-1 md:py-2 rounded-xl font-normal text-sm md:text-base transition-all duration-300 ${
                        filter === category
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-surface-elevated text-foreground hover:bg-surface border border-border-soft"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {category}
                        {category !== "All" && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              filter === category
                                ? "bg-primary-foreground/20"
                                : "bg-surface"
                            }`}
                          >
                            {
                              projects.filter((p) => p.category === category)
                                .length
                            }
                          </span>
                        )}
                      </span>
                      {filter === category && (
                        <motion.div
                          layoutId="activeFilter"
                          className="absolute inset-0 bg-primary rounded-xl"
                          style={{ zIndex: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="flex-1 overflow-hidden min-h-0">
            <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 px-6 md:px-40 py-6 md:py-8 max-w-[1600px] mx-auto">
              {/* Left - Preview (Sticky on desktop) */}
              <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayProject.id}
                    initial={{ opacity: 0, scale: 0.97, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="h-full flex items-center"
                  >
                    <div className="w-full group bg-card border-border/55 transition-all duration-300 overflow-hidden relative rounded-3xl p-4 shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.25)]">
                      {/* Image Container with Padding */}
                      <div className="relative rounded-2xl overflow-hidden bg-surface-elevated aspect-[16/9] mb-5">
                        {/* Loading skeleton */}
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface animate-pulse" />
                        )}

                        {/* Preview Image */}
                        <img
                          src={displayProject.previewImage}
                          alt={displayProject.title}
                          onLoad={() => setImageLoaded(true)}
                          className={`w-full h-full object-cover rounded-2xl transition-all duration-700 ${
                            imageLoaded
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-110"
                          } group-hover:scale-105`}
                        />
                      </div>

                      {/* Project Info */}
                      <div className="px-2">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-3"
                        >
                          <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-xs font-medium">
                            {displayProject.category}
                          </Badge>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                            {displayProject.title}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {displayProject.subtitle}
                          </p>

                          {/* Tech Stack Preview */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {displayProject.techStack
                              .slice(0, 3)
                              .map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-elevated text-foreground border border-border-soft"
                                >
                                  {tech}
                                </span>
                              ))}
                            {displayProject.techStack.length > 3 && (
                              <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-elevated text-foreground border border-border-soft">
                                +{displayProject.techStack.length - 3} more
                              </span>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                      >
                        <div className="bg-primary/90 backdrop-blur-md rounded-full p-3 shadow-xl">
                          <ExternalLink className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </motion.div>

                      {/* Border accent */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right - Project List (Scrollable) */}
              <div
                ref={listRef}
                className="overflow-y-auto pr-3 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors h-full"
                style={{ scrollBehavior: "auto" }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{
                        delay: index * 0.06,
                        layout: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                      }}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => {
                        setSelectedProject(project);
                        setDialogOpen(true);
                      }}
                      className={`group relative p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-400 ${
                        selectedProject.id === project.id
                          ? "bg-surface-elevated border-primary shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] scale-[1.02]"
                          : "bg-surface border-border-soft hover:border-primary/40 hover:bg-surface-elevated hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)]"
                      }`}
                    >
                      {/* Accent line */}
                      <motion.div
                        className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-all duration-300 ${
                          selectedProject.id === project.id ||
                          hoveredProject?.id === project.id
                            ? "bg-primary opacity-100"
                            : "bg-border-soft opacity-0 group-hover:opacity-100"
                        }`}
                      />

                      {/* Mobile preview image */}
                      <div className="lg:hidden mb-6 rounded-xl overflow-hidden border border-border-soft">
                        <img
                          src={project.previewImage}
                          alt={project.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>

                      <div className="flex gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <motion.div
                            className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl transition-all duration-300 ${
                              selectedProject.id === project.id ||
                              hoveredProject?.id === project.id
                                ? "bg-primary/20 border-2 border-primary"
                                : "bg-surface-elevated border-2 border-border-soft group-hover:border-primary/30"
                            }`}
                            animate={{
                              scale:
                                selectedProject.id === project.id
                                  ? [1, 1.05, 1]
                                  : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <span
                              className={`text-2xl md:text-3xl font-bold transition-colors ${
                                selectedProject.id === project.id ||
                                hoveredProject?.id === project.id
                                  ? "text-primary"
                                  : "text-text-subtle group-hover:text-foreground"
                              }`}
                            >
                              {String(project.id).padStart(2, "0")}
                            </span>
                          </motion.div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            <Badge
                              variant="secondary"
                              className={`mb-3 text-xs font-medium ${
                                selectedProject.id === project.id ||
                                hoveredProject?.id === project.id
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : ""
                              }`}
                            >
                              {project.category}
                            </Badge>
                          </div>
                          <h4
                            className={`text-xl md:text-2xl font-bold mb-3 transition-colors leading-tight ${
                              selectedProject.id === project.id ||
                              hoveredProject?.id === project.id
                                ? "text-primary"
                                : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {project.title}
                          </h4>
                          <p className="text-sm md:text-base text-text-subtle mb-5 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs font-medium px-3 py-1 bg-surface-elevated border-border-soft"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 4 && (
                              <Badge
                                variant="outline"
                                className="text-xs font-medium px-3 py-1 bg-surface-elevated"
                              >
                                +{project.techStack.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          className="flex-shrink-0 self-center"
                          animate={{
                            x:
                              selectedProject.id === project.id ||
                              hoveredProject?.id === project.id
                                ? 6
                                : 0,
                            scale:
                              selectedProject.id === project.id ||
                              hoveredProject?.id === project.id
                                ? 1.1
                                : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`p-2 rounded-full transition-all duration-300 ${
                              selectedProject.id === project.id ||
                              hoveredProject?.id === project.id
                                ? "bg-primary/20"
                                : "bg-surface-elevated group-hover:bg-surface"
                            }`}
                          >
                            <ExternalLink
                              className={`w-5 h-5 transition-colors ${
                                selectedProject.id === project.id ||
                                hoveredProject?.id === project.id
                                  ? "text-primary"
                                  : "text-text-subtle group-hover:text-foreground"
                              }`}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto bg-background dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 rounded-3xl shadow-2xl p-0 gap-0">
          <div className="p-6 md:p-8 space-y-6">
            <DialogHeader className="space-y-4 pb-6 border-b border-border dark:border-zinc-800 text-left">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-4 py-1.5 w-fit">
                    {selectedProject.category}
                  </Badge>
                  <DialogTitle className="text-2xl md:text-4xl font-bold text-foreground dark:text-white leading-tight mb-3 break-words">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-base md:text-xl text-muted-foreground dark:text-zinc-400 leading-relaxed break-words">
                    {selectedProject.subtitle}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 md:space-y-8">
              {/* Preview Image */}
              <div className="rounded-2xl overflow-hidden border-2 border-border dark:border-zinc-800 shadow-lg bg-muted">
                <img
                  src={selectedProject.previewImage}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-card dark:bg-zinc-800/50 rounded-2xl p-5 md:p-8 border border-border dark:border-zinc-700">
                <h3 className="text-lg md:text-2xl font-bold mb-4 text-foreground dark:text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  About This Project
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground dark:text-zinc-300 leading-relaxed break-words">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="bg-card dark:bg-zinc-800/50 rounded-2xl p-5 md:p-8 border border-border dark:border-zinc-700">
                <h3 className="text-lg md:text-2xl font-bold mb-5 text-foreground dark:text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.techStack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs md:text-base px-3 py-1.5 md:px-4 md:py-2 bg-secondary/10 dark:bg-zinc-700/50 border-border dark:border-zinc-600 text-foreground dark:text-zinc-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-card dark:bg-zinc-800/50 rounded-2xl p-5 md:p-8 border border-border dark:border-zinc-700">
                <h3 className="text-lg md:text-2xl font-bold mb-5 text-foreground dark:text-white flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <Code2 className="w-5 h-5 md:w-6 md:h-6" />
                  Code Snippet
                </h3>
                <pre className="bg-muted dark:bg-black/30 border-2 border-border dark:border-zinc-700 rounded-xl p-4 md:p-5 overflow-x-auto shadow-inner">
                  <code className="text-xs md:text-base font-subtitle text-muted-foreground dark:text-zinc-400 break-all leading-relaxed">
                    {selectedProject.codeSnippet}
                  </code>
                </pre>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-[hsl(var(--border-soft))]">
                {selectedProject.links.demo && (
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 h-12 md:h-14 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {selectedProject.links.github && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 h-12 md:h-14 text-sm md:text-base font-medium border-2 shadow-lg hover:shadow-xl transition-all bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
