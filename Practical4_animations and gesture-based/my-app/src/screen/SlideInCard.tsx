// SlideInCard.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native';

const SlideInCard: React.FC = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  // Derive opacity and translateY from the same animated value
  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0], // Starts 30 units down
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic), // Decelerates — feels like it "settles"
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 600,
        delay: 2000, // Wait for 2 seconds before sliding up
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: opacity,
          transform: [{ translateY: translateY }],
        },
      ]}
    >
      <Text style={styles.title}>New Notification</Text>
      <Text style={styles.body}>Your order has been confirmed!</Text>
    </Animated.View>
  );       
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
});

export default SlideInCard;
