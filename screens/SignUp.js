import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignUp = async () => {
    setMessage('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setIsError(true);
      setMessage('Please fill in all fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setIsError(true);
      setMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      const user = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      await AsyncStorage.setItem(
        'registeredUser',
        JSON.stringify(user)
      );

      setIsError(false);
      setMessage('Account created successfully!');

      setTimeout(() => {
        onGoToLogin();
      }, 700);
    } catch (error) {
      setIsError(true);
      setMessage('Unable to create account.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.logo}>♥ Smart Health</Text>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Start your healthy lifestyle journey
        </Text>

        <Text style={styles.label}>Username</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {message ? (
          <Text
            style={
              isError
                ? styles.errorMessage
                : styles.successMessage
            }
          >
            {message}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
          </Text>

          <TouchableOpacity onPress={onGoToLogin}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FBF8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#168C72',
    textAlign: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D6E5DF',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  button: {
    backgroundColor: '#168C72',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  errorMessage: {
    color: '#D32F2F',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  successMessage: {
    color: '#168C72',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#666',
  },

  loginLink: {
    color: '#168C72',
    fontWeight: 'bold',
  },
});