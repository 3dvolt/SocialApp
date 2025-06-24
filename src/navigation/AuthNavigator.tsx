import React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Simple auth navigator without stack navigator dependency
const AuthNavigator: React.FC<{ currentScreen: string; navigation: any }> = ({ 
  currentScreen, 
  navigation 
}) => {
  switch (currentScreen) {
    case 'Login':
      return <LoginScreen navigation={navigation} />;
    case 'Register':
      return <RegisterScreen navigation={navigation} />;
    case 'ForgotPassword':
      return <ForgotPasswordScreen navigation={navigation} />;
    default:
      return <LoginScreen navigation={navigation} />;
  }
};

export default AuthNavigator; 