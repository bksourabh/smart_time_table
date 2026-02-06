export interface Task {
  id: string;
  time: string;
  title: string;
  category: 'morning' | 'school' | 'study' | 'play' | 'skill' | 'family' | 'meal' | 'rest';
  duration?: string;
  icon: string;
}

export interface DaySchedule {
  day: string;
  tasks: Task[];
}

// Victorian Curriculum Year 4 Mathematics Categories
// Strand 1: Number and Algebra
// Strand 2: Measurement and Geometry
// Strand 3: Statistics and Probability
export interface MathQuestion {
  id: string;
  strand: 'number-algebra' | 'measurement-geometry' | 'statistics-probability';
  category:
    // Number and Algebra
    | 'place-value'
    | 'multiplication'
    | 'division'
    | 'fractions'
    | 'decimals'
    | 'money'
    | 'patterns'
    // Measurement and Geometry
    | 'length-mass-capacity'
    | 'area-perimeter'
    | 'time'
    | 'shapes'
    | 'angles'
    | 'position-maps'
    | 'symmetry'
    // Statistics and Probability
    | 'chance'
    | 'data-graphs';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface CompletedTask {
  taskId: string;
  completedAt: string;
}

// Victorian Curriculum Year 4 English Categories
// Strand 1: Reading and Viewing
// Strand 2: Writing
// Strand 3: Speaking and Listening (Spelling focus)
export interface EnglishQuestion {
  id: string;
  strand: 'reading' | 'writing' | 'spelling-vocabulary';
  category:
    // Reading and Viewing
    | 'comprehension'
    | 'inference'
    | 'text-structure'
    | 'literary-devices'
    // Writing
    | 'grammar'
    | 'punctuation'
    | 'sentence-structure'
    | 'text-types'
    // Spelling and Vocabulary
    | 'spelling'
    | 'homophones'
    | 'vocabulary'
    | 'word-families';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  passage?: string; // For reading comprehension questions
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export type CategoryType = Task['category'];
export type DifficultyType = MathQuestion['difficulty'];
export type MathCategoryType = MathQuestion['category'];
export type MathStrandType = MathQuestion['strand'];
export type EnglishCategoryType = EnglishQuestion['category'];
export type EnglishStrandType = EnglishQuestion['strand'];
