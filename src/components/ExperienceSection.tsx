import React, { useState, useRef } from "react";
import {
  motion,
  PanInfo,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
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
    logo: "🏢",
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
    logo: "🎓",
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
    logo: "📊",
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
    logo: "🎓",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
  },
];

const DRAG_BUFFER = 35;
const CARD_WIDTH_OFFSET = 320;

const cardContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ExperienceCard = ({ exp, isActive, openModal }) => {
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const rotateX = useTransform(motionY, [-200, 200], [-15, 15]);
  const rotateY = useTransform(motionX, [-200, 200], [15, -15]);

  const handleMouseMove = (event) => {
    const card = event.currentTarget.getBoundingClientRect();
    motionX.set(event.clientX - card.left - card.width / 2);
    motionY.set(event.clientY - card.top - card.height / 2);
  };

  const handleMouseLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transition-transform duration-300 h-[450px] md:h-[400px]"
      onClick={() => isActive && openModal(exp)}
    >
      <Card
        className={cn(
          "bg-card/60 backdrop-blur-md border-border/30 transition-all duration-300 overflow-hidden relative group w-full h-full",
          isActive
            ? "shadow-primary/30 shadow-2xl"
            : "hover:border-primary/50"
        )}
        style={{ transform: "translateZ(20px)" }}
      >
        <img
          src={exp.image}
          alt={exp.role}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <CardContent className="p-6 relative z-10 flex flex-col h-full justify-end">
          <div className="flex-grow" />

          <AnimatePresence>
            {isActive && (
              <motion.div
                variants={cardContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2"
                style={{ transform: "translateZ(30px)" }}
              >
                <motion.h3
                  variants={cardItemVariants}
                  className="text-2xl font-bold text-white"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {exp.role}
                </motion.h3>
                <div className="space-y-1">
                  <motion.p variants={cardItemVariants} className="text-white/80 text-md font-subtitle">
                    {exp.organization}
                  </motion.p>
                  <motion.p variants={cardItemVariants} className="text-white/60 text-sm">
                    {exp.duration}
                  </motion.p>
                </div>

                <motion.div
                  variants={cardItemVariants}
                  className="!mt-6 flex items-center gap-2 text-primary font-semibold group-hover:text-secondary transition-colors"
                >
                  View Details
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CrayonArrow = () => {
  return (
    <motion.svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-5 center hidden xl:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [-20, 0, 0, 20],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut"
      }}
    >
      <defs>
        <filter id="crayon-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>
      <motion.path
        d="M 10 30 Q 40 15, 70 25 Q 85 30, 95 28"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#crayon-texture)"
        className="text-primary/70"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      />
      <motion.path d="M 95 28 L 88 23 M 95 28 L 90 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" filter="url(#crayon-texture)" className="text-primary/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.3, repeat: Infinity, repeatDelay: 1.2 }} />
      <motion.text x="30" y="50" className="text-xs font-medium fill-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}>
        Drag me!
      </motion.text>
    </motion.svg>
  );
};

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
        className="min-h-screen text-foreground flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative"
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
              className="text-4xl sm:text-5xl font-bold mb-4 font-title text-foreground bg-clip-text"
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
              className="text-muted-foreground text-lg font-subtitle mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A timeline of professional journey and growth.
            </motion.p>
          </div>
          <motion.div
            className="relative h-[500px] md:h-[550px] flex items-center justify-center select-none"
            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd} dragElastic={0.1}
          >
            {experiences.map((exp, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              return (
                <motion.div
                  key={exp.id}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{ width: "clamp(280px, 80vw, 380px)", transformOrigin: "center", perspective: 800 }}
                  initial={false}
                  animate={{
                    x: offset * (window.innerWidth < 768 ? 290 : CARD_WIDTH_OFFSET),
                    y: Math.abs(offset) * 40,
                    scale: isActive ? 1 : 0.75, rotateZ: offset * 8,
                    zIndex: experiences.length - Math.abs(offset), opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  <ExperienceCard exp={exp} isActive={isActive} openModal={openModal} />
                </motion.div>
              );
            })}
            <Button onClick={handlePrev} variant="outline" size="icon" className="absolute left-0 sm:left-4 z-20 bg-card/50 backdrop-blur-sm rounded-full">
              <ChevronLeft size={24} />
            </Button>
            <Button onClick={handleNext} variant="outline" size="icon" className="absolute right-0 sm:right-4 z-20 bg-card/50 backdrop-blur-sm rounded-full">
              <ChevronRight size={24} />
            </Button>
            <CrayonArrow />
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
                    : "w-2 bg-muted hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </motion.div>
         
      </section>
      {/* The Dialog component remains unchanged */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl w-[90vw] bg-card/80 backdrop-blur-xl border-border/50 flex flex-col max-h-[85vh]">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
              >
                {selectedExperience?.logo}
              </motion.div>
              <div className="flex-1">
                <DialogTitle className="text-xl lg:text-2xl font-bold text-card-foreground">
                  {selectedExperience?.role}
                </DialogTitle>
                <p className="text-muted-foreground text-sm">
                  {selectedExperience?.organization}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-4 mt-4">
            <motion.div className="w-full mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <img src={selectedExperience?.image} alt="Project visual" className="rounded-lg object-cover w-full h-auto max-h-64" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p className="text-muted-foreground/80 text-sm mb-4 font-mono border-l-2 border-secondary pl-3">
                {selectedExperience?.duration}
              </p>
              <h4 className="text-lg font-semibold text-card-foreground mb-3">
                Key Responsibilities
              </h4>
              <ul className="space-y-3">
                {selectedExperience?.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <DialogClose asChild>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceSection;