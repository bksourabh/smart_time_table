import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import type { Task } from '../types';
import { categoryConfig } from '../data/timetable';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  isCurrentTask: boolean;
  onToggle: () => void;
  index: number;
}

export function TaskCard({ task, isCompleted, isCurrentTask, onToggle, index }: TaskCardProps) {
  const config = categoryConfig[task.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onToggle}
      className={`
        relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer
        transition-all duration-300 border-2
        ${isCompleted
          ? 'bg-green-50 border-green-200 opacity-75'
          : `${config.bg} ${config.border}`}
        ${isCurrentTask ? 'ring-4 ring-indigo-400 ring-opacity-50 shadow-lg scale-[1.02]' : ''}
        hover:shadow-lg hover:-translate-y-0.5
      `}
    >
      {/* Current Task Indicator */}
      {isCurrentTask && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          NOW
        </motion.div>
      )}

      {/* Checkbox */}
      <div
        className={`
          flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center
          transition-all duration-300
          ${isCompleted
            ? 'bg-green-500 border-green-500'
            : `border-gray-300 hover:border-indigo-400`}
        `}
      >
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {/* Icon */}
      <div className="flex-shrink-0 text-3xl">
        {task.icon}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Clock className={`w-3.5 h-3.5 ${config.text} opacity-70`} />
          <span className={`text-sm font-medium ${config.text} opacity-80`}>
            {task.time}
          </span>
        </div>
        <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        {task.duration && (
          <span className={`text-xs ${config.text} opacity-70 mt-1 inline-block bg-white/50 px-2 py-0.5 rounded-full`}>
            {task.duration}
          </span>
        )}
      </div>

      {/* Category Badge */}
      <div className={`hidden sm:block flex-shrink-0 text-xs font-medium ${config.text} bg-white/60 px-3 py-1 rounded-full capitalize`}>
        {task.category}
      </div>
    </motion.div>
  );
}
