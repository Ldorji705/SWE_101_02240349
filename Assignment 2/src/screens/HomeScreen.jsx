import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Animated, SafeAreaView, StatusBar, Pressable
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TaskCard from '../components/TaskCard';
import { tasks, stats, userProfile } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const [taskList, setTaskList] = useState(tasks);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(progressAnim, {
        toValue: stats.overallProgress,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start();
  }, []);

  const handleToggle = (id) => {
    setTaskList(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const handleTaskPress = (task) => {
    navigation.navigate('Detail', { item: task, type: 'task' });
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const todayTasks = taskList.filter(
    t => t.due === 'Today' || t.due === 'Tomorrow'
  );

  const completedCount = taskList.filter(t => t.done).length;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <Animated.View style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <View>
            <Text style={styles.greeting}>Good morning </Text>
            <Text style={styles.name}>{userProfile.name}</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userProfile.avatar}</Text>
          </View>
        </Animated.View>

        {/* STATS */}
        <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
          <StatCard icon="check-circle" value={stats.tasksCompletedThisWeek} label="Tasks" />
          <StatCard icon="clock-outline" value={stats.studyHoursThisWeek + 'h'} label="Hours" />
          <StatCard icon="fire" value={userProfile.streak} label="Streak" />
        </Animated.View>

        {/* PROGRESS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>

          <View style={styles.progressBarBg}>
            <Animated.View style={[
              styles.progressBarFill,
              { width: progressWidth }
            ]}/>
          </View>
        </View>

        {/* TASKS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <Text style={styles.badge}>
              {completedCount}/{taskList.length}
            </Text>
          </View>

          {todayTasks.map(task => (
            <Animated.View
              key={task.id}
              style={{ transform: [{ scale: scaleAnim }] }}
            >
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <TaskCard
                  task={task}
                  onPress={handleTaskPress}
                  onToggle={handleToggle}
                />
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* WELCOME CARD */}
        <Animated.View style={[
          styles.welcomeCard,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <MaterialCommunityIcons name="rocket-launch" size={60} color="#6C63FF" />
          <Text style={styles.title}>You're doing great </Text>
          <Text style={styles.subtitle}>
            Stay consistent and finish your goals today.
          </Text>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const StatCard = ({ icon, value, label }) => (
  <View style={styles.statCard}>
    <MaterialCommunityIcons name={icon} size={22} color="#6C63FF" />
    <Text style={styles.statNumber}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A', paddingHorizontal: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },

  greeting: { color: '#888' },
  name: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },

  avatar: {
    backgroundColor: '#1E1E2E',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatarText: { fontSize: 20 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  statCard: {
    backgroundColor: '#1E1E2E',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '30%'
  },

  statNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6
  },

  statLabel: {
    color: '#888',
    fontSize: 12
  },

  section: { marginBottom: 25 },

  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  progressBarBg: {
    height: 10,
    backgroundColor: '#1E1E2E',
    borderRadius: 10,
    overflow: 'hidden'
  },

  progressBarFill: {
    height: 10,
    backgroundColor: '#6C63FF'
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  badge: {
    backgroundColor: '#6C63FF',
    color: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 10
  },

  welcomeCard: {
    backgroundColor: '#1E1E2E',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center'
  },

  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15
  },

  subtitle: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 8
  }
});