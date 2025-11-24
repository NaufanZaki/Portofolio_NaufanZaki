import React, { useState, useRef } from "react";
import {
  motion,
  PanInfo,
  useInView,
  useScroll,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight, Calendar, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "exp1",
    role: "Web Developer Intern",
    organization: "PT INKA (Persero)",
    duration: "Jan 2025 - Apr 2025",
    details: [
      "Led the end-to-end development of a legal workflow dashboard using ReactJS and Strapi.",
      "Engineered a responsive and intuitive user interface based on design specifications.",
      "Optimized application performance, resulting in a 30% reduction in load times.",
      "Collaborated in an Agile environment, participating in daily stand-ups and code reviews.",
    ],
    
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "exp2",
    role: "Lecturer Assistant, Web Programming",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Aug 2024 - Nov 2024",
    details: [
      "Developed and taught course materials on modern web technologies including Nuxt.js and MongoDB.",
      "Mentored over 50 students, providing guidance on best practices and debugging techniques.",
      "Designed and graded comprehensive exams and assignments.",
      "Received a 95% positive feedback rating from student course evaluations.",
    ],
    
    image:
      "https://images.unsplash.com/photo-1555066931-4365d1469c9b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "exp3",
    role: "Lecturer Assistant, Data Structures",
    organization: "Institut Teknologi Sepuluh Nopember",
    duration: "Feb 2024 - May 2024",
    details: [
      "Created engaging exercises on HackerRank to solidify understanding of complex algorithms.",
      "Simplified abstract concepts like trees and graphs through visual aids and supplementary materials.",
      "Provided one-on-one technical support, improving student comprehension and project outcomes.",
      "Fostered a collaborative and supportive learning environment during lab sessions.",
    ],
    
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "exp4",
    role: "Lab Admin",
    organization: "Smart City and Cyber Security Laboratory, ITS",
    duration: "March 2024 - Aug 2024",
    details: [
      
      "Created engaging exercises on HackerRank to solidify understanding of complex algorithms.",
      "Simplified abstract concepts like trees and graphs through visual aids and supplementary materials.",
      "Provided one-on-one technical support, improving student comprehension and project outcomes.",
      "Fostered a collaborative and supportive learning environment during lab sessions.",
    ],
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
  },
];

const DRAG_BUFFER = 35;
const CARD_WIDTH_OFFSET = 320;

const ExperienceCard = ({ exp, isActive, openModal }) => {
  return (
    <motion.div
      className="relative transition-all duration-300 h-[480px] md:h-[540px] cursor-pointer"
      onClick={() => isActive && openModal(exp)}
      whileHover={isActive ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "bg-card border-border/55 transition-all duration-300 overflow-hidden relative w-full h-full flex flex-col p-4 rounded-3xl",
          isActive
            ? "shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.25)] border-primary/30"
            : "opacity-60 hover:opacity-80"
        )}
      >
        {/* Image Section with padding and rounded border */}
        <div className="relative h-[240px] md:h-[320px] overflow-hidden rounded-2xl bg-muted/10">
          <img
            src={exp.image}
            alt={exp.role}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 rounded-2xl",
              isActive && "group-hover:scale-105"
            )}
          />
          {/* Subtle overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/30 rounded-2xl" />
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-4 pt-5 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Role Title */}
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-title leading-tight">
              {exp.role}
            </h3>

            {/* Organization Subtitle */}
            <p className="text-muted-foreground text-sm md:text-base">
              {exp.organization}
            </p>

            {/* Info Row with Icon */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={18} />
                <span className="text-sm font-subtitle">{exp.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Button - Only show when active */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-4 flex items-center gap-3"
          
            >
              <Button
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(exp);
                }}
              >
                View Details
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  const handleNext = () => setActiveIndex((p) => (p + 1) % experiences.length);
  const handlePrev = () => setActiveIndex((p) => (p - 1 + experiences.length) % experiences.length);
  const onDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > DRAG_BUFFER) handlePrev();
    else if (info.offset.x < -DRAG_BUFFER) handleNext();
  };
  const openModal = (exp) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };
  
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <section
        id="experience"
        ref={sectionRef} // Attach ref here
        className="min-h-screen text-foreground dark:text-gray-200 flex flex-col items-center justify-center py-20 px-4 sm:px-8 sm:py-24 overflow-hidden relative"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/4 left-1/4" />
            <div className="absolute w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-1/4 right-1/4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl w-full mx-auto z-10"
        >
          <div className="text-center mb-9">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-4 font-title text-foreground dark:text-white bg-clip-text"
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {"Work Experience".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              className="text-muted-foreground dark:text-gray-300 text-lg font-subtitle mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A timeline of professional journey and growth.
            </motion.p>
          </div>
          <motion.div
            className="relative h-[540px] md:h-[600px] flex items-center justify-center select-none"
            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd} dragElastic={0.1}
          >
            {experiences.map((exp, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              return (
                <motion.div
                  key={exp.id}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{ width: "clamp(280px, 80vw, 380px)", transformOrigin: "center" }}
                  initial={false}
                  animate={{
                    x: offset * (window.innerWidth < 768 ? 290 : CARD_WIDTH_OFFSET),
                    scale: isActive ? 1 : 0.85,
                    skewY: offset * 3,
                    zIndex: experiences.length - Math.abs(offset),
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                >
                  <ExperienceCard exp={exp} isActive={isActive} openModal={openModal} />
                </motion.div>
              );
            })}
            <Button onClick={handlePrev} variant="outline" size="icon" className="absolute left-0 sm:left-4 z-20 bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
              <ChevronLeft size={24} />
            </Button>
            <Button onClick={handleNext} variant="outline" size="icon" className="absolute right-0 sm:right-4 z-20 bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
              <ChevronRight size={24} />
            </Button>
          </motion.div>
          <div className="flex justify-center gap-2 mt-8">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-primary to-secondary"
                    : "w-2 bg-muted dark:bg-gray-600 hover:bg-muted-foreground/50 dark:hover:bg-gray-500"
                )}
              />
            ))}
          </div>
        </motion.div>
         
      </section>
      {/* The Dialog component remains unchanged */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl max-h-[85vh] bg-background dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 p-4 md:p-6 flex flex-col gap-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border dark:border-zinc-800 text-left">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-2xl md:text-3xl shadow-lg flex-shrink-0"
              >
                <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg md:text-2xl font-bold text-foreground dark:text-white break-words">
                  {selectedExperience?.role}
                </DialogTitle>
                <p className="text-muted-foreground dark:text-zinc-400 text-xs md:text-sm mt-1 break-words">
                  {selectedExperience?.organization}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-4 mt-4">
            <motion.div className="w-full mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <img 
                src={selectedExperience?.image} 
                alt="Project visual" 
                className="rounded-lg object-cover w-full h-auto max-h-40 md:max-h-64 shadow-md bg-muted" 
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p className="text-muted-foreground/80 dark:text-zinc-400 text-xs md:text-sm mb-4 font-mono border-l-2 border-secondary pl-3">
                {selectedExperience?.duration}
              </p>
              <h4 className="text-base md:text-lg font-semibold text-foreground dark:text-white mb-3">
                Key Responsibilities
              </h4>
              <ul className="space-y-3">
                {selectedExperience?.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground dark:text-zinc-300 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed break-words">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <DialogClose asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceSection;