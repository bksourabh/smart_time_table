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
  difficulty: 'easy' | 'medium' | 'hard';
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

export type CategoryType = Task['category'];
export type DifficultyType = MathQuestion['difficulty'];
export type MathCategoryType = MathQuestion['category'];
export type MathStrandType = MathQuestion['strand'];
