import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Send, Loader2, Phone, MapPin, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatingBubble, setShowFloatingBubble] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleGithubClick = () => {
    window.open('https://github.com/NaufanZaki', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/naufan-zaki-luqmanulhakim-0b0810248', '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    setIsLoading(false);
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out, Naufan will respond soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 relative">
      
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
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
              </div>
              <span className="font-title font-bold text-xs sm:text-sm tracking-wide text-foreground group-hover:text-primary transition-colors whitespace-nowrap truncate">
                Contact Me
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold whitespace-nowrap">
                Open to Hire
              </span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground font-title">
            Let's <span className="text-primary">Connect</span> & Collaborate
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-subtitle max-w-2xl mx-auto">
            Open for full-stack engineering, BI analytics projects, and technology consulting.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Info & Socials */}
          <div className="space-y-6">
            <div className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-[32px] border border-border/60 shadow-lg">
              <h3 className="text-2xl font-bold font-title mb-4 text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Feel free to send a message or connect directly via LinkedIn or email. I am always open to exploring new engineering opportunities and impactful tech initiatives.
              </p>
              
              <div className="space-y-3.5">
                <a 
                  href="mailto:nzluqmanulhakim@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-[20px] bg-surface-elevated hover:bg-primary/10 hover:text-primary transition-all border border-border/50 group"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs md:text-sm font-medium">nzluqmanulhakim@gmail.com</span>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-[20px] bg-surface-elevated border border-border/50">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs md:text-sm font-medium">+62 8121 4586 283</span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-[20px] bg-surface-elevated border border-border/50">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">Tangerang Selatan, Banten & Surabaya, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <button 
                onClick={handleGithubClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-card dark:bg-zinc-900 border border-border/60 hover:border-primary hover:bg-primary/10 transition-all font-medium text-sm shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
              
              <button 
                onClick={handleLinkedinClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-card dark:bg-zinc-900 border border-border/60 hover:border-primary hover:bg-primary/10 transition-all font-medium text-sm shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 text-blue-500" />
                LinkedIn
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-border/60">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">Name</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-surface-elevated border-border/60 rounded-2xl focus:border-primary h-11"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-surface-elevated border-border/60 rounded-2xl focus:border-primary h-11"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can Naufan help with your project?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[140px] bg-surface-elevated border-border/60 rounded-2xl focus:border-primary resize-none p-3.5"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-16 pt-8 border-t border-border/40">
          <p className="font-subtitle text-xs text-muted-foreground">
            © {new Date().getFullYear()} Naufan Zaki Luqmanulhakim 
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;