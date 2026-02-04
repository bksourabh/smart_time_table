import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskCard } from '../components/TaskCard';
import { CongratulationsBanner } from '../components/CongratulationsBanner';
import { weeklySchedule, getTodaySchedule } from '../data/timetable';
import { DaySchedule, Task } from '../types';

type RootStackParamList = {
  Home: undefined;
  MathsPractice: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const STORAGE_KEY = '@viviaan_completed_tasks';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayAbbrev = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get today's day name
  const getTodayName = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[new Date().getDay()];
  };

  // Load completed tasks from storage
  const loadCompletedTasks = async () => {
    try {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Reset if it's a new day
        if (data.date === today) {
          setCompletedTasks(new Set(data.tasks));
        } else {
          // New day, reset tasks
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ date: today, tasks: [] })
          );
          setCompletedTasks(new Set());
        }
      }
    } catch (error) {
      console.error('Error loading completed tasks:', error);
    }
  };

  // Save completed tasks to storage
  const saveCompletedTasks = async (tasks: Set<string>) => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, tasks: Array.from(tasks) })
      );
    } catch (error) {
      console.error('Error saving completed tasks:', error);
    }
  };

  // Find current task based on time
  const findCurrentTask = (tasks: Task[]) => {
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

        // Find the next task time
        let nextTaskTimeInMinutes = 24 * 60; // End of day
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
  };

  useEffect(() => {
    const today = getTodayName();
    setSelectedDay(today);
    loadCompletedTasks();
  }, []);

  useEffect(() => {
    const schedule = weeklySchedule.find((s) => s.day === selectedDay);
    if (schedule && selectedDay === getTodayName()) {
      const currentId = findCurrentTask(schedule.tasks);
      setCurrentTaskId(currentId);
    } else {
      setCurrentTaskId(null);
    }
  }, [selectedDay]);

  const currentSchedule = weeklySchedule.find((s) => s.day === selectedDay);

  const toggleTask = async (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
      setShowCongrats(false);
    } else {
      newCompleted.add(taskId);
      // Check if all tasks are completed
      if (currentSchedule && newCompleted.size === currentSchedule.tasks.length) {
        setShowCongrats(true);
      }
    }
    setCompletedTasks(newCompleted);
    await saveCompletedTasks(newCompleted);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCompletedTasks();
    setRefreshing(false);
  }, []);

  const getProgress = () => {
    if (!currentSchedule) return 0;
    return (completedTasks.size / currentSchedule.tasks.length) * 100;
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date().toLocaleDateString('en-AU', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Viviaan! 👋</Text>
          <Text style={styles.date}>{formatDate()}</Text>
          <Text style={styles.school}>St Margaret's Berwick Grammar - Grade 4</Text>
        </View>
      </View>

      {/* Maths Practice Button */}
      <TouchableOpacity
        style={styles.mathsButton}
        onPress={() => navigation.navigate('MathsPractice')}
      >
        <Text style={styles.mathsButtonIcon}>🧮</Text>
        <View style={styles.mathsButtonContent}>
          <Text style={styles.mathsButtonTitle}>Maths Practice</Text>
          <Text style={styles.mathsButtonSubtitle}>Year 4 NAPLAN Questions</Text>
        </View>
        <Text style={styles.mathsButtonArrow}>→</Text>
      </TouchableOpacity>

      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
              day === getTodayName() && styles.todayButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}
            >
              {dayAbbrev[index]}
            </Text>
            {day === getTodayName() && (
              <View style={styles.todayDot} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>
            {selectedDay}'s Progress
          </Text>
          <Text style={styles.progressText}>
            {completedTasks.size}/{currentSchedule?.tasks.length || 0} tasks
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${getProgress()}%` }]}
          />
        </View>
      </View>

      {/* Task List */}
      <ScrollView
        style={styles.taskList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {currentSchedule?.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isCompleted={completedTasks.has(task.id)}
            onToggle={() => toggleTask(task.id)}
            isCurrentTask={task.id === currentTaskId}
          />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Congratulations Banner */}
      <CongratulationsBanner
        visible={showCongrats}
        userName="Viviaan"
      />

      {/* Close Congrats Button */}
      {showCongrats && (
        <TouchableOpacity
          style={styles.closeCongratsButton}
          onPress={() => setShowCongrats(false)}
        >
          <Text style={styles.closeCongratsText}>Tap anywhere to close</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  school: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  mathsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mathsButtonIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  mathsButtonContent: {
    flex: 1,
  },
  mathsButtonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mathsButtonSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  mathsButtonArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  daySelector: {
    maxHeight: 60,
    marginBottom: 8,
  },
  daySelectorContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    marginRight: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  selectedDayButton: {
    backgroundColor: '#3F51B5',
  },
  todayButton: {
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  dayButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedDayButtonText: {
    color: 'white',
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5722',
    marginTop: 4,
  },
  progressContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E8EAF6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  taskList: {
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
  closeCongratsButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 1001,
  },
  closeCongratsText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
