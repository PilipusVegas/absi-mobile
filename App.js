import { useState } from 'react';
import { View } from 'react-native';

import AbsiLogin from './pages/Login';
import AbsiNavigator from './pages/Navigator';

const ABSI = () => {
  const handleLogout = () => {setIsLoggedIn(false)};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {setIsLoggedIn(true)};

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? (
        <AbsiLogin onLoginSuccess={handleLoginSuccess}/>
      ) : (
        <AbsiNavigator onLogout={handleLogout}/>
      )}
    </View>
  );
};
export default ABSI;