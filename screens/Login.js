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

export default function Login({
  onGoToSignUp,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const savedUser = await AsyncStorage.getItem(
        'registeredUser'
      );

      if (!savedUser) {
        setError(
          'No account found. Please create an account first.'
        );
        return;
      }

      const user = JSON.parse(savedUser);

      if (
        user.email !== email.trim().toLowerCase() ||
        user.password !== password
      ) {
        setError('Incorrect email or password.');
        return;
      }

      // Save current logged-in user
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify({
          username: user.username,
          email: user.email,
        })
      );

      onLoginSuccess();
    } catch (error) {
      setError('Unable to login. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.logo}>♥ Smart Health</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Login to continue your health journey
        </Text>

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

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
          </Text>

          <TouchableOpacity onPress={onGoToSignUp}>
            <Text style={styles.signupLink}>
              Sign Up
            </Text>
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

  error: {
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
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

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupText: {
    color: '#666',
  },

  signupLink: {
    color: '#168C72',
    fontWeight: 'bold',
  },
});