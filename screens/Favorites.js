import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites({ onBack }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  const removeFavorite = async (title) => {
    try {
      const updatedFavorites = favorites.filter(
        (item) => item.title !== title
      );

      setFavorites(updatedFavorites);

      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log('Error removing favorite:', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Favorites</Text>

        <Text style={styles.subtitle}>
          Your saved health items are stored for future visits.
        </Text>

        {/* EMPTY FAVORITES */}
        {favorites.length === 0 ? (
          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>♡</Text>

            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>

            <Text style={styles.emptyText}>
              Add health items to your favorites from the detail screen.
            </Text>

          </View>
        ) : (

          /* SAVED FAVORITES */
          favorites.map((item, index) => (
            <View style={styles.card} key={index}>

              <Text style={styles.cardIcon}>
                {item.icon}
              </Text>

              <View style={styles.cardContent}>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardText}>
                  {item.description}
                </Text>

                <TouchableOpacity
                  onPress={() => removeFavorite(item.title)}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

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
    marginBottom: 20,
  },

  backText: {
    color: '#168C72',
    fontSize: 17,
    fontWeight: 'bold',
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
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  cardIcon: {
    fontSize: 38,
    marginRight: 15,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },

  removeText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 'bold',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE7',
  },

  emptyIcon: {
    fontSize: 50,
    color: '#168C72',
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

});