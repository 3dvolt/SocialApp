import BottomNavBar from "@app/navigation/BottomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { NoNetwork } from "@app/components";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";
import { View, ActivityIndicator, StyleSheet } from "react-native";

function AppContent(): JSX.Element | null {
  const [noNetwork, setNoNetwork] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<'Login' | 'Register' | 'ForgotPassword'>('Login');
  const { user, loading } = useAuth();

  useEffect(() => {
    const networkInfoSubscription = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setNoNetwork(true);
      } else {
        setNoNetwork(false);
      }
    });
    return () => networkInfoSubscription();
  });

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const navigation = {
    navigate: (screen: 'Login' | 'Register' | 'ForgotPassword') => {
      setAuthScreen(screen);
    },
    goBack: () => {
      if (authScreen === 'Register' || authScreen === 'ForgotPassword') {
        setAuthScreen('Login');
      }
    },
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderAuthScreen = () => {
    switch (authScreen) {
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

  return (
    <Fragment>
      {noNetwork ? (
        <NoNetwork />
      ) : (
        <NavigationContainer>
          {user ? <BottomNavBar /> : renderAuthScreen()}
        </NavigationContainer>
      )}
    </Fragment>
  );
}

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
