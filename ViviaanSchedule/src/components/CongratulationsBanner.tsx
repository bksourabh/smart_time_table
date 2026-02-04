import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

interface CongratulationsBannerProps {
  visible: boolean;
  userName: string;
}

export const CongratulationsBanner: React.FC<CongratulationsBannerProps> = ({
  visible,
  userName,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const starAnims = useRef([...Array(8)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      // Main banner animation
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }).start();

      // Rotation for trophy
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Star animations
      starAnims.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 100),
            Animated.timing(anim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const starPositions = [
    { top: 20, left: 30 },
    { top: 40, right: 40 },
    { top: 80, left: 50 },
    { top: 100, right: 60 },
    { bottom: 80, left: 40 },
    { bottom: 60, right: 50 },
    { bottom: 40, left: 70 },
    { bottom: 20, right: 30 },
  ];

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Animated Stars */}
        {starAnims.map((anim, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.star,
              starPositions[index],
              {
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.5],
                    }),
                  },
                ],
              },
            ]}
          >
            ⭐
          </Animated.Text>
        ))}

        {/* Trophy */}
        <Animated.Text
          style={[
            styles.trophy,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          🏆
        </Animated.Text>

        {/* Main Text */}
        <Text style={styles.congratsText}>CONGRATULATIONS!</Text>
        <Text style={styles.nameText}>{userName}</Text>
        <Text style={styles.messageText}>
          You completed all your tasks for today!
        </Text>
        <Text style={styles.subMessageText}>
          You're a superstar! Keep up the great work!
        </Text>

        {/* Celebration Emojis */}
        <View style={styles.emojiRow}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.emoji}>🌟</Text>
          <Text style={styles.emoji}>🎊</Text>
          <Text style={styles.emoji}>💪</Text>
          <Text style={styles.emoji}>🎉</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  star: {
    position: 'absolute',
    fontSize: 24,
  },
  trophy: {
    fontSize: 80,
    marginBottom: 16,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    letterSpacing: 2,
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  messageText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
  },
  subMessageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  emojiRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
});
