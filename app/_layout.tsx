
import '../global.css';
// import {
//   Poppins_400Regular,
//   useFonts,
//   Poppins_700Bold,
//   Poppins_600SemiBold,
// } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import AuthProvider from '~/contexts/auth-provider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    smRegular: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // {/* This is Status bar is custom layout that's why need to wrap it in <> </>  */}
    <>
    <StatusBar hidden={true} />
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="movies/[id]" />
      <Stack.Screen name="(tabs)" />
    </Stack>
        </>
  );
};

export default RootLayout;
