import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyReminders({ onBack }) {
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState('Drink Water');
  const [time, setTime] = useState('09:00 AM');
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const saved = await AsyncStorage.getItem('reminders');

      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading reminders:', error);
    }
  };

  const saveReminders = async (data) => {
    setReminders(data);

    await AsyncStorage.setItem(
      'reminders',
      JSON.stringify(data)
    );
  };

  const addReminder = async () => {
    if (!title.trim() || !time.trim()) {
      setMessage('Please enter reminder title and time.');
      return;
    }

    const newReminder = {
      id: Date.now().toString(),
      title,
      time,
    };

    const updated = [...reminders, newReminder];

    await saveReminders(updated);

    setMessage('Reminder configured successfully!');
  };

  const deleteReminder = async (id) => {
    const updated = reminders.filter(
      reminder => reminder.id !== id
    );

    await saveReminders(updated);
    setMessage('Reminder deleted.');
  };

  const testNotification = () => {
    if (!enabled) {
      setMessage('Enable notifications first.');
      return;
    }

    setMessage(
      `🔔 Test Notification: ${title} - ${time}`
    );
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

        <Text style={styles.title}>
          Daily Reminders
        </Text>

        <View style={styles.switchCard}>
          <View>
            <Text style={styles.settingTitle}>
              Notifications
            </Text>

            <Text style={styles.settingText}>
              Enable daily health reminders
            </Text>
          </View>

          <Switch
            value={enabled}
            onValueChange={setEnabled}
          />
        </View>

        <Text style={styles.label}>
          Reminder Title
        </Text>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Drink Water"
        />

        <Text style={styles.label}>
          Reminder Time
        </Text>

        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="09:00 AM"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={addReminder}
        >
          <Text style={styles.buttonText}>
            Add Reminder
          </Text>
        </TouchableOpacity>

        {message ? (
          <View style={styles.messageCard}>
            <Text style={styles.message}>
              {message}
            </Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>
          Your Reminders
        </Text>

        {reminders.length === 0 ? (
          <Text style={styles.empty}>
            No reminders configured yet.
          </Text>
        ) : (
          reminders.map(reminder => (
            <View
              style={styles.reminderCard}
              key={reminder.id}
            >
              <View style={styles.flex}>
                <Text style={styles.reminderTitle}>
                  🔔 {reminder.title}
                </Text>

                <Text style={styles.reminderTime}>
                  {reminder.time}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  deleteReminder(reminder.id)
                }
              >
                <Text style={styles.delete}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.testButton}
          onPress={testNotification}
        >
          <Text style={styles.testText}>
            Send Test Notification
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
    marginBottom: 25,
  },

  switchCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
    marginBottom: 20,
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

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E5DF',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#168C72',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  messageCard: {
    backgroundColor: '#E8F5F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  message: {
    color: '#126F5B',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },

  empty: {
    color: '#777',
    marginBottom: 20,
  },

  reminderCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  flex: {
    flex: 1,
  },

  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  reminderTime: {
    color: '#666',
    marginTop: 4,
  },

  delete: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },

  testButton: {
    borderWidth: 2,
    borderColor: '#168C72',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  testText: {
    color: '#168C72',
    fontWeight: 'bold',
    fontSize: 16,
  },
});