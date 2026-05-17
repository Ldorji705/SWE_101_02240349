import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MoveRightBox: React.FC = () => {
  // Step 1: Create a shared value for the horizontal offset
  const offset = useSharedValue(0);

  // Step 2: Create an animated style that uses the shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const moveRight = () => {
    // withTiming smoothly animates to the new value
    offset.value = withTiming(200, { duration: 500 });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <TouchableOpacity style={styles.button} onPress={moveRight}>
        <Text style={styles.buttonText}>Move Right</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#FFA02E',
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MoveRightBox;