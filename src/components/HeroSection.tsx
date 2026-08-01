import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import heroAvatar from '@/assets/heroAvatar.png';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Trophy,
  Cpu,
  Database,
} from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Marquee ticker ref for infinite loop
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const speed = 0.6;
    const animate = () => {
      pos -= speed;
      const half = el.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stats = [
    { value: '3.66', label: 'GPA Score', sub: '/ 4.00' },
    { value: '2+', label: 'Enterprise Internships', sub: 'BUMN-level' },
    { value: '10+', label: 'Projects Shipped', sub: 'Production-ready' },
    { value: 'Top', label: 'GemasTIK 2024', sub: 'National Finalist' },
  ];

  const roles = [
    'Full-Stack Web',
    'Business Intelligence',
    'Machine Learning',
    'Edge AI & Mobile',
  ];

  const tickerItems = [
    '⚡ React.js', '🔷 Vue.js', '🧠 TensorFlow', '📊 Power BI & DAX',
    '🔧 Strapi CMS', '📱 Kotlin Android', '🗄️ Express.js', '🍃 MongoDB',
    '🎓 ITS Surabaya', '🏆 GemasTIK Finalist', '🏗️ PT Semen Indonesia', '⚙️ PT INKA',
    '⚡ React.js', '🔷 Vue.js', '🧠 TensorFlow', '📊 Power BI & DAX',
    '🔧 Strapi CMS', '📱 Kotlin Android', '🗄️ Express.js', '🍃 MongoDB',
    '🎓 ITS Surabaya', '🏆 GemasTIK Finalist', '🏗️ PT Semen Indonesia', '⚙️ PT INKA',
  ];

  const focusAreas = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Full-Stack Web Engineering',
      desc: 'Building end-to-end applications with React.js, Vue.js, and Strapi headless CMS — delivering scalable, performance-first user experiences.',
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Enterprise BI & Analytics',
      desc: 'Architecting Power BI dashboards with DAX S-Curves, EAC forecasting, and SharePoint ETL pipelines across multi-company enterprise environments.',
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: 'Edge ML & Mobile AI',
      desc: 'Deploying TensorFlow Lite CNN models (MobileNet, ResNet) with quantization and XAI explainability on Android for real-time inference.',
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen bg-transparent overflow-hidden">

      {/* ─── MAIN HERO BLOCK ──────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 md:pt-32">

        {/* Top Bar: Status pill + Social Links */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 md:mb-12"
        >
          {/* Available badge */}
          <div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for work — 2026
          </div>

          {/* Social + location pills */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono border border-border/60 px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Surabaya, ID
            </div>
            <a
              href="https://github.com/NaufanZaki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono border border-border/60 px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              NaufanZaki
            </a>
            <a
              href="https://linkedin.com/in/naufan-zaki-luqmanulhakim-0b0810248"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono border border-border/60 px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm hover:text-blue-500 hover:border-blue-400/40 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              naufan-zaki
            </a>
          </div>
        </motion.div>

        {/* ─── BIG NAME + AVATAR ROW ─── */}
        <div className="relative">

          {/* Giant name — editorial typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* NAUFAN — top line */}
            <h1
              className="font-title font-black leading-[0.88] tracking-[-0.04em] text-foreground select-none"
              style={{ fontSize: 'clamp(4rem, 13vw, 14rem)' }}
            >
              NAUFAN
            </h1>

            {/* ZAKI — bottom line with avatar embedded in it */}
            <div className="relative flex items-end gap-4 md:gap-8">
              <h1
                className="font-title font-black leading-[0.88] tracking-[-0.04em] text-foreground select-none"
                style={{ fontSize: 'clamp(4rem, 13vw, 14rem)' }}
              >
                ZAKI
              </h1>

              {/* Avatar — floats beside the name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-shrink-0 mb-2"
              >
                <div className="relative">
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-[2.5rem] border-2 border-primary/30 rotate-3" />
                  <div className="absolute -inset-2 rounded-[2.5rem] border border-primary/15 -rotate-2" />
                  <img
                    src={heroAvatar}
                    alt="Naufan Zaki Luqmanulhakim"
                    className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-[2rem] object-cover border-2 border-primary/30 shadow-2xl relative z-10"
                  />
                  {/* Gold trophy badge */}
                  <div className="absolute -top-3 -right-3 z-20 bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg border-2 border-background">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Right-side descriptor block — floats in the gap */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:flex flex-col justify-end mb-3 gap-2 max-w-xs"
              >
                <p className="text-sm font-subtitle text-muted-foreground leading-relaxed">
                  Final-year IT student at{' '}
                  <span className="text-foreground font-semibold">ITS Surabaya</span>{' '}
                  combining full-stack engineering, enterprise BI analytics, and AI/ML research into production-grade solutions.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-primary hover:gap-3 transition-all w-fit"
                >
                  Get in touch <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Subtitle line — full name + role  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 md:mt-6 pt-4 border-t border-border/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm md:text-base font-mono font-medium text-muted-foreground">Luqmanulhakim</span>
              <span className="text-muted-foreground/40">•</span>
              {roles.slice(0, 2).map((role, i) => (
                <span
                  key={i}
                  className="text-xs md:text-sm font-subtitle font-semibold text-foreground/80 bg-primary/8 dark:bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20"
                >
                  {role}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {roles.slice(2).map((role, i) => (
                <span
                  key={i}
                  className="text-xs font-subtitle font-semibold text-muted-foreground bg-surface-elevated/60 px-3 py-0.5 rounded-full border border-border/50"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── STATS ROW ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-8 md:mt-12 bg-border/40 rounded-[20px] overflow-hidden border border-border/40"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card/70 dark:bg-zinc-900/60 backdrop-blur-sm px-6 py-5 flex flex-col gap-1 hover:bg-primary/5 transition-colors duration-300 group"
            >
              <div className="flex items-end gap-1">
                <span className="font-title font-black text-4xl md:text-5xl text-foreground leading-none tracking-tight group-hover:text-primary transition-colors">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-muted-foreground mb-1">{stat.sub}</span>
              </div>
              <span className="text-xs font-subtitle text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ─── FOCUS AREAS ROW ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px mt-4 bg-border/40 rounded-[20px] overflow-hidden border border-border/40"
        >
          {focusAreas.map((area, i) => (
            <div
              key={i}
              className="bg-card/70 dark:bg-zinc-900/60 backdrop-blur-sm px-6 py-6 flex flex-col gap-3 hover:bg-primary/5 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                  {area.icon}
                </div>
                <h3 className="font-title font-bold text-sm md:text-base text-foreground leading-tight">
                  {area.title}
                </h3>
              </div>
              <p className="text-xs font-subtitle text-muted-foreground leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ─── CTA BUTTONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center gap-3 mt-8"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 rounded-2xl font-title font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-105"
          >
            View My Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="group flex items-center gap-2.5 border-2 border-border/70 text-foreground px-7 py-3.5 rounded-2xl font-title font-bold text-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
          >
            Work Experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="mailto:nzluqmanulhakim@gmail.com"
            className="flex items-center gap-2 text-sm font-subtitle text-muted-foreground hover:text-primary transition-colors ml-1"
          >
            <Mail className="w-4 h-4" />
            nzluqmanulhakim@gmail.com
          </a>
        </motion.div>
      </div>

      {/* ─── TICKER / MARQUEE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-10 md:mt-14 overflow-hidden border-y border-border/40 bg-card/40 dark:bg-zinc-900/40 backdrop-blur-sm py-3"
      >
        <div ref={tickerRef} className="flex whitespace-nowrap will-change-transform">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-6 text-sm font-mono font-medium text-muted-foreground"
            >
              {item}
              <span className="text-border/60 select-none">·</span>
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;