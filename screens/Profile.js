import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ onBack }) {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('userDetails');

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log('Error loading user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Back to Menu</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Profile</Text>

        <Text style={styles.subtitle}>
          Your Smart Health account information
        </Text>

        <View style={styles.card}>
          <Text style={styles.avatar}>👤</Text>

          <Text style={styles.name}>
            {user.username || 'Smart Health User'}
          </Text>

          <Text style={styles.email}>
            {user.email || 'No email available'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Account Information
          </Text>

          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>
            {user.username || 'Not available'}
          </Text>

          <View style={styles.line} />

          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.value}>
            {user.email || 'Not available'}
          </Text>
        </View>

        <View style={styles.healthCard}>
          <Text style={styles.infoTitle}>
            Smart Health
          </Text>

          <Text style={styles.description}>
            Your favorites, app preferences and daily reminders
            are available from the Smart Health menu.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBF8',
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 25,
    paddingBottom: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#168C72',
  },

  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 25,
    paddingBottom: 50,
  },

  back: {
    color: '#168C72',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
    marginBottom: 20,
  },

  avatar: {
    fontSize: 65,
    marginBottom: 12,
  },

  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },

  email: {
    fontSize: 15,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0ECE7',
    marginBottom: 20,
  },

  healthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  infoTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },

  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  line: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },

  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});