import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const PRIORITY_COLORS = {
  high:   '#FF6584',
  medium: '#F7971E',
  low:    '#43C6AC',
};

export default function TaskCard({ task, onPress, onToggle }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    if (onToggle) onToggle(task.id);
  };

  return (
    <TouchableOpacity onPress={() => onPress && onPress(task)} activeOpacity={0.85}>
      <View style={[styles.card, task.done && styles.cardDone]}>
        <View style={[styles.stripe, { backgroundColor: PRIORITY_COLORS[task.priority] }]} />
        <View style={styles.info}>
          <Text style={[styles.title, task.done && styles.strikethrough]} numberOfLines={1}>
            {task.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.subject}>{task.subject}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.due}>Due: {task.due}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleToggle} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Animated.View style={[
            styles.checkbox,
            task.done && styles.checkboxDone,
            { transform: [{ scale: scaleAnim }] },
          ]}>
            {task.done && <Text style={styles.checkmark}>✓</Text>}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:          { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E2E', borderRadius: 14, marginVertical: 6, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  cardDone:      { opacity: 0.6 },
  stripe:        { width: 5, alignSelf: 'stretch' },
  info:          { flex: 1, paddingVertical: 14, paddingHorizontal: 14 },
  title:         { color: '#FFFFFF', fontSize: 15, fontWeight: '600', marginBottom: 4 },
  strikethrough: { textDecorationLine: 'line-through', color: '#888' },
  meta:          { flexDirection: 'row', alignItems: 'center' },
  subject:       { color: '#6C63FF', fontSize: 12, fontWeight: '500' },
  dot:           { color: '#555', marginHorizontal: 6, fontSize: 12 },
  due:           { color: '#888', fontSize: 12 },
  checkbox:      { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#6C63FF', marginRight: 16, alignItems: 'center', justifyContent: 'center' },
  checkboxDone:  { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  checkmark:     { color: '#FFF', fontSize: 14, fontWeight: '700' },
});