import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Check, X, RotateCcw, Home, Shuffle } from 'lucide-react';
import { categoryLabels, getQuestionsByCategory, getRandomQuestions } from '../data/mathsQuestions';
import type { MathQuestion, MathCategoryType } from '../types';

type ViewMode = 'menu' | 'quiz' | 'result';

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

export function MathsPractice() {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const categories = Object.entries(categoryLabels) as [MathCategoryType, typeof categoryLabels[MathCategoryType]][];

  const startQuiz = (category: MathCategoryType | 'mixed') => {
    const selected = category === 'mixed'
      ? getRandomQuestions(10)
      : getQuestionsByCategory(category).sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setViewMode('quiz');
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setViewMode('result');
    }
  };

  const resetQuiz = () => {
    setViewMode('menu');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: "PERFECT SCORE! You're a Maths Champion!", color: 'text-yellow-500' };
    if (percentage >= 80) return { emoji: '🌟', message: "Excellent work! You're doing great!", color: 'text-green-500' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep practicing!', color: 'text-blue-500' };
    if (percentage >= 40) return { emoji: '📚', message: 'Nice try! A bit more practice will help!', color: 'text-orange-500' };
    return { emoji: '💪', message: "Don't give up! Practice makes perfect!", color: 'text-purple-500' };
  };

  // Menu View
  if (viewMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Schedule</span>
            </Link>
            <h1 className="text-3xl font-bold">Maths Practice</h1>
            <p className="text-white/80 mt-1">Victorian Curriculum • Year 4 • NAPLAN Prep</p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {/* Mixed Quiz */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => startQuiz('mixed')}
            className="w-full mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Shuffle className="w-8 h-8" />
              </div>
              <div className="flex-grow text-left">
                <h2 className="text-xl font-bold">Mixed Practice</h2>
                <p className="text-white/80 text-sm">10 random questions from all topics</p>
              </div>
              <div className="text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.button>

          {/* Categories */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Choose a Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(([key, value], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => startQuiz(key)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-center">{value.label}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {getQuestionsByCategory(key).length} questions
                </p>
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Result View
  if (viewMode === 'result') {
    const { emoji, message, color } = getScoreMessage();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-8xl mb-6"
          >
            {emoji}
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>

          <div className="my-8">
            <div className={`text-6xl font-bold ${color}`}>
              {score}/{questions.length}
            </div>
            <div className="text-2xl text-gray-500 mt-2">{percentage}%</div>
          </div>

          <p className="text-lg text-gray-600 mb-8">{message}</p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setShowHint(false);
                setViewMode('quiz');
              }}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={resetQuiz}
              className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Topics
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Quiz Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={resetQuiz}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <span className="text-sm text-white/80">Question</span>
              <span className="text-lg font-bold ml-2">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-bold">⭐ {score}</span>
            </div>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                {categoryLabels[currentQuestion.category].label}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${difficultyColors[currentQuestion.difficulty]}`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {currentQuestion.hint && !showResult && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="mt-4 flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </span>
                </button>
              )}

              <AnimatePresence>
                {showHint && currentQuestion.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg"
                  >
                    <p className="text-amber-800 text-sm italic">{currentQuestion.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options?.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={`
                      w-full p-5 rounded-2xl text-left font-medium text-lg transition-all duration-200 flex items-center justify-between
                      ${showCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : showIncorrect
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : isSelected
                        ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-800'
                        : 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'}
                    `}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check className="w-6 h-6 text-green-600" />}
                    {showIncorrect && <X className="w-6 h-6 text-red-600" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Result Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl mb-6 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-red-50 border-2 border-red-200'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Not quite right'}
                  </h3>
                  {selectedAnswer !== currentQuestion.correctAnswer && (
                    <p className="text-red-600 font-medium mb-3">
                      The correct answer is: {currentQuestion.correctAnswer}
                    </p>
                  )}
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {showResult && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextQuestion}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
