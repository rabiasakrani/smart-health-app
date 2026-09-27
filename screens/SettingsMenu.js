import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function SettingsMenu({
  onBack,
  onProfile,
  onFavorites,
  onQuotes,
  onSettings,
  onReminders,
  onLogout,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>♥ Smart Health</Text>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.home}>⌂ Home</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Menu</Text>

        <Text style={styles.subtitle}>
          Manage your Smart Health account
        </Text>

        <View style={styles.menuCard}>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={onProfile}
          >
            <Text style={styles.icon}>👤</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Profile</Text>
              <Text style={styles.itemText}>
                View your account information
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={onFavorites}
          >
            <Text style={styles.icon}>♥</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                My Favorites
              </Text>
              <Text style={styles.itemText}>
                View your saved health items
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={onQuotes}
          >
            <Text style={styles.icon}>💬</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                Daily Wellness Quote
              </Text>
              <Text style={styles.itemText}>
                Get wellness content from external API
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={onSettings}
          >
            <Text style={styles.icon}>⚙</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                Settings
              </Text>
              <Text style={styles.itemText}>
                Manage app preferences
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={onReminders}
          >
            <Text style={styles.icon}>🔔</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                Daily Reminders
              </Text>
              <Text style={styles.itemText}>
                Configure health notifications
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastItem]}
            onPress={onLogout}
          >
            <Text style={styles.icon}>↪</Text>

            <View style={styles.itemContent}>
              <Text style={styles.logoutTitle}>
                Logout
              </Text>
              <Text style={styles.itemText}>
                Sign out of Smart Health
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.footer}>
          Smart Health App
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#168C72',
  },

  home: {
    color: '#168C72',
    fontSize: 15,
    fontWeight: 'bold',
  },

  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 25,
    paddingBottom: 50,
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

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0ECE7',
    overflow: 'hidden',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    minHeight: 75,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  icon: {
    fontSize: 25,
    width: 45,
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3,
  },

  logoutTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 3,
  },

  itemText: {
    fontSize: 13,
    color: '#777',
  },

  arrow: {
    fontSize: 28,
    color: '#168C72',
    marginLeft: 10,
  },

  footer: {
    textAlign: 'center',
    color: '#999',
    marginTop: 25,
    marginBottom: 20,
  },
});