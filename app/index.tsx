import "./global.css";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { Stack, Tabs, Link } from 'expo-router';

import Welcome from "./welcome";

export default function Index() {

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
    <View>
        <Welcome></Welcome>
    </View>
  );
}