import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({ item, onBack }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const details = {
    'Healthy Diet': {
      icon: '🥗',
      title: 'Healthy Diet',
      description:
        'A balanced diet helps your body get the nutrients it needs for good health and energy.',
      tips: [
        'Eat more fruits and vegetables.',
        'Choose whole grains when possible.',
        'Include healthy sources of protein.',
        'Limit foods high in sugar and salt.',
      ],
    },

    Exercise: {
      icon: '🏃',
      title: 'Exercise',
      description:
        'Regular physical activity can support fitness, strength, energy, and overall wellbeing.',
      tips: [
        'Stay active regularly.',
        'Include walking or other aerobic activity.',
        'Add strength exercises to your routine.',
        'Choose activities that you enjoy.',
      ],
    },

    'Water Intake': {
      icon: '💧',
      title: 'Water Intake',
      description:
        'Staying hydrated supports normal body functions and can help you feel refreshed throughout the day.',
      tips: [
        'Drink water regularly during the day.',
        'Keep a water bottle nearby.',
        'Drink more during physical activity.',
        'Pay attention to your hydration needs.',
      ],
    },
  };

  const selectedItem = details[item] || details['Healthy Diet'];

  useEffect(() => {
    checkFavorite();
  }, [item]);

  const checkFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');

      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);

        const exists = favorites.some(
          favorite => favorite.title === selectedItem.title
        );

        setIsFavorite(exists);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');

      let favorites = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      const exists = favorites.some(
        favorite => favorite.title === selectedItem.title
      );

      if (exists) {
        favorites = favorites.filter(
          favorite => favorite.title !== selectedItem.title
        );

        setIsFavorite(false);
      } else {
        favorites.push({
          title: selectedItem.title,
          icon: selectedItem.icon,
          description: selectedItem.description,
        });

        setIsFavorite(true);
      }

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.log('Error saving favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.icon}>
          {selectedItem.icon}
        </Text>

        <Text style={styles.title}>
          {selectedItem.title}
        </Text>

        <Text style={styles.description}>
          {selectedItem.description}
        </Text>

        <Text style={styles.sectionTitle}>
          Healthy Tips
        </Text>

        {selectedItem.tips.map((tip, index) => (
          <View style={styles.tipCard} key={index}>
            <Text style={styles.tipNumber}>
              {index + 1}
            </Text>

            <Text style={styles.tipText}>
              {tip}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={toggleFavorite}
        >
          <Text style={styles.favoriteText}>
            {isFavorite
              ? '♥ Added to Favorites'
              : '♡ Add to Favorites'}
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

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  backText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#168C72',
  },

  icon: {
    fontSize: 65,
    textAlign: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  tipNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#168C72',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 12,
  },

  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
  },

  favoriteButton: {
    backgroundColor: '#168C72',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },

  favoriteButtonActive: {
    backgroundColor: '#126F5B',
  },

  favoriteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});