import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Info</Text>
        <Text>Name: Lhundup Dorji</Text>
        <Text>Email: lhundup@email.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text>Theme: Light</Text>
        <Text>Notifications: Enabled</Text>
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
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
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  buttonArea: {
    marginTop: 10,
    alignItems: 'center',
  },
});