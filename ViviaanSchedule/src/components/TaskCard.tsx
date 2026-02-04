import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Task } from '../types';
import { categoryColors } from '../data/timetable';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onToggle: () => void;
  isCurrentTask: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isCompleted,
  onToggle,
  isCurrentTask,
}) => {
  const colors = categoryColors[task.category];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.bg, borderColor: colors.border },
        isCompleted && styles.completedCard,
        isCurrentTask && styles.currentCard,
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.checkboxContainer}>
        <View
          style={[
            styles.checkbox,
            { borderColor: colors.text },
            isCompleted && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
          ]}
        >
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{task.icon}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.time, { color: colors.text }]}>{task.time}</Text>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            isCompleted && styles.completedText,
          ]}
        >
          {task.title}
        </Text>
        {task.duration && (
          <Text style={[styles.duration, { color: colors.text }]}>
            Duration: {task.duration}
          </Text>
        )}
      </View>

      {isCurrentTask && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentBadgeText}>NOW</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  currentCard: {
    borderWidth: 3,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 32,
  },
  contentContainer: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  duration: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  currentBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
