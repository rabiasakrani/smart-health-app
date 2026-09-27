import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Favorites from './screens/Favorites';
import SettingsMenu from './screens/SettingsMenu';
import Settings from './screens/Settings';
import DailyQuotes from './screens/DailyQuotes';
import DailyReminders from './screens/DailyReminders';
import Profile from './screens/Profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('signup');
  const [selectedItem, setSelectedItem] = useState(null);

  // =========================
  // SIGN UP
  // =========================
  if (currentScreen === 'signup') {
    return (
      <>
        <StatusBar style="dark" />

        <SignUp
          onGoToLogin={() => setCurrentScreen('login')}
        />
      </>
    );
  }

  // =========================
  // LOGIN
  // =========================
  if (currentScreen === 'login') {
    return (
      <>
        <StatusBar style="dark" />

        <Login
          onGoToSignUp={() => setCurrentScreen('signup')}
          onLoginSuccess={() => setCurrentScreen('home')}
        />
      </>
    );
  }

  // =========================
  // HOME
  // =========================
  if (currentScreen === 'home') {
    return (
      <>
        <StatusBar style="dark" />

        <Home
          onOpenDetail={(item) => {
            setSelectedItem(item);
            setCurrentScreen('detail');
          }}
          onOpenMenu={() => {
            setCurrentScreen('menu');
          }}
          onOpenQuotes={() => {
            setCurrentScreen('quotes');
          }}
        />
      </>
    );
  }

  // =========================
  // DETAIL
  // =========================
  if (currentScreen === 'detail') {
    return (
      <>
        <StatusBar style="dark" />

        <Detail
          item={selectedItem}
          onBack={() => setCurrentScreen('home')}
        />
      </>
    );
  }

  // =========================
  // SETTINGS MENU
  // =========================
  if (currentScreen === 'menu') {
    return (
      <>
        <StatusBar style="dark" />

        <SettingsMenu
          onBack={() => setCurrentScreen('home')}

          onProfile={() => {
            setCurrentScreen('profile');
          }}

          onFavorites={() => {
            setCurrentScreen('favorites');
          }}

          onQuotes={() => {
            setCurrentScreen('quotes');
          }}

          onSettings={() => {
            setCurrentScreen('settings');
          }}

          onReminders={() => {
            setCurrentScreen('reminders');
          }}

          onLogout={async () => {
            try {
              // Remove only current login session.
              // Registered account remains saved.
              await AsyncStorage.removeItem('userDetails');

              setSelectedItem(null);
              setCurrentScreen('login');
            } catch (error) {
              console.log('Logout error:', error);

              setSelectedItem(null);
              setCurrentScreen('login');
            }
          }}
        />
      </>
    );
  }

  // =========================
  // PROFILE
  // =========================
  if (currentScreen === 'profile') {
    return (
      <>
        <StatusBar style="dark" />

        <Profile
          onBack={() => setCurrentScreen('menu')}
        />
      </>
    );
  }

  // =========================
  // FAVORITES
  // =========================
  if (currentScreen === 'favorites') {
    return (
      <>
        <StatusBar style="dark" />

        <Favorites
          onBack={() => setCurrentScreen('menu')}
        />
      </>
    );
  }

  // =========================
  // SETTINGS
  // =========================
  if (currentScreen === 'settings') {
    return (
      <>
        <StatusBar style="dark" />

        <Settings
          onBack={() => setCurrentScreen('menu')}
        />
      </>
    );
  }

  // =========================
  // EXTERNAL API
  // DAILY WELLNESS QUOTE
  // =========================
  if (currentScreen === 'quotes') {
    return (
      <>
        <StatusBar style="dark" />

        <DailyQuotes
          onBack={() => setCurrentScreen('menu')}
        />
      </>
    );
  }

  // =========================
  // DAILY REMINDERS
  // =========================
  if (currentScreen === 'reminders') {
    return (
      <>
        <StatusBar style="dark" />

        <DailyReminders
          onBack={() => setCurrentScreen('menu')}
        />
      </>
    );
  }

  // =========================
  // FALLBACK
  // =========================
  return (
    <>
      <StatusBar style="dark" />

      <SignUp
        onGoToLogin={() => setCurrentScreen('login')}
      />
    </>
  );
}