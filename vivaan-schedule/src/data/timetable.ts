import type { DaySchedule, CategoryType } from '../types';

export const weeklySchedule: DaySchedule[] = [
  {
    day: 'Monday',
    tasks: [
      { id: 'mon-1', time: '6:30 AM', title: 'Wake up, freshen up', category: 'morning', icon: '🌅' },
      { id: 'mon-2', time: '6:45 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'mon-3', time: '7:05 AM', title: 'Drop Mum to station', category: 'family', icon: '🚗' },
      { id: 'mon-4', time: '7:15 AM', title: 'Back home, get ready', category: 'morning', icon: '👕' },
      { id: 'mon-5', time: '7:40 AM', title: 'Leave for school', category: 'school', icon: '🎒' },
      { id: 'mon-6', time: '8:00 AM - 3:00 PM', title: 'SCHOOL', category: 'school', icon: '🏫' },
      { id: 'mon-7', time: '3:00 PM', title: 'Electronics Club', category: 'skill', icon: '🔌' },
      { id: 'mon-8', time: '4:00 PM', title: 'Pickup, home by 4:20', category: 'family', icon: '🏠' },
      { id: 'mon-9', time: '4:30 PM', title: 'Snack + Rest', category: 'rest', icon: '🍎' },
      { id: 'mon-10', time: '5:00 PM', title: 'Maths Study', category: 'study', duration: '60 min', icon: '📐' },
      { id: 'mon-11', time: '6:00 PM', title: 'Outdoor Play OR Computer games', category: 'play', icon: '🎮' },
      { id: 'mon-12', time: '6:30 PM', title: 'Piano Practice', category: 'skill', duration: '30 min', icon: '🎹' },
      { id: 'mon-13', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'mon-14', time: '7:30 PM', title: 'Book Reading', category: 'study', duration: '30 min', icon: '📚' },
      { id: 'mon-15', time: '8:00 PM', title: 'Wind down, shower', category: 'rest', icon: '🚿' },
      { id: 'mon-16', time: '8:30 PM', title: 'Bedtime routine, sleep', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Tuesday',
    tasks: [
      { id: 'tue-1', time: '6:30 AM', title: 'Wake up, freshen up', category: 'morning', icon: '🌅' },
      { id: 'tue-2', time: '6:45 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'tue-3', time: '7:05 AM', title: 'Get ready for school', category: 'morning', icon: '👕' },
      { id: 'tue-4', time: '7:15 AM', title: 'Pack bag, get ready', category: 'morning', icon: '🎒' },
      { id: 'tue-5', time: '7:40 AM', title: 'Leave for school', category: 'school', icon: '🚌' },
      { id: 'tue-6', time: '8:00 AM - 3:00 PM', title: 'SCHOOL', category: 'school', icon: '🏫' },
      { id: 'tue-7', time: '3:00 PM', title: 'Chess Club', category: 'skill', icon: '♟️' },
      { id: 'tue-8', time: '4:00 PM', title: 'Pickup, home by 4:20', category: 'family', icon: '🏠' },
      { id: 'tue-9', time: '4:30 PM', title: 'Snack + Rest', category: 'rest', icon: '🍎' },
      { id: 'tue-10', time: '5:00 PM', title: 'English Study', category: 'study', duration: '60 min', icon: '📝' },
      { id: 'tue-11', time: '6:00 PM', title: 'Outdoor Play OR Computer games', category: 'play', icon: '🎮' },
      { id: 'tue-12', time: '6:30 PM', title: 'Drawing Practice', category: 'skill', duration: '30 min', icon: '🎨' },
      { id: 'tue-13', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'tue-14', time: '7:30 PM', title: 'Typing Practice', category: 'skill', icon: '⌨️' },
      { id: 'tue-15', time: '8:00 PM', title: 'Wind down, shower', category: 'rest', icon: '🚿' },
      { id: 'tue-16', time: '8:30 PM', title: 'Bedtime routine, sleep', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Wednesday',
    tasks: [
      { id: 'wed-1', time: '6:30 AM', title: 'Wake up, freshen up', category: 'morning', icon: '🌅' },
      { id: 'wed-2', time: '6:45 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'wed-3', time: '7:05 AM', title: 'Drop Mum to station', category: 'family', icon: '🚗' },
      { id: 'wed-4', time: '7:15 AM', title: 'Back home, get ready', category: 'morning', icon: '👕' },
      { id: 'wed-5', time: '7:40 AM', title: 'Leave for school', category: 'school', icon: '🎒' },
      { id: 'wed-6', time: '8:00 AM - 3:00 PM', title: 'SCHOOL', category: 'school', icon: '🏫' },
      { id: 'wed-7', time: '3:00 PM', title: 'Pickup, home by 3:20', category: 'family', icon: '🏠' },
      { id: 'wed-8', time: '3:30 PM', title: 'Snack + Rest', category: 'rest', icon: '🍎' },
      { id: 'wed-9', time: '4:00 PM', title: 'Outdoor Play with friends', category: 'play', icon: '⚽' },
      { id: 'wed-10', time: '5:00 PM', title: 'Drawing or Coding basics', category: 'skill', icon: '🎨' },
      { id: 'wed-11', time: '6:00 PM', title: 'English Study', category: 'study', duration: '60 min', icon: '📝' },
      { id: 'wed-12', time: '6:30 PM', title: 'Piano Practice', category: 'skill', duration: '30 min', icon: '🎹' },
      { id: 'wed-13', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'wed-14', time: '7:30 PM', title: 'Family Board Game', category: 'family', icon: '🎲' },
      { id: 'wed-15', time: '8:00 PM', title: 'Wind down, shower', category: 'rest', icon: '🚿' },
      { id: 'wed-16', time: '8:30 PM', title: 'Bedtime routine, sleep', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Thursday',
    tasks: [
      { id: 'thu-1', time: '6:30 AM', title: 'Wake up, freshen up', category: 'morning', icon: '🌅' },
      { id: 'thu-2', time: '6:45 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'thu-3', time: '7:05 AM', title: 'Get ready for school', category: 'morning', icon: '👕' },
      { id: 'thu-4', time: '7:15 AM', title: 'Pack bag, get ready', category: 'morning', icon: '🎒' },
      { id: 'thu-5', time: '7:40 AM', title: 'Leave for school', category: 'school', icon: '🚌' },
      { id: 'thu-6', time: '8:00 AM - 3:00 PM', title: 'SCHOOL', category: 'school', icon: '🏫' },
      { id: 'thu-7', time: '3:00 PM', title: 'School ends, waiting for pickup', category: 'school', icon: '⏳' },
      { id: 'thu-8', time: '4:30 PM', title: 'Pickup, home by 4:50', category: 'family', icon: '🏠' },
      { id: 'thu-9', time: '4:50 PM', title: 'Snack + Rest', category: 'rest', icon: '🍎' },
      { id: 'thu-10', time: '5:00 PM', title: 'Get ready for Tennis', category: 'morning', icon: '🎾' },
      { id: 'thu-11', time: '5:30 PM', title: 'Leave for Tennis (Berwick)', category: 'skill', icon: '🚗' },
      { id: 'thu-12', time: '6:00 PM', title: 'TENNIS LESSON', category: 'skill', duration: '30 min', icon: '🎾' },
      { id: 'thu-13', time: '6:30 PM', title: 'Tennis ends, head home', category: 'family', icon: '🏠' },
      { id: 'thu-14', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'thu-15', time: '7:30 PM', title: 'Light reading / relax', category: 'rest', icon: '📖' },
      { id: 'thu-16', time: '8:00 PM', title: 'Wind down, shower', category: 'rest', icon: '🚿' },
      { id: 'thu-17', time: '8:30 PM', title: 'Bedtime routine, sleep', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Friday',
    tasks: [
      { id: 'fri-1', time: '6:30 AM', title: 'Wake up, freshen up', category: 'morning', icon: '🌅' },
      { id: 'fri-2', time: '6:45 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'fri-3', time: '7:05 AM', title: 'Drop Mum to station', category: 'family', icon: '🚗' },
      { id: 'fri-4', time: '7:15 AM', title: 'Back home, get ready', category: 'morning', icon: '👕' },
      { id: 'fri-5', time: '7:40 AM', title: 'Leave for school', category: 'school', icon: '🎒' },
      { id: 'fri-6', time: '8:00 AM - 3:00 PM', title: 'SCHOOL', category: 'school', icon: '🏫' },
      { id: 'fri-7', time: '3:00 PM', title: 'Pickup, home by 3:20', category: 'family', icon: '🏠' },
      { id: 'fri-8', time: '3:30 PM', title: 'Snack + Rest', category: 'rest', icon: '🍎' },
      { id: 'fri-9', time: '4:00 PM', title: 'Outdoor Play with friends', category: 'play', icon: '⚽' },
      { id: 'fri-10', time: '5:00 PM', title: 'Maths Study', category: 'study', duration: '60 min', icon: '📐' },
      { id: 'fri-11', time: '6:00 PM', title: 'Computer games / Free play', category: 'play', icon: '🎮' },
      { id: 'fri-12', time: '6:30 PM', title: 'Book Reading', category: 'study', duration: '30 min', icon: '📚' },
      { id: 'fri-13', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'fri-14', time: '7:30 PM', title: 'Drawing Practice', category: 'skill', duration: '30 min', icon: '🎨' },
      { id: 'fri-15', time: '8:00 PM', title: 'Family Movie / Games', category: 'family', icon: '🎬' },
      { id: 'fri-16', time: '9:00 PM', title: 'Bedtime (Weekend)', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Saturday',
    tasks: [
      { id: 'sat-1', time: '7:30 AM', title: 'Wake up naturally, relax', category: 'morning', icon: '🌅' },
      { id: 'sat-2', time: '8:00 AM', title: 'Breakfast: Milk, Egg, Almonds', category: 'meal', icon: '🍳' },
      { id: 'sat-3', time: '8:15 AM', title: 'Help with simple chores', category: 'skill', icon: '🧹' },
      { id: 'sat-4', time: '8:30 AM', title: 'Cooking basics with parent', category: 'skill', icon: '👨‍🍳' },
      { id: 'sat-5', time: '9:45 AM', title: 'Maths Study', category: 'study', duration: '60 min', icon: '📐' },
      { id: 'sat-6', time: '10:45 AM', title: 'Computer games', category: 'play', duration: '1 hour', icon: '🎮' },
      { id: 'sat-7', time: '11:45 AM', title: 'Snack break', category: 'meal', icon: '🍎' },
      { id: 'sat-8', time: '12:00 PM', title: 'Outdoor play with friends / Cycling', category: 'play', icon: '🚴' },
      { id: 'sat-9', time: '1:00 PM', title: 'Lunch', category: 'meal', icon: '🍽️' },
      { id: 'sat-10', time: '1:45 PM', title: 'Get ready for Parkour', category: 'morning', icon: '🤸' },
      { id: 'sat-11', time: '2:10 PM', title: 'Leave for Parkour (Risky Kids)', category: 'skill', icon: '🚗' },
      { id: 'sat-12', time: '2:30 PM', title: 'PARKOUR LESSON', category: 'skill', duration: '45 min', icon: '🤸' },
      { id: 'sat-13', time: '3:35 PM', title: 'Arrive home', category: 'family', icon: '🏠' },
      { id: 'sat-14', time: '4:00 PM', title: 'English Study', category: 'study', duration: '60 min', icon: '📝' },
      { id: 'sat-15', time: '5:15 PM', title: 'Outdoor play / Bike ride', category: 'play', icon: '🚴' },
      { id: 'sat-16', time: '6:00 PM', title: 'Piano Practice', category: 'skill', duration: '30 min', icon: '🎹' },
      { id: 'sat-17', time: '6:30 PM', title: 'Family time / Games', category: 'family', icon: '🎲' },
      { id: 'sat-18', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'sat-19', time: '7:30 PM', title: 'Family movie or board games', category: 'family', icon: '🎬' },
      { id: 'sat-20', time: '8:30 PM', title: 'Wind down, shower', category: 'rest', icon: '🚿' },
      { id: 'sat-21', time: '9:00 PM', title: 'Bedtime (Weekend)', category: 'rest', icon: '😴' },
    ],
  },
  {
    day: 'Sunday',
    tasks: [
      { id: 'sun-1', time: '7:30 AM', title: 'Wake up, freshen up quickly', category: 'morning', icon: '🌅' },
      { id: 'sun-2', time: '8:00 AM', title: 'Light breakfast, get ready', category: 'meal', icon: '🍞' },
      { id: 'sun-3', time: '8:15 AM', title: 'Leave for swimming', category: 'skill', icon: '🚗' },
      { id: 'sun-4', time: '8:30 AM', title: "SWIMMING LESSON (Splash's)", category: 'skill', duration: '30 min', icon: '🏊' },
      { id: 'sun-5', time: '9:00 AM', title: 'Swimming ends, leave pool', category: 'skill', icon: '🏊' },
      { id: 'sun-6', time: '9:45 AM', title: 'Arrive home, proper breakfast', category: 'meal', icon: '🍳' },
      { id: 'sun-7', time: '10:30 AM', title: 'FAMILY HIKING / Nature Outing', category: 'family', icon: '🥾' },
      { id: 'sun-8', time: '12:00 PM', title: 'Picnic lunch outdoors OR head home', category: 'meal', icon: '🧺' },
      { id: 'sun-9', time: '1:00 PM', title: 'Return home / Rest', category: 'rest', icon: '🏠' },
      { id: 'sun-10', time: '1:45 PM', title: 'English Study', category: 'study', duration: '60 min', icon: '📝' },
      { id: 'sun-11', time: '3:15 PM', title: 'Study complete, break', category: 'rest', icon: '☕' },
      { id: 'sun-12', time: '3:35 PM', title: 'Money management basics', category: 'skill', icon: '💰' },
      { id: 'sun-13', time: '4:00 PM', title: 'Computer games with friends online', category: 'play', icon: '🎮' },
      { id: 'sun-14', time: '5:00 PM', title: 'Book reading', category: 'study', duration: '30 min', icon: '📚' },
      { id: 'sun-15', time: '5:30 PM', title: 'Drawing Practice', category: 'skill', duration: '30 min', icon: '🎨' },
      { id: 'sun-16', time: '6:00 PM', title: 'Prepare for school week', category: 'morning', icon: '🎒' },
      { id: 'sun-17', time: '6:30 PM', title: 'Family time', category: 'family', icon: '👨‍👩‍👦' },
      { id: 'sun-18', time: '7:00 PM', title: 'Family Dinner', category: 'meal', icon: '🍽️' },
      { id: 'sun-19', time: '7:30 PM', title: 'Light activity, wind down', category: 'rest', icon: '🧘' },
      { id: 'sun-20', time: '8:30 PM', title: 'Shower, bedtime routine', category: 'rest', icon: '🚿' },
      { id: 'sun-21', time: '9:00 PM', title: 'Bedtime (school night)', category: 'rest', icon: '😴' },
    ],
  },
];

export const categoryConfig: Record<CategoryType, { bg: string; text: string; border: string; gradient: string }> = {
  morning: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-400 to-amber-500' },
  school: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-400 to-indigo-500' },
  study: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-400 to-pink-500' },
  play: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', gradient: 'from-green-400 to-emerald-500' },
  skill: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', gradient: 'from-yellow-400 to-orange-500' },
  family: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', gradient: 'from-pink-400 to-rose-500' },
  meal: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'from-amber-400 to-yellow-500' },
  rest: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', gradient: 'from-cyan-400 to-teal-500' },
};

export const getDaySchedule = (dayName: string): DaySchedule | undefined => {
  return weeklySchedule.find(
    (schedule) => schedule.day.toLowerCase() === dayName.toLowerCase()
  );
};

export const getTodaySchedule = (): DaySchedule | undefined => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return getDaySchedule(today);
};

export const getTodayName = (): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};
