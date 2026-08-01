import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { Sun, Moon, Menu as MenuIcon, X } from "lucide-react";
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
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#2C1A11", "#1C1917"], // Warm dark chocolate & espresso tones
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const { theme, toggleTheme } = useTheme();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer")
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

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

    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 6 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.45, ease: "power3.out" },
        i * 0.06
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.06 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.06 : 0);
    const panelDuration = 0.55;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: { each: 0.08, from: "start" },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.06, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.35;
      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          socialsStart
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: { each: 0.06, from: "start" },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    const tl = buildOpenTimeline();
    if (tl) {
      tl.play(0);
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.3,
      ease: "power3.in",
      overwrite: "auto",
    });
  }, [position]);

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
  }, [playOpen, playClose, onMenuOpen, onMenuClose]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    toggleMenu();
    setTimeout(() => {
      const targetEl = document.querySelector(link);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="sm-scope w-full h-full relative z-50">
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper relative w-full h-full"
        }
        data-position={position}
        data-open={open || undefined}
      >
        {/* Pre-layer background panel */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const arr = ["#8B4513", "#3C2415"]; // Warm terracotta brown & deep espresso
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* --- Top Floating Navigation Bar (Cream & Brown Theme) --- */}
        <header
          className="staggered-menu-header fixed top-5 right-5 sm:right-10 flex items-center gap-3 p-0 bg-transparent pointer-events-none z-50"
          aria-label="Main navigation header"
        >
          <div className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FDFBF7]/90 dark:bg-[#1C1917]/90 text-[#2C1A11] dark:text-[#FDFBF7] backdrop-blur-xl border border-[#E6DEC6] dark:border-[#3C2E24] shadow-2xl transition-all duration-300">
            {/* Inline Light/Dark Mode Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#EAE2CE] dark:hover:bg-[#2C241D] text-[#C25E00] dark:text-[#F59E0B] transition-colors flex items-center justify-center cursor-pointer"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              type="button"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Vertical Separator */}
            <div className="w-[1px] h-5 bg-[#D8CEB7] dark:bg-[#3C2E24]" />

            {/* Clear Menu Trigger Button with "Menu" Text */}
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-[#EAE2CE] dark:hover:bg-[#2C241D] transition-all font-title font-semibold text-sm cursor-pointer select-none"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              type="button"
            >
              <span className="tracking-wide">
                {open ? "Close" : "Menu"}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={open ? "close" : "open"}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? (
                    <X size={18} className="text-[#C25E00] dark:text-[#F59E0B]" />
                  ) : (
                    <MenuIcon size={18} className="text-[#2C1A11] dark:text-[#FDFBF7]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </header>

        {/* Side Navigation Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#1C1917] text-[#FDFBF7] flex flex-col p-[6em_2.5em_2.5em_2.5em] overflow-y-auto z-10 border-l border-[#3C2E24]"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-6">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-3"
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
                      className="sm-panel-item relative text-[#FDFBF7] hover:text-[#F59E0B] font-title text-[2.8rem] md:text-[3.5rem] cursor-pointer leading-none tracking-tight uppercase transition-colors duration-200 inline-block no-underline pr-[1.2em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      onClick={(e) => handleLinkClick(e, it.link)}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : null}
            </ul>

            {displaySocials && (
              <div className="sm-socials mt-auto pt-8 border-t border-[#3C2E24] flex flex-col gap-3">
                <h3 className="sm-socials-title m-0 text-xs font-mono uppercase tracking-widest text-[#A89F91]">
                  Direct Social Links
                </h3>
                <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                  <li className="sm-socials-item">
                    <a
                      href="https://github.com/NaufanZaki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-sm font-subtitle text-[#E6DEC6] hover:text-[#F59E0B] transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li className="sm-socials-item">
                    <a
                      href="https://linkedin.com/in/naufan-zaki-luqmanulhakim-0b0810248"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-sm font-subtitle text-[#E6DEC6] hover:text-[#F59E0B] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="sm-socials-item">
                    <a
                      href="mailto:nzluqmanulhakim@gmail.com"
                      className="sm-socials-link text-sm font-subtitle text-[#E6DEC6] hover:text-[#F59E0B] transition-colors"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 50; }
        .sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(280px, 40vw, 440px); height: 100%; display: flex; flex-direction: column; padding: 6em 2.5em 2.5em 2.5em; overflow-y: auto; z-index: 10; }
        .sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
        .sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(280px, 40vw, 440px); pointer-events: none; z-index: 5; }
        .sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
        .sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
        .sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .sm-scope .sm-panel-item { position: relative; cursor: pointer; line-height: 1; display: inline-block; text-decoration: none; }
        .sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 1em; font-size: 16px; font-weight: 500; font-family: monospace; color: #F59E0B; opacity: var(--sm-num-opacity, 0); }
        @media (max-width: 768px) { .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;