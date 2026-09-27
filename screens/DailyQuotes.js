import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function DailyQuotes({ onBack }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

      if (!response.ok) {
        throw new Error('Unable to load quote');
      }

      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      setError(
        'Unable to fetch wellness quote. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Daily Wellness Quote
        </Text>

        <Text style={styles.subtitle}>
          Get fresh motivation from an external API.
        </Text>

        <View style={styles.card}>
          {loading ? (
            <>
              <ActivityIndicator size="large" />
              <Text style={styles.loading}>
                Loading quote...
              </Text>
            </>
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <>
              <Text style={styles.quote}>
                “{quote}”
              </Text>

              <Text style={styles.author}>
                — {author}
              </Text>

              <Text style={styles.success}>
                Quote loaded successfully
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={fetchQuote}
        >
          <Text style={styles.buttonText}>
            Get New Quote
          </Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 'bold',
    fontSize: 16,
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
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 30,
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  quote: {
    fontSize: 20,
    color: '#333',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: '600',
  },

  author: {
    marginTop: 20,
    fontSize: 15,
    color: '#666',
  },

  success: {
    color: '#168C72',
    marginTop: 20,
    fontWeight: 'bold',
  },

  loading: {
    marginTop: 15,
    color: '#666',
  },

  error: {
    color: '#D32F2F',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#168C72',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});