import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="button"], .cursor-pointer')) {
        setIsHoveringInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="button"], .cursor-pointer')) {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 24,
      height: 24,
    },
    interactive: {
      width: 48,
      height: 48,
      opacity: 0.5,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full bg-white"
      style={{ left: position.x, top: position.y, x: '-50%', y: '-50%', mixBlendMode: 'difference' }}
      variants={cursorVariants}
      animate={isHoveringInteractive ? 'interactive' : 'default'}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  );
};

export default CustomCursor;