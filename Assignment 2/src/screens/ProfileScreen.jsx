import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Switch,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userProfile, stats } from '../data/mockData';

/* ICON */
const Icon = ({ name, color = '#888' }) => (
  <Ionicons name={name} size={18} color={color} style={{ marginRight: 10 }} />
);

/* STAT */
function StatBubble({ value, label, color, icon }) {
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.statBubble, { transform: [{ scale }] }]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

/* ROW */
function Row({ icon, label, value, children, last }) {
  const press = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(press, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(press, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: press }] }}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
          <View style={styles.rowLeft}>
            <Icon name={icon} />
            <Text style={styles.label}>{label}</Text>
          </View>
          {children || <Text style={styles.infoValue}>{value}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [reminders, setReminders] = useState(false);

  /* Animations */
  const avatar = useRef(new Animated.Value(0.6)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // CLEAN SEQUENCE (THIS IS THE FIX)
    Animated.parallel([
      Animated.spring(avatar, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* PROFILE */}
        <Animated.View style={[styles.profileCard, { opacity: fade }]}>
          <Animated.View style={[styles.avatar, { transform: [{ scale: avatar }] }]}>
            <Ionicons name="person-circle" size={44} color="#6C63FF" />
          </Animated.View>

          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.sub}>
            {userProfile.year} · {userProfile.university}
          </Text>

          <View style={styles.badge}>
            <Ionicons name="trophy" size={14} color="#F7971E" />
            <Text style={styles.badgeText}>{userProfile.rank}</Text>
          </View>
        </Animated.View>

        {/* STATS */}
        <Animated.View style={[styles.statsRow, { opacity: fade }]}>
          <StatBubble value={userProfile.streak} label="Streak" color="#FF6584" icon="flame" />
          <StatBubble value={userProfile.totalPoints} label="Points" color="#6C63FF" icon="star" />
          <StatBubble value={stats.overallProgress + '%'} label="Progress" color="#43C6AC" icon="trending-up" />
        </Animated.View>

        {/* SETTINGS */}
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.card}>
            <Row icon="notifications-outline" label="Notifications">
              <Switch value={notifications} onValueChange={setNotifications} />
            </Row>

            <Row icon="moon-outline" label="Dark Mode">
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </Row>

            <Row icon="alarm-outline" label="Study Reminders" last>
              <Switch value={reminders} onValueChange={setReminders} />
            </Row>
          </View>
        </Animated.View>

        {/* ABOUT */}
        <Animated.View style={{ opacity: fade, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.card}>
            <Row icon="phone-portrait-outline" label="Version" value="1.0.0" />
            <Row icon="checkmark-done-outline" label="Tasks" value="8" />
            <Row icon="book-outline" label="Subjects" value="6" last />
          </View>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES (UNCHANGED) */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },

  profileCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 26,
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#2A2A3E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  name: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  sub: { color: '#888', marginBottom: 12 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2A2A3E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: { color: '#F7971E', fontWeight: '600' },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  statBubble: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  statLabel: { color: '#888', fontSize: 11 },

  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3E',
  },

  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  label: { color: '#FFF', fontSize: 15 },
  infoValue: { color: '#888' },
});