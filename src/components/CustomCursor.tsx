import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  AnimatePresence
} from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the follower
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity for deformation
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  
  // Calculate rotation based on movement direction
  const rotate = useTransform<number, number>([velocityX, velocityY], ([vx, vy]) => {
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);
    return angle;
  });

  // Calculate scale/squeeze based on total velocity magnitude
  const scaleX = useTransform<number, number>([velocityX, velocityY], ([vx, vy]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.min(1 + speed / 1000, 1.5); // Max stretch of 1.5x
  });
  
  const scaleY = useTransform<number, number>([velocityX, velocityY], ([vx, vy]) => {
    const speed = Math.sqrt(vx * vx + vy * vy);
    return Math.max(1 - speed / 1000, 0.5); // Max squeeze of 0.5x
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="button"], .cursor-pointer, input, textarea')) {
        setIsHoveringInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="button"], .cursor-pointer, input, textarea')) {
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
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Dot - follows instantly */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Follower Ring - smooth spring + deformation */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border border-white mix-blend-difference"
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
          rotate,
          scaleX: isHoveringInteractive ? 1 : scaleX,
          scaleY: isHoveringInteractive ? 1 : scaleY,
        }}
        animate={{
          width: isHoveringInteractive ? 60 : 24,
          height: isHoveringInteractive ? 60 : 24,
          opacity: isHoveringInteractive ? 0.8 : 0.4,
          borderWidth: isHoveringInteractive ? '2px' : '1px',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        <AnimatePresence>
          {isHoveringInteractive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
