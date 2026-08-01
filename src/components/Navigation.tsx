import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggeredMenu } from './StaggeredMenu';

const Navigation: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating navbar only after scrolling past 80% of hero section
      const heroHeight = window.innerHeight;
      setShowNavbar(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Education', ariaLabel: 'Go to education section', link: '#education' },
    { label: 'Experience', ariaLabel: 'Go to experience section', link: '#experience' },
    { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
    { label: 'Skills', ariaLabel: 'Go to skills section', link: '#skills' },
    { label: 'Leadership', ariaLabel: 'Go to leadership section', link: '#leadership' },
    { label: 'Achievements', ariaLabel: 'Go to achievements section', link: '#achievements' },
    { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
  ];

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.div
          className={`fixed top-0 left-0 w-screen h-screen z-50 ${isMenuOpen ? '' : 'pointer-events-none'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <StaggeredMenu
            items={menuItems}
            displaySocials={true}
            position="right"
            displayItemNumbering={true}
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;