import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, useWindowDimensions } from 'react-native';

export default function Dashboard({ navigation }) {
  const { width } = useWindowDimensions();

  // breakpoint
  const isWide = width >= 600;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.subtitle}>
        This layout changes based on screen size.
      </Text>

      <View style={[styles.cardContainer, isWide && styles.row]}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Card 1</Text>
          <Text>Responsive using flex</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Card 2</Text>
          <Text>Stacks or aligns in row</Text>
        </View>
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
  },
  buttonArea: {
    marginTop: 20,
    alignItems: 'center',
  },
});