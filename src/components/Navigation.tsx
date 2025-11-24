import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroAvatar from '@/assets/heroAvatar.png';
import { StaggeredMenu } from './StaggeredMenu';
import { useTheme } from '../hooks/use-theme';

const Navigation: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling past hero section (roughly 100vh)
      const heroHeight = window.innerHeight;
      setShowNavbar(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Experience', ariaLabel: 'Go to experience section', link: '#experience' },
    { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
    { label: 'Skills', ariaLabel: 'Go to skills section', link: '#skills' },
    { label: 'Achievements', ariaLabel: 'Go to achievements section', link: '#achievements' },
    { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
  ];

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.div
          className={`fixed top-0 left-0 w-screen h-screen z-50 ${isMenuOpen ? '' : 'pointer-events-none'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StaggeredMenu
            items={menuItems}
            logoUrl={heroAvatar}
            displaySocials={false}
            position="left"
            displayItemNumbering={true}
            menuButtonColor="#000"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            accentColor="#ff6b6b"
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;