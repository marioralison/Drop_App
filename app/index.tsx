import "./global.css";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { Stack, Tabs, Link } from 'expo-router';

import Welcome from "./welcome";
import SelectAccount from "./selectAccount";
import BuyerForm from "./buyerForm";
import OnboardBuyer from "./onboardBuyer";
import Seller from "./views/Seller/Seller";
import Accueil from "./accueil";

export default function Index() {
  // Chargement de la police avant d'afficher l'ui
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