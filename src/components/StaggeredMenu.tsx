import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/use-theme";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#1F2937", "#111827"], // Darker default colors
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/src/assets/logos/reactbits-gh-white.svg",
  menuButtonColor = "#111827",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  accentColor = "#5227FF",
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const { theme, toggleTheme } = useTheme();
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      const logo = logoRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner || !logo) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer")
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });

      // Set initial color based on theme
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, {
          color: openRef.current ? openMenuButtonColor : menuButtonColor,
        });
      }

      const idleTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      idleTimeline
        .to(logo, { scale: 1.05, duration: 2, ease: "sine.inOut" })
        .to(logo, { scale: 1, duration: 2, ease: "sine.inOut" });
    });
    return () => ctx.revert();
  }, [position]);

  // This effect updates the button color when the theme changes
  useEffect(() => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current
        ? openMenuButtonColor
        : menuButtonColor;
      gsap.to(btn, { color: targetColor, duration: 0.3 });
    } else {
      gsap.to(btn, { color: menuButtonColor, duration: 0.3 });
    }
  }, [theme, menuButtonColor, openMenuButtonColor, changeMenuColorOnOpen]);

  const buildOpenTimeline = useCallback(() => {
    // ... same as before
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel")
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title"
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link")
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);
  const playOpen = useCallback(() => {
    // ... same as before
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);
  const playClose = useCallback(() => {
    // ... same as before
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item"
          )
        ) as HTMLElement[];
        if (numberEls.length)
          gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });

        const socialTitle = panel.querySelector(
          ".sm-socials-title"
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link")
        ) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);
  const animateIcon = useCallback((opening: boolean) => {
    // ... same as before
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      // ensure container never rotates
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);
  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );
  const animateText = useCallback((opening: boolean) => {
    // ... same as before
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  return (
    <div className="sm-scope w-full h-full">
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper relative w-full h-full z-40"
        }
        style={
          accentColor
            ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties)
            : undefined
        }
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-end p-[2em] bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          <div
            className="sm-toggle-container group relative flex flex-col items-center justify-center pointer-events-auto"
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            {/* The central Avatar button */}
            <button
              ref={toggleBtnRef}
              className="sm-avatar-button relative w-16 h-16 rounded-full cursor-pointer z-10 transition-transform duration-300 active:scale-90"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              {/* Liquid Glass Container */}
              <div className="relative w-full h-full rounded-full overflow-visible">
                {/* Aurora Borealis Background - Dynamic gradient */}
                <motion.div
                  className="absolute inset-[-8px] rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                    filter: 'blur(20px)',
                    opacity: 0.3,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: isAvatarHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />

                {/* Iridescent Border - Glowing Edge */}
                <motion.div
                  className="absolute inset-[-2px] rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(200,220,255,0.6), rgba(255,200,255,0.6), rgba(255,255,255,0.8))',
                    padding: '1px',
                  }}
                  animate={{
                    rotate: [0, 360],
                    opacity: isAvatarHovered ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="w-full h-full rounded-full bg-background" />
                </motion.div>

                {/* Frosted Glass Layer - Primary Material */}
                <motion.div
                  className="absolute inset-0 rounded-full backdrop-blur-[30px] bg-white/[0.15] dark:bg-white/[0.08]"
                  style={{
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.5),
                      inset 0 -1px 0 rgba(255, 255, 255, 0.2),
                      0 8px 32px rgba(0, 0, 0, 0.1)
                    `,
                  }}
                  animate={{
                    scale: isAvatarHovered ? [1, 1.02, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Dynamic Reflection - Gyroscope-like effect */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Liquid Flow - Morphing waves */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden opacity-40"
                  animate={{
                    background: [
                      'linear-gradient(0deg, rgba(200,220,255,0.3) 0%, transparent 50%)',
                      'linear-gradient(90deg, rgba(255,200,255,0.3) 0%, transparent 50%)',
                      'linear-gradient(180deg, rgba(200,255,255,0.3) 0%, transparent 50%)',
                      'linear-gradient(270deg, rgba(255,220,200,0.3) 0%, transparent 50%)',
                      'linear-gradient(360deg, rgba(200,220,255,0.3) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Ripple Effect on Hover */}
                <AnimatePresence>
                  {isAvatarHovered && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`ripple-${i}`}
                          className="absolute inset-0 rounded-full border border-white/40"
                          initial={{
                            scale: 1,
                            opacity: 0.6
                          }}
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.6, 0]
                          }}
                          exit={{
                            scale: 1.5,
                            opacity: 0
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Liquid Droplets - Floating particles */}
                <AnimatePresence>
                  {isAvatarHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`droplet-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full backdrop-blur-sm"
                          style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,220,255,0.4) 100%)',
                            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                          }}
                          initial={{
                            x: 32,
                            y: 32,
                            scale: 0,
                            opacity: 0
                          }}
                          animate={{
                            x: [32, 32 + Math.cos(i * 1.2) * 25, 32],
                            y: [32, 32 + Math.sin(i * 1.2) * 25, 32],
                            scale: [0, 1, 0.5, 0],
                            opacity: [0, 1, 0.8, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Avatar wrapper with additional glass effect */}
                <motion.div
                  ref={logoRef}
                  className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-[10px] bg-white/[0.25] dark:bg-black/[0.15]"
                  style={{
                    boxShadow: `
                      inset 0 2px 4px rgba(255, 255, 255, 0.4),
                      inset 0 -2px 4px rgba(0, 0, 0, 0.1),
                      0 8px 32px rgba(0, 0, 0, 0.15)
                    `,
                  }}
                  animate={{
                    scale: isAvatarHovered ? [1, 1.05, 1.02] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  aria-hidden="true"
                >
                  {/* Specular Highlight on Press/Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.6) 0%, transparent 40%)',
                    }}
                    animate={{
                      opacity: isAvatarHovered ? [0.3, 0.6, 0.3] : 0.3,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Morphing Liquid Flow Inside */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                        'radial-gradient(ellipse at 100% 50%, rgba(200,220,255,0.2) 0%, transparent 70%)',
                        'radial-gradient(ellipse at 50% 100%, rgba(255,200,255,0.2) 0%, transparent 70%)',
                        'radial-gradient(ellipse at 0% 50%, rgba(200,255,255,0.2) 0%, transparent 70%)',
                        'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      ]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <img
                    src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}
                    alt="Menu Avatar"
                    className="sm-logo-img relative w-full h-full object-cover z-10"
                    draggable={false}
                  />
                  
                  {/* Satin Sheen - Soft highlights */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)',
                    }}
                  />
                </motion.div>

                {/* Outer Holographic Ring */}
                <motion.div
                  className="absolute inset-[-4px] rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(255,255,255,0.3), rgba(200,220,255,0.3), rgba(255,200,255,0.3), rgba(200,255,255,0.3), rgba(255,255,255,0.3))',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 62%, black 100%)',
                    maskImage: 'radial-gradient(circle, transparent 60%, black 62%, black 100%)',
                  }}
                  animate={{
                    rotate: [0, 360],
                    opacity: isAvatarHovered ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </button>

            {/* --- New Theme Toggle Button --- */}
            <AnimatePresence>
              {isAvatarHovered && (
                <motion.button
                  onClick={toggleTheme}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-[calc(100%_+_12px)] w-12 h-12 rounded-full bg-slate-800/80 dark:bg-white/20 text-white dark:text-yellow-300 backdrop-blur-md border border-white/10 flex items-center justify-center"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, rotate: -30 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "light" ? (
                        <Moon size={20} />
                      ) : (
                        <Sun size={20} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="sm-toggle-blade absolute right-[calc(50%_+_20px)] w-auto h-[48px] bg-slate-800/80 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-end pr-[calc(48px_+_1rem)] opacity-0 pointer-events-none">
              <div className="flex items-center gap-2 px-4">
                <span
                  ref={textWrapRef}
                  className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap text-sm tracking-wide"
                  aria-hidden="true"
                >
                  <span
                    ref={textInnerRef}
                    className="sm-toggle-textInner flex flex-col leading-none text-white font-semibold"
                  >
                    {textLines.map((l, i) => (
                      <span
                        className="sm-toggle-line block h-[1em] leading-none"
                        key={i}
                      >
                        {l}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  ref={iconRef}
                  className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center text-white"
                  aria-hidden="true"
                >
                  <span
                    ref={plusHRef}
                    className="sm-icon-line absolute w-full h-[2.5px] bg-current rounded-full"
                  />
                  <span
                    ref={plusVRef}
                    className="sm-icon-line sm-icon-line-v absolute w-full h-[2.5px] bg-current rounded-full"
                  />
                </span>
              </div>
            </div>
          </div>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-slate-900 flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10" // Dark background
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative text-slate-100 font-title text-[3.5rem] md:text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                     No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-subtitle text-slate-400">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.1rem] font-subtitle text-slate-300 no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
/* --- NEW STYLES for breathing glow --- */
@keyframes breathing-glow {
  0% { box-shadow: 0 0 10px 0px rgba(135, 96, 45, 0.4); }
  50% { box-shadow: 0 0 25px 5px rgba(135, 96, 45, 0.2); }
  100% { box-shadow: 0 0 10px 0px rgba(135, 96, 45, 0.4); }
}
.animate-breathing-glow {
  animation: breathing-glow 4s ease-in-out infinite;
}
.dark .animate-breathing-glow {
  box-shadow: 0 0 15px 2px rgba(135, 96, 45, 0.6);
  animation: none; /* Can disable breathing in dark mode for a constant glow if preferred */
}

/* Original Styles (with minor adjustments for dark mode) */
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: flex-end; padding: 2em; pointer-events: none; z-index: 20; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-toggle-textWrap { position: relative; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2.5px; background: currentColor; border-radius: 9999px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link:hover { color: var(--sm-accent, #5227FF); }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; cursor: pointer; line-height: 1; display: inline-block; text-decoration: none; padding-right: 1.4em; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #5227FF); }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #5227FF); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
