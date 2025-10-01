import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      {/* Fixed Parallax Background */}
      <div className="fixed inset-0 z-0 overflow-hidden blur-3xl">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-red-400/20 rounded-full"
          style={{ top: '10%', left: '20%' }}
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, 45, -30, 0],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-cyan-400/25 rounded-full"
          style={{ bottom: '5%', right: '15%' }}
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -80, 80, 0],
            scale: [1, 0.7, 1.3, 1],
            rotate: [0, -60, 30, 0],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-orange-300/15 rounded-full"
          style={{ top: '40%', left: '45%' }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-9xl font-bold text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-2xl font-subtitle text-foreground mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! You've gotten lost in the web.
        </motion.p>
        <motion.p
          className="text-lg text-muted-foreground mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go back to the homepage
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;