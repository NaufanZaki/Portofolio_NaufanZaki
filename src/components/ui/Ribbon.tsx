
import React from 'react';
import { motion } from 'framer-motion';

interface RibbonProps {
  text: string;
}

const Ribbon: React.FC<RibbonProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4, duration: 1, type: 'spring', stiffness: 100 }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[220px] overflow-hidden z-20"
    >
      <div className="relative w-full h-full">
        <div
          className="absolute top-[60px] left-[-200px] w-[600px] h-[50px] bg-gradient-to-r from-pink-500 to-yellow-500 shadow-lg transform -rotate-45"
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-wider uppercase">
              {text}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Ribbon;
