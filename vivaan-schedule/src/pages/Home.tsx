import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Trophy, Calendar } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { Congratulations } from '../components/Congratulations';
import { weeklySchedule, getTodayName } from '../data/timetable';
import { useTodayStorage } from '../hooks/useLocalStorage';
import type { Task } from '../types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayAbbrev = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function findCurrentTask(tasks: Task[]): string | null {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const timeMatch = task.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();

      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      const taskTimeInMinutes = hours * 60 + minutes;

      let nextTaskTimeInMinutes = 24 * 60;
      if (i + 1 < tasks.length) {
        const nextTimeMatch = tasks[i + 1].time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (nextTimeMatch) {
          let nextHours = parseInt(nextTimeMatch[1]);
          const nextMinutes = parseInt(nextTimeMatch[2]);
          const nextPeriod = nextTimeMatch[3].toUpperCase();

          if (nextPeriod === 'PM' && nextHours !== 12) nextHours += 12;
          if (nextPeriod === 'AM' && nextHours === 12) nextHours = 0;

          nextTaskTimeInMinutes = nextHours * 60 + nextMinutes;
        }
      }

      if (currentTimeInMinutes >= taskTimeInMinutes && currentTimeInMinutes < nextTaskTimeInMinutes) {
        return task.id;
      }
    }
  }
  return null;
}

export function Home() {
  const today = getTodayName();
  const [selectedDay, setSelectedDay] = useState(today);
  const [completedTasks, setCompletedTasks] = useTodayStorage<string[]>('vivaan_tasks', []);
  const [showCongrats, setShowCongrats] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const currentSchedule = weeklySchedule.find((s) => s.day === selectedDay);

  useEffect(() => {
    if (currentSchedule && selectedDay === today) {
      setCurrentTaskId(findCurrentTask(currentSchedule.tasks));
      const interval = setInterval(() => {
        setCurrentTaskId(findCurrentTask(currentSchedule.tasks));
      }, 60000);
      return () => clearInterval(interval);
    } else {
      setCurrentTaskId(null);
    }
  }, [selectedDay, currentSchedule, today]);

  const toggleTask = (taskId: string) => {
    let newCompleted: string[];
    if (completedTasks.includes(taskId)) {
      newCompleted = completedTasks.filter((id) => id !== taskId);
      setShowCongrats(false);
    } else {
      newCompleted = [...completedTasks, taskId];
      if (currentSchedule && newCompleted.length === currentSchedule.tasks.length) {
        setShowCongrats(true);
      }
    }
    setCompletedTasks(newCompleted);
  };

  const progress = currentSchedule
    ? (completedTasks.length / currentSchedule.tasks.length) * 100
    : 0;

  const formatDate = () => {
    return new Date().toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hello, Vivaan! 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">{formatDate()}</p>
              <p className="text-gray-400 text-xs mt-0.5 italic">
                St Margaret's Berwick Grammar - Grade 4
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">
                  {completedTasks.length} done
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Maths Practice Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/maths"
            className="block mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8" />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold">Maths Practice</h2>
                <p className="text-white/80 text-sm">Year 4 NAPLAN Questions</p>
              </div>
              <div className="text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </Link>
        </motion.div>

        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
        >
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${selectedDay === day
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}
                ${day === today ? 'ring-2 ring-orange-400 ring-offset-2' : ''}
              `}
            >
              <span className="text-sm">{dayAbbrev[index]}</span>
              {day === today && (
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedDay}'s Progress
              </h2>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {completedTasks.length}/{currentSchedule?.tasks.length || 0} tasks
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-600 font-medium mt-3 flex items-center justify-center gap-2"
            >
              <span>🎉</span> All tasks completed! Amazing work!
            </motion.p>
          )}
        </motion.div>

        {/* Task List */}
        <div className="space-y-3">
          {currentSchedule?.tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={completedTasks.includes(task.id)}
              isCurrentTask={task.id === currentTaskId}
              onToggle={() => toggleTask(task.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Padding */}
        <div className="h-20" />
      </main>

      {/* Congratulations Modal */}
      <Congratulations
        visible={showCongrats}
        userName="Vivaan"
        onClose={() => setShowCongrats(false)}
      />
    </div>
  );
}
