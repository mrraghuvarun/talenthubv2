import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Home, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  const location = useLocation();
  const message = location.state?.message || 'Your registration was successful!';
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 400);
  }, []);

  const confettiPieces = Array.from({ length: 30 }).map((_, i) => ({
    x: Math.random() * 400 - 200,
    y: -(Math.random() * 200 + 100),
    rotation: Math.random() * 360,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient ring */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#353939]/5 via-blue-500/5 to-[#353939]/5"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: [0, 90],
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Confetti animation */}
      {showConfetti && confettiPieces.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ 
            x: 0, 
            y: 0, 
            rotate: piece.rotation,
            scale: 0
          }}
          animate={{ 
            x: piece.x, 
            y: [0, piece.y, piece.y + 400],
            rotate: [piece.rotation, piece.rotation + 180],
            scale: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 2,
            delay: piece.delay,
            ease: "easeOut"
          }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-[#353939] via-blue-500 to-[#353939]"
            style={{ width: piece.size, height: piece.size }}
          />
        </motion.div>
      ))}

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white shadow-xl border border-gray-100">
          <CardContent className="p-8">
            {/* Success checkmark with ripple effect */}
            <div className="flex justify-center mb-8 relative">
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2
                }}
              >
                {/* Ripple circles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-[#353939]/20"
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: [0.8, 2, 0.8],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Main check circle */}
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-[#353939] to-[#454545] flex items-center justify-center relative"
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: 0.6 
                    }}
                  >
                    <Check className="w-12 h-12 text-white stroke-[3]" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Animated stars */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: `${20 + (i % 3) * 25}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + (i * 0.2),
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Star className="w-4 h-4 text-[#353939]/40 fill-[#353939]/40" />
                </motion.div>
              ))}
            </div>

            {/* Content with stagger animation */}
            <motion.div 
              className="text-center space-y-4 relative"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h2 
                className="text-3xl font-bold text-[#353939]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Success!
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 text-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {message}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="pt-4"
              >
                <Button 
                  className="bg-[#353939] text-white hover:bg-[#454545] shadow-lg px-8 py-2 h-auto"
                  asChild
                >
                  <a href="/" className="flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" />
                    Return Home
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
