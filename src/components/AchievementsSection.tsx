import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Calendar, MapPin, ExternalLink, BookOpen, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AchievementsSection: React.FC = () => {
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
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

  const openJournalArticle = () => {
    window.open('https://buletingemastik.id/index.php/bg/article/view/202410.006/30', '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} id="achievements" className="py-20 md:py-28 relative bg-transparent">
      
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
            onClick={() => {
              sectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="h-[38px] sm:h-[44px] flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 rounded-full bg-[#FDFBF7]/40 dark:bg-[#1C1917]/40 text-[#2C1A11] dark:text-[#FDFBF7] backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.15)] group relative overflow-hidden">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                Honors & Awards
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold whitespace-nowrap">
                GemasTIK '24
              </span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-medium mb-3">
              Honors & Publications
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-title text-foreground mb-3">
              Honors & <span className="text-primary">Achievements</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base lg:text-lg font-subtitle max-w-2xl mx-auto leading-relaxed">
              National competition achievements and published scientific literature.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Authentic Academic Citation Card */}
          <div className="bg-card/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-border/80 rounded-[32px] md:rounded-[36px] p-6 md:p-10 shadow-xl space-y-6">
            
            {/* Top Journal Citation Line */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Buletin GemasTIK (Journal Article)</span>
              </div>
              <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border/50">
                Article ID: 202410.006/30
              </span>
            </div>

            {/* Main Title & Award */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-mono text-xs px-3 py-1 rounded-full">
                  National Finalist
                </Badge>
                <Badge variant="outline" className="font-mono text-xs px-3 py-1 rounded-full border-border/60">
                  Smart City Division
                </Badge>
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-title text-foreground leading-snug">
                URBAN CARE: Sistem Penyempurnaan Layanan Kesehatan dan Layanan Darurat Berbasis Aplikasi Mobile untuk Kota Bandung dengan Konsep Smart City
              </h3>

              <p className="text-xs md:text-sm text-primary font-subtitle font-medium">
                Pagelaran Mahasiswa Nasional Bidang Teknologi Informasi dan Komunikasi (GemasTIK XVII 2024)
              </p>
            </div>

            {/* Abstract / Summary */}
            <div className="bg-surface-elevated/60 border border-border/50 rounded-[24px] p-5 space-y-2">
              <p className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                Publication Overview
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-subtitle">
                A mobile-based healthcare and emergency dispatch management platform for Bandung Smart City, improving rapid response coordination, hospital referral routing, and emergency services integration across municipal departments.
              </p>
            </div>

            {/* Metadata Footer & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60 text-xs font-subtitle text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Pusat Prestasi Nasional (Puspresnas, Kemendikbudristek)</p>
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Semarang, Indonesia
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    2024
                  </span>
                </div>
              </div>

              <Button
                onClick={openJournalArticle}
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 font-subtitle text-xs font-semibold shadow-md gap-2"
              >
                <span>Read Publication Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;