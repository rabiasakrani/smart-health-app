import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Home({ onOpenDetail, onOpenMenu }) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>

        <TouchableOpacity onPress={onOpenMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.welcome}>Welcome!</Text>

        <Text style={styles.subtitle}>
          Your health journey starts here.
        </Text>

        <Text style={styles.sectionTitle}>
          Health Dashboard
        </Text>

        {/* Healthy Diet */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => onOpenDetail('Healthy Diet')}
        >
          <Text style={styles.cardIcon}>🥗</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Healthy Diet</Text>
            <Text style={styles.cardText}>
              Discover healthy eating tips and nutrition guidance.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Exercise */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => onOpenDetail('Exercise')}
        >
          <Text style={styles.cardIcon}>🏃</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Exercise</Text>
            <Text style={styles.cardText}>
              Stay active with simple daily exercise recommendations.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Water */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => onOpenDetail('Water Intake')}
        >
          <Text style={styles.cardIcon}>💧</Text>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Water Intake</Text>
            <Text style={styles.cardText}>
              Keep track of healthy hydration habits.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#168C72',
  },

  menuIcon: {
    fontSize: 30,
    color: '#168C72',
    fontWeight: 'bold',
  },

  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 25,
  },

  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  cardIcon: {
    fontSize: 35,
    marginRight: 15,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },

  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  arrow: {
    fontSize: 32,
    color: '#168C72',
    marginLeft: 10,
  },
});