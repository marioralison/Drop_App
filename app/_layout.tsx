import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";


export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Syne-Regular": require('./assets/fonts/Syne-Regular.ttf'),
    "Syne-Bold": require('./assets/fonts/Syne-Bold.ttf'),
    "Syne-SemiBold": require('./assets/fonts/Syne-SemiBold.ttf'),
    "Lato-Bold": require('./assets/fonts/Lato-Bold.ttf'),
    "Lato-Regular": require('./assets/fonts/Lato-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // Animation entre écrans
      }}
    />
  );
}