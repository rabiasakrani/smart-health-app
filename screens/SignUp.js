import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SignUp({ onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = () => {
    setError('');
    setSuccess('');

    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSuccess('Account created successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>♥ Smart Health</Text>

      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Start your journey to a healthier lifestyle
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>

        <TouchableOpacity onPress={onGoToLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBF8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#168C72',
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E5DF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  errorText: {
    width: '100%',
    maxWidth: 380,
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },

  successText: {
    width: '100%',
    maxWidth: 380,
    color: '#168C72',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },

  button: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#168C72',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    marginTop: 22,
  },

  loginText: {
    color: '#666',
    fontSize: 14,
  },

  loginLink: {
    color: '#168C72',
    fontSize: 14,
    fontWeight: 'bold',
  },
});