import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function ProgressBar({ progress = 0, color = '#6C63FF', height = 8, showLabel = false }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 800,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange:  [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            { height, width: widthInterpolated, backgroundColor: color },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color }]}>{progress}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  track:     { flex: 1, backgroundColor: '#2A2A3E', borderRadius: 99, overflow: 'hidden' },
  fill:      { borderRadius: 99 },
  label:     { marginLeft: 10, fontSize: 13, fontWeight: '700', minWidth: 36, textAlign: 'right' },
});