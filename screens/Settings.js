import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ onBack }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [healthTips, setHealthTips] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('appSettings');

      if (saved) {
        const data = JSON.parse(saved);
        setDarkMode(data.darkMode ?? false);
        setNotifications(data.notifications ?? true);
        setHealthTips(data.healthTips ?? true);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const data = {
        darkMode,
        notifications,
        healthTips,
      };

      await AsyncStorage.setItem(
        'appSettings',
        JSON.stringify(data)
      );

      setMessage('Settings saved successfully!');
    } catch (error) {
      setMessage('Unable to save settings.');
    }
  };

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >
      <View
        style={[
          styles.header,
          darkMode && styles.darkCard,
        ]}
      >
        <Text style={styles.logo}>♥ Smart Health</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Back to Menu</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            darkMode && styles.darkText,
          ]}
        >
          Settings
        </Text>

        <Text
          style={[
            styles.subtitle,
            darkMode && styles.darkSubText,
          ]}
        >
          Customize your Smart Health experience.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Appearance
        </Text>

        <View
          style={[
            styles.settingCard,
            darkMode && styles.darkCard,
          ]}
        >
          <View>
            <Text
              style={[
                styles.settingTitle,
                darkMode && styles.darkText,
              ]}
            >
              Dark Mode
            </Text>

            <Text
              style={[
                styles.settingText,
                darkMode && styles.darkSubText,
              ]}
            >
              Use a darker app appearance
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Notifications
        </Text>

        <View
          style={[
            styles.settingCard,
            darkMode && styles.darkCard,
          ]}
        >
          <View style={styles.flex}>
            <Text
              style={[
                styles.settingTitle,
                darkMode && styles.darkText,
              ]}
            >
              Notifications
            </Text>

            <Text
              style={[
                styles.settingText,
                darkMode && styles.darkSubText,
              ]}
            >
              Allow health reminders
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Health Preferences
        </Text>

        <View
          style={[
            styles.settingCard,
            darkMode && styles.darkCard,
          ]}
        >
          <View style={styles.flex}>
            <Text
              style={[
                styles.settingTitle,
                darkMode && styles.darkText,
              ]}
            >
              Daily Health Tips
            </Text>

            <Text
              style={[
                styles.settingText,
                darkMode && styles.darkSubText,
              ]}
            >
              Receive useful wellness tips
            </Text>
          </View>

          <Switch
            value={healthTips}
            onValueChange={setHealthTips}
          />
        </View>

        {message ? (
          <Text style={styles.message}>{message}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveSettings}
        >
          <Text style={styles.saveText}>
            Save Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBF8',
  },

  darkContainer: {
    backgroundColor: '#121212',
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 25,
    paddingBottom: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 25,
  },

  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#168C72',
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },

  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  flex: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },

  settingText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  darkCard: {
    backgroundColor: '#242424',
    borderColor: '#444',
  },

  darkText: {
    color: '#FFFFFF',
  },

  darkSubText: {
    color: '#CCCCCC',
  },

  message: {
    color: '#168C72',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: '#168C72',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});