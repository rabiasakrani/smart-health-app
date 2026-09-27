import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import Detail from './screens/Detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('signup');
  const [selectedItem, setSelectedItem] = useState(null);

  // LOGIN SCREEN
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

  // HOME SCREEN
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
            console.log('Open menu');
          }}
        />
      </>
    );
  }

  // DETAIL SCREEN
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

  // SIGN UP SCREEN
  return (
    <>
      <StatusBar style="dark" />

      <SignUp
        onGoToLogin={() => setCurrentScreen('login')}
      />
    </>
  );
}