import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  mathsQuestions,
  categoryLabels,
  getQuestionsByCategory,
  getRandomQuestions,
} from '../data/mathsQuestions';
import { MathQuestion } from '../types';

type RootStackParamList = {
  Home: undefined;
  MathsPractice: undefined;
};

type MathsPracticeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MathsPractice'
>;

interface MathsPracticeScreenProps {
  navigation: MathsPracticeScreenNavigationProp;
}

type ViewMode = 'menu' | 'category' | 'quiz';

export const MathsPracticeScreen: React.FC<MathsPracticeScreenProps> = ({
  navigation,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<MathQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  const fadeAnim = new Animated.Value(1);

  const categories = [
    { id: 'place-value', icon: '🔢', color: '#E3F2FD' },
    { id: 'multiplication', icon: '✖️', color: '#FFF3E0' },
    { id: 'division', icon: '➗', color: '#F3E5F5' },
    { id: 'fractions', icon: '🥧', color: '#E8F5E9' },
    { id: 'decimals', icon: '🔵', color: '#FFF8E1' },
    { id: 'money', icon: '💰', color: '#FCE4EC' },
    { id: 'patterns', icon: '🔄', color: '#E0F7FA' },
    { id: 'word-problems', icon: '📝', color: '#EFEBE9' },
  ];

  const startCategoryQuiz = (categoryId: string) => {
    const questions = getQuestionsByCategory(categoryId);
    // Shuffle and take up to 5 questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setCurrentQuestions(shuffled.slice(0, 5));
    setSelectedCategory(categoryId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setViewMode('quiz');
  };

  const startMixedQuiz = () => {
    const questions = getRandomQuestions(10);
    setCurrentQuestions(questions);
    setSelectedCategory('mixed');
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setViewMode('quiz');
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleTextSubmit = () => {
    if (textAnswer.trim()) {
      handleAnswerSelect(textAnswer.trim());
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setTextAnswer('');
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setViewMode('menu');
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setShowHint(false);
    setTextAnswer('');
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  const getScoreMessage = () => {
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'PERFECT SCORE! You\'re a Maths Champion!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent work! You\'re doing great!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep practicing!' };
    if (percentage >= 40) return { emoji: '📚', message: 'Nice try! A bit more practice will help!' };
    return { emoji: '💪', message: 'Don\'t give up! Practice makes perfect!' };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#666';
    }
  };

  if (viewMode === 'menu') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Maths Practice</Text>
        </View>

        <View style={styles.curriculumBadge}>
          <Text style={styles.curriculumText}>
            📚 Victorian Curriculum • Year 4 • NAPLAN Prep
          </Text>
        </View>

        <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
          {/* Mixed Quiz Button */}
          <TouchableOpacity style={styles.mixedQuizButton} onPress={startMixedQuiz}>
            <Text style={styles.mixedQuizIcon}>🎲</Text>
            <View style={styles.mixedQuizContent}>
              <Text style={styles.mixedQuizTitle}>Mixed Practice</Text>
              <Text style={styles.mixedQuizSubtitle}>
                10 random questions from all topics
              </Text>
            </View>
            <Text style={styles.mixedQuizArrow}>→</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Choose a Topic</Text>

          {/* Category Grid */}
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, { backgroundColor: cat.color }]}
                onPress={() => startCategoryQuiz(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryLabel}>{categoryLabels[cat.id]}</Text>
                <Text style={styles.questionCount}>
                  {getQuestionsByCategory(cat.id).length} questions
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (quizComplete) {
    const { emoji, message } = getScoreMessage();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            {score} / {currentQuestions.length}
          </Text>
          <Text style={styles.resultPercentage}>
            {Math.round((score / currentQuestions.length) * 100)}%
          </Text>
          <Text style={styles.resultMessage}>{message}</Text>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setQuizComplete(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setShowResult(false);
              }}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={resetQuiz}>
              <Text style={styles.menuButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={resetQuiz} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.progressInfo}>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </Text>
          <View style={styles.quizProgressBar}>
            <View
              style={[
                styles.quizProgressFill,
                {
                  width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>⭐ {score}</Text>
        </View>
      </View>

      <Animated.ScrollView
        style={[styles.quizContent, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Category & Difficulty Badge */}
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {categoryLabels[currentQuestion?.category] || 'Mixed'}
            </Text>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(currentQuestion?.difficulty) },
            ]}
          >
            <Text style={styles.difficultyBadgeText}>
              {currentQuestion?.difficulty.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>

          {/* Hint Button */}
          {currentQuestion?.hint && !showResult && (
            <TouchableOpacity
              style={styles.hintButton}
              onPress={() => setShowHint(!showHint)}
            >
              <Text style={styles.hintButtonText}>
                {showHint ? '💡 Hide Hint' : '💡 Show Hint'}
              </Text>
            </TouchableOpacity>
          )}

          {showHint && currentQuestion?.hint && (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>{currentQuestion.hint}</Text>
            </View>
          )}
        </View>

        {/* Options */}
        {currentQuestion?.options ? (
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    showCorrect && styles.optionCorrect,
                    showIncorrect && styles.optionIncorrect,
                  ]}
                  onPress={() => !showResult && handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  <Text
                    style={[
                      styles.optionText,
                      (showCorrect || showIncorrect) && styles.optionResultText,
                    ]}
                  >
                    {option}
                  </Text>
                  {showCorrect && <Text style={styles.optionIcon}>✓</Text>}
                  {showIncorrect && <Text style={styles.optionIcon}>✗</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.answerInput}
              placeholder="Type your answer here..."
              value={textAnswer}
              onChangeText={setTextAnswer}
              editable={!showResult}
              keyboardType="default"
              returnKeyType="done"
              onSubmitEditing={handleTextSubmit}
            />
            {!showResult && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleTextSubmit}
              >
                <Text style={styles.submitButtonText}>Check Answer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Result Explanation */}
        {showResult && (
          <View
            style={[
              styles.explanationCard,
              selectedAnswer === currentQuestion?.correctAnswer
                ? styles.explanationCorrect
                : styles.explanationIncorrect,
            ]}
          >
            <Text style={styles.explanationTitle}>
              {selectedAnswer === currentQuestion?.correctAnswer
                ? '🎉 Correct!'
                : '❌ Not quite right'}
            </Text>
            {selectedAnswer !== currentQuestion?.correctAnswer && (
              <Text style={styles.correctAnswerText}>
                The correct answer is: {currentQuestion?.correctAnswer}
              </Text>
            )}
            <Text style={styles.explanationText}>
              {currentQuestion?.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showResult && (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < currentQuestions.length - 1
                ? 'Next Question →'
                : 'See Results'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomPadding} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6C63FF',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  curriculumBadge: {
    backgroundColor: '#E8EAF6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  curriculumText: {
    color: '#5C6BC0',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContent: {
    flex: 1,
    padding: 16,
  },
  mixedQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mixedQuizIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  mixedQuizContent: {
    flex: 1,
  },
  mixedQuizTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mixedQuizSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginTop: 4,
  },
  mixedQuizArrow: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  questionCount: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6C63FF',
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  questionNumber: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  quizProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  quizProgressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  scoreDisplay: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizContent: {
    flex: 1,
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#5C6BC0',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 28,
    fontWeight: '500',
  },
  hintButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  hintButtonText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '600',
  },
  hintBox: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  hintText: {
    color: '#F57C00',
    fontSize: 14,
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#6C63FF',
    backgroundColor: '#F5F3FF',
  },
  optionCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionText: {
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
  optionResultText: {
    fontWeight: 'bold',
  },
  optionIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputContainer: {
    gap: 12,
  },
  answerInput: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    fontSize: 17,
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  explanationCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  explanationCorrect: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#81C784',
  },
  explanationIncorrect: {
    backgroundColor: '#FFEBEE',
    borderWidth: 2,
    borderColor: '#EF9A9A',
  },
  explanationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#6C63FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  resultPercentage: {
    fontSize: 24,
    color: '#666',
    marginTop: 8,
  },
  resultMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  resultButtons: {
    marginTop: 40,
    gap: 16,
    width: '100%',
  },
  tryAgainButton: {
    backgroundColor: '#6C63FF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#E8EAF6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#5C6BC0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 50,
  },
});
