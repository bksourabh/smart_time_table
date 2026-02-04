import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Lock, Unlock, Check, X, Lightbulb, RotateCcw, Home, Sparkles } from 'lucide-react';
import { mathsQuestions } from '../data/mathsQuestions';
import type { MathQuestion } from '../types';

interface HuntLocation {
  id: number;
  name: string;
  icon: string;
  description: string;
  clue: string;
  bgColor: string;
  question: MathQuestion | null;
}

const getQuestionById = (id: string): MathQuestion | undefined => {
  return mathsQuestions.find(q => q.id === id);
};

// Special final question about Dada
const dadaQuestion: MathQuestion = {
  id: 'dada-special',
  strand: 'number-algebra',
  category: 'multiplication',
  difficulty: 'hard',
  question: 'Vivaan asked his Dada a tricky multiplication question. Dada thought carefully and gave the answer. What was the answer to this complicated multiplication?',
  options: ['79488', '78948', '79848', '74988'],
  correctAnswer: '79488',
  explanation: 'The answer Dada gave to Vivaan\'s tricky multiplication question was 79488! Dada always knows the answer!',
  hint: 'Think about what Dada would say... the digits are 7, 9, 4, 8, 8!',
};

const huntLocations: HuntLocation[] = [
  {
    id: 1,
    name: 'Front Door',
    icon: '🚪',
    description: 'The adventure begins at the front door!',
    clue: 'Welcome home, Vivaan! Your treasure hunt begins here. Solve this puzzle to find where to go next. Hint: It\'s where the family gathers to watch TV!',
    bgColor: 'from-amber-400 to-orange-500',
    question: getQuestionById('mult-e1') || null, // 7 × 8
  },
  {
    id: 2,
    name: 'Living Room',
    icon: '🛋️',
    description: 'The cozy living room with the big TV',
    clue: 'Great job finding the living room! Look behind the couch cushions... Solve this to discover where snacks are made!',
    bgColor: 'from-blue-400 to-indigo-500',
    question: getQuestionById('div-e2') || null, // 24 stickers
  },
  {
    id: 3,
    name: 'Kitchen',
    icon: '🍳',
    description: 'Where delicious meals are prepared',
    clue: 'Mmm, something smells good! Check inside the cookie jar... Your next clue leads to where Mum and Dad sleep!',
    bgColor: 'from-green-400 to-emerald-500',
    question: getQuestionById('frac-m1') || null, // 3/4 of 20
  },
  {
    id: 4,
    name: 'Master Bedroom',
    icon: '🛏️',
    description: 'The biggest bedroom in the house',
    clue: 'You found the master bedroom! Look under the pillow... Next, head to where your little sibling dreams!',
    bgColor: 'from-purple-400 to-violet-500',
    question: getQuestionById('time-m1') || null, // time question
  },
  {
    id: 5,
    name: 'Baby\'s Room',
    icon: '🧸',
    description: 'A cozy room with toys and a crib',
    clue: 'Shh, the baby might be sleeping! Check the toy box... Now find the room with all the books!',
    bgColor: 'from-pink-400 to-rose-500',
    question: getQuestionById('shp-e1') || null, // shapes
  },
  {
    id: 6,
    name: 'Study Room',
    icon: '📚',
    description: 'Where homework and reading happens',
    clue: 'Knowledge is power! Look behind the bookshelf... Your next stop is the room where guests sleep!',
    bgColor: 'from-cyan-400 to-teal-500',
    question: getQuestionById('pv-m1') || null, // place value
  },
  {
    id: 7,
    name: 'Guest Bedroom',
    icon: '🛌',
    description: 'A welcoming room for visitors',
    clue: 'Welcome, guest! Check the bedside drawer... Now find the room where games are played!',
    bgColor: 'from-orange-400 to-red-500',
    question: getQuestionById('ap-e1') || null, // area & perimeter
  },
  {
    id: 8,
    name: 'Games Room',
    icon: '🎮',
    description: 'The fun room with all the games',
    clue: 'Game on! Look inside the board game box... Next, head to where Vivaan sleeps!',
    bgColor: 'from-indigo-400 to-purple-500',
    question: getQuestionById('mon-m1') || null, // money
  },
  {
    id: 9,
    name: 'Vivaan\'s Bedroom',
    icon: '⭐',
    description: 'Your very own special room!',
    clue: 'This is YOUR room, Vivaan! Check under your bed... Now go outside to the beautiful garden!',
    bgColor: 'from-yellow-400 to-amber-500',
    question: getQuestionById('pat-m1') || null, // patterns
  },
  {
    id: 10,
    name: 'Backyard Garden',
    icon: '🌳',
    description: 'The green garden with flowers',
    clue: 'Fresh air and sunshine! Look behind the big tree... Your next adventure awaits at the pool!',
    bgColor: 'from-lime-400 to-green-500',
    question: getQuestionById('ch-m1') || null, // chance
  },
  {
    id: 11,
    name: 'Swimming Pool',
    icon: '🏊',
    description: 'The sparkling blue swimming pool',
    clue: 'Splash! Check the pool towel basket... One more puzzle before the treasure!',
    bgColor: 'from-sky-400 to-blue-500',
    question: getQuestionById('dg-m1') || null, // data & graphs
  },
  {
    id: 12,
    name: 'Treasure Chest',
    icon: '💎',
    description: 'The final destination!',
    clue: 'You\'re almost there! This is the FINAL question. Remember when you asked Dada that tricky multiplication question? What was his answer?',
    bgColor: 'from-yellow-400 to-yellow-600',
    question: dadaQuestion,
  },
];

export function MathsScavengerHunt() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [unlockedLocations, setUnlockedLocations] = useState<number[]>([0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const location = huntLocations[currentLocation];
  const question = location.question;
  const canProceed = currentLocation < huntLocations.length - 1 && unlockedLocations.includes(currentLocation + 1);

  useEffect(() => {
    // Check for saved progress
    const saved = localStorage.getItem('vivaan_scavenger_progress');
    if (saved) {
      const { unlocked, current } = JSON.parse(saved);
      setUnlockedLocations(unlocked);
      setCurrentLocation(current);
      if (unlocked.length === huntLocations.length) {
        setGameComplete(true);
      }
    }
  }, []);

  const saveProgress = (unlocked: number[], current: number) => {
    localStorage.setItem('vivaan_scavenger_progress', JSON.stringify({ unlocked, current }));
  };

  const handleAnswer = (answer: string) => {
    if (!question) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === question.correctAnswer) {
      // Unlock next location
      if (currentLocation < huntLocations.length - 1) {
        const newUnlocked = [...unlockedLocations, currentLocation + 1];
        setUnlockedLocations(newUnlocked);
        saveProgress(newUnlocked, currentLocation);
      } else {
        // Game complete!
        setGameComplete(true);
        const newUnlocked = [...unlockedLocations];
        saveProgress(newUnlocked, currentLocation);
      }
    } else {
      setWrongAttempts(prev => prev + 1);
    }
  };

  const goToNextLocation = () => {
    if (currentLocation < huntLocations.length - 1) {
      setCurrentLocation(currentLocation + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setWrongAttempts(0);
    }
  };

  const goToLocation = (index: number) => {
    if (unlockedLocations.includes(index)) {
      setCurrentLocation(index);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setWrongAttempts(0);
    }
  };

  const resetGame = () => {
    setCurrentLocation(0);
    setUnlockedLocations([0]);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setGameComplete(false);
    setWrongAttempts(0);
    localStorage.removeItem('vivaan_scavenger_progress');
  };

  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Victory Screen
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl text-center relative overflow-hidden"
        >
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  top: -20,
                  left: `${Math.random() * 100}%`,
                  rotate: 0
                }}
                animate={{
                  top: '110%',
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {['⭐', '🎉', '💎', '🏆', '✨'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="text-8xl mb-6"
          >
            🏆
          </motion.div>

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
            TREASURE FOUND!
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl mb-6"
          >
            💎🎁💰
          </motion.div>

          <p className="text-xl text-gray-700 mb-4">
            Congratulations, Vivaan!
          </p>
          <p className="text-gray-600 mb-8">
            You solved all 12 puzzles and found the treasure! You explored the whole house from the front door to the swimming pool. Amazing maths skills!
          </p>

          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-6 mb-8">
            <p className="text-amber-800 font-medium">
              🌟 Special Memory: Remember when you asked Dada that tricky multiplication question? The answer was <span className="font-bold text-2xl">79488</span>! Dada was so proud of you!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            <Link
              to="/maths"
              className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Maths Practice
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/maths" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                House Treasure Hunt
              </h1>
              <p className="text-xs text-white/80">Location {currentLocation + 1} of {huntLocations.length}</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {unlockedLocations.length - 1}/12
            </div>
          </div>
        </div>
      </header>

      {/* Location Map */}
      <div className="bg-white border-b border-gray-100 p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max max-w-5xl mx-auto">
          {huntLocations.map((loc, index) => {
            const isActive = index === currentLocation;
            const isOpen = unlockedLocations.includes(index);
            const isCompleted = unlockedLocations.includes(index + 1) || (index === huntLocations.length - 1 && gameComplete);

            return (
              <button
                key={loc.id}
                onClick={() => goToLocation(index)}
                disabled={!isOpen}
                className={`
                  flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-br ' + loc.bgColor + ' text-white scale-110 shadow-lg'
                    : isOpen
                      ? isCompleted
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                      : 'bg-gray-100 text-gray-400'}
                `}
              >
                {isOpen ? (
                  <>
                    <span className="text-xl">{loc.icon}</span>
                    {isCompleted && <Check className="w-3 h-3 mt-0.5" />}
                  </>
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Current Location Card */}
        <motion.div
          key={currentLocation}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${location.bgColor} rounded-3xl p-6 text-white shadow-2xl mb-6`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-5xl">
              {location.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm text-white/80">Location {location.id}</span>
              </div>
              <h2 className="text-2xl font-bold">{location.name}</h2>
              <p className="text-white/80 text-sm">{location.description}</p>
            </div>
          </div>

          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur">
            <p className="text-white leading-relaxed">
              📜 <span className="font-medium">Clue:</span> {location.clue}
            </p>
          </div>
        </motion.div>

        {/* Question Section */}
        {question && !canProceed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                {currentLocation === 11 ? '🌟 Special Question' : `Puzzle ${currentLocation + 1}`}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {question.question}
            </h3>

            {question.hint && !showResult && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="mb-4 flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </span>
              </button>
            )}

            <AnimatePresence>
              {showHint && question.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg"
                >
                  <p className="text-amber-800 text-sm italic">💡 {question.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options */}
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === question.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={`
                      w-full p-4 rounded-xl text-left font-medium transition-all duration-200 flex items-center justify-between
                      ${showCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : showIncorrect
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : isSelected
                        ? 'bg-amber-100 border-2 border-amber-500 text-amber-800'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50'}
                    `}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check className="w-6 h-6 text-green-600" />}
                    {showIncorrect && <X className="w-6 h-6 text-red-600" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-6 rounded-2xl ${
                    selectedAnswer === question.correctAnswer
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-red-50 border-2 border-red-200'
                  }`}
                >
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <h4 className="text-xl font-bold text-green-700 mb-2">
                        🎉 Correct! You unlocked the next location!
                      </h4>
                      <p className="text-gray-700">{question.explanation}</p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold text-red-700 mb-2">
                        ❌ Not quite right!
                      </h4>
                      <p className="text-red-600 mb-3">
                        The correct answer was: {question.correctAnswer}
                      </p>
                      <p className="text-gray-700 mb-4">{question.explanation}</p>
                      {wrongAttempts < 2 && (
                        <button
                          onClick={tryAgain}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                        >
                          Try Again
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Next Location Button */}
        {canProceed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={goToNextLocation}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Unlock className="w-5 h-5" />
            Go to {huntLocations[currentLocation + 1].name} →
          </motion.button>
        )}

        {/* Already Solved Indicator */}
        {unlockedLocations.includes(currentLocation + 1) && currentLocation < huntLocations.length - 1 && !showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-200"
          >
            <p className="text-green-700 font-medium flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              You already solved this puzzle! Proceed to the next location.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
