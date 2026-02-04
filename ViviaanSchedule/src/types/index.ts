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

export interface MathQuestion {
  id: string;
  category: 'place-value' | 'multiplication' | 'division' | 'fractions' | 'decimals' | 'money' | 'patterns' | 'word-problems';
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
