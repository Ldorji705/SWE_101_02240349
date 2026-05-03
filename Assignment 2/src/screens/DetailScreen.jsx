import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Animated, SafeAreaView, TouchableOpacity, StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import { tasks } from '../data/mockData';

const PRIORITY_COLORS = {
  high: '#FF6584',
  medium: '#F7971E',
  low: '#43C6AC'
};

export default function DetailScreen({ route, navigation }) {
  const { item, type } = route.params;

  const [subjectTasks, setSubjectTasks] = useState(
    type === 'subject' ? tasks.filter(t => t.subject === item.name) : []
  );

  const [taskDone, setTaskDone] = useState(type === 'task' ? item.done : false);

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const toggleTask = (id) => {
    setSubjectTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const pressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const pressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#6C63FF" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO CARD */}
        <Animated.View style={[
          styles.heroCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            borderColor: type === 'subject'
              ? item.color
              : PRIORITY_COLORS[item.priority]
          }
        ]}>

          {type === 'subject' ? (
            <>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={40}
                color={item.color}
              />
              <Text style={styles.heroTitle}>{item.name}</Text>
              <Text style={styles.heroSub}>
                {item.completed}/{item.tasks} completed
              </Text>

              <View style={{ marginTop: 16 }}>
                <ProgressBar
                  progress={item.progress}
                  color={item.color}
                  height={10}
                  showLabel
                />
              </View>
            </>
          ) : (
            <>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: PRIORITY_COLORS[item.priority] }
              ]}>
                <Text style={styles.priorityText}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.heroTitle}>{item.title}</Text>

              <Text style={styles.heroSub}>
                <Ionicons name="time-outline" size={14} /> {item.due}
              </Text>
            </>
          )}
        </Animated.View>

        {/* SUBJECT TASK LIST */}
        {type === 'subject' && (
          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}>
            <Text style={styles.sectionTitle}>Tasks</Text>

            {subjectTasks.map((t, i) => (
              <Animated.View
                key={t.id}
                style={{
                  transform: [{ scale: pressAnim }]
                }}
              >
                <TouchableOpacity
                  onPressIn={pressIn}
                  onPressOut={pressOut}
                  onPress={() => toggleTask(t.id)}
                  style={[styles.taskRow, t.done && styles.taskRowDone]}
                >
                  <View style={[
                    styles.taskCheck,
                    t.done && {
                      backgroundColor: item.color,
                      borderColor: item.color
                    }
                  ]}>
                    {t.done && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={[
                      styles.taskTitle,
                      t.done && styles.strike
                    ]}>
                      {t.title}
                    </Text>

                    <Text style={styles.taskDue}>
                      <Ionicons name="calendar-outline" size={12} /> {t.due}
                    </Text>
                  </View>

                  <MaterialCommunityIcons
                    name="flag"
                    size={16}
                    color={PRIORITY_COLORS[t.priority]}
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>
        )}

        {/* TASK DETAILS */}
        {type === 'task' && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailsBox}>
              <DetailRow icon="book" label="Subject" value={item.subject} />
              <DetailRow icon="calendar" label="Due" value={item.due} />
              <DetailRow icon="flag" label="Priority" value={item.priority} />
              <DetailRow
                icon="check-circle"
                label="Status"
                value={taskDone ? 'Completed' : 'In Progress'}
              />
            </View>

            <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
              <TouchableOpacity
                onPressIn={pressIn}
                onPressOut={pressOut}
                style={[styles.doneBtn, taskDone && styles.doneBtnActive]}
                onPress={() => setTaskDone(v => !v)}
              >
                <Ionicons
                  name={taskDone ? "checkmark-circle" : "ellipse-outline"}
                  size={18}
                  color="#FFF"
                />
                <Text style={styles.doneBtnText}>
                  {taskDone ? 'Completed' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <MaterialCommunityIcons name={icon} size={16} color="#888" />
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A', paddingHorizontal: 20 },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10
  },

  backText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600'
  },

  heroCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    borderWidth: 1.5
  },

  heroTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10
  },

  heroSub: {
    color: '#888',
    marginTop: 6
  },

  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  priorityText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700'
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10
  },

  taskRowDone: { opacity: 0.6 },

  taskCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskTitle: {
    color: '#FFF',
    fontWeight: '600'
  },

  strike: {
    textDecorationLine: 'line-through',
    color: '#888'
  },

  taskDue: {
    color: '#888',
    fontSize: 12,
    marginTop: 2
  },

  detailsBox: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3E'
  },

  detailLabel: { color: '#888' },
  detailValue: { color: '#FFF', fontWeight: '600' },

  doneBtn: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C63FF',
    padding: 16,
    borderRadius: 14,
    marginTop: 20
  },

  doneBtnActive: {
    backgroundColor: '#6C63FF'
  },

  doneBtnText: {
    color: '#FFF',
    fontWeight: '700'
  }
});