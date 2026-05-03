import React, { useEffect, useRef } from 'react';
import {
  View, Text, ScrollView,
  TouchableOpacity, Animated,
  StyleSheet, SafeAreaView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import { subjects } from '../data/mockData';

function SubjectCard({ subject, onPress, index }) {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 100;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true
      }),
      Animated.timing(progressAnim, {
        toValue: subject.progress,
        duration: 800,
        delay,
        useNativeDriver: false
      })
    ]).start();
  }, []);

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ]
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(subject)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.card}
      >
        <View style={[styles.accent, { backgroundColor: subject.color }]} />

        <View style={styles.cardContent}>
          
          {/* HEADER */}
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={26}
              color={subject.color}
            />

            <View style={styles.cardInfo}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.taskCount}>
                {subject.completed}/{subject.tasks} tasks
              </Text>
            </View>

            <Text style={[styles.percent, { color: subject.color }]}>
              {subject.progress}%
            </Text>
          </View>

          {/* ANIMATED PROGRESS */}
          <View style={styles.progressBg}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: widthInterpolate,
                  backgroundColor: subject.color
                }
              ]}
            />
          </View>

        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function CategoriesScreen({ navigation }) {
  const handleSubjectPress = (subject) =>
    navigation.navigate('Detail', { item: subject, type: 'subject' });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="library" size={60} color="#6C63FF" />
          <Text style={styles.title}>Subjects</Text>
          <Text style={styles.subtitle}>
            Track your progress & stay consistent
          </Text>
        </View>

        {/* LIST */}
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onPress={handleSubjectPress}
            index={index}
          />
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    paddingHorizontal: 20
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10
  },

  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 10
  },

  subtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center'
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2E',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',

    // depth
    shadowColor: '#6C63FF',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },

  accent: {
    width: 5
  },

  cardContent: {
    flex: 1,
    padding: 16
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  cardInfo: {
    flex: 1,
    marginLeft: 10
  },

  subjectName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700'
  },

  taskCount: {
    color: '#888',
    fontSize: 12,
    marginTop: 2
  },

  percent: {
    fontSize: 16,
    fontWeight: '700'
  },

  progressBg: {
    height: 6,
    backgroundColor: '#2A2A3E',
    borderRadius: 6,
    overflow: 'hidden'
  },

  progressFill: {
    height: 6,
    borderRadius: 6
  }
});