import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X } from 'lucide-react';

interface CongratulationsProps {
  visible: boolean;
  userName: string;
  onClose: () => void;
}

const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 720 - 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 0.5,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          }}
        />
      ))}
    </div>
  );
}

export function Congratulations({ visible, userName, onClose }: CongratulationsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <Confetti />

          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl border-4 border-yellow-400"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Floating Stars */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 -left-6"
            >
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-10 h-10 text-pink-400" />
            </motion.div>

            {/* Trophy */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full shadow-lg">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2"
            >
              CONGRATULATIONS!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-4"
            >
              {userName}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-center text-gray-600 mb-2"
            >
              You completed all your tasks for today!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-500 italic mb-8"
            >
              You're a superstar! Keep up the great work!
            </motion.p>

            {/* Emoji Row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="flex justify-center gap-4 text-4xl"
            >
              {['🎉', '🌟', '🎊', '💪', '🏆'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onClose}
              className="mt-8 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Awesome! 🎉
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
