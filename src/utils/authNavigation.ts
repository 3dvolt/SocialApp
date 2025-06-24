export const authNavigation = {
  navigate: (screen: string) => {
    // This will be implemented when we have proper navigation
    console.log(`Navigate to: ${screen}`);
  },
  goBack: () => {
    console.log('Go back');
  },
};

// Simple navigation ref for auth screens
export const createAuthNavigationRef = () => {
  let currentScreen = 'Login';
  let onScreenChange: ((screen: string) => void) | null = null;

  return {
    navigate: (screen: string) => {
      currentScreen = screen;
      if (onScreenChange) {
        onScreenChange(screen);
      }
    },
    goBack: () => {
      // Simple back navigation logic
      if (currentScreen === 'Register' || currentScreen === 'ForgotPassword') {
        currentScreen = 'Login';
        if (onScreenChange) {
          onScreenChange('Login');
        }
      }
    },
    getCurrentScreen: () => currentScreen,
    setOnScreenChange: (callback: (screen: string) => void) => {
      onScreenChange = callback;
    },
  };
}; 