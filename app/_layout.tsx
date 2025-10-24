import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen"; // Pour gérer le splash screen
// Éviter le splash screen jusqu'aux fonts chargées
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
"Syne-Regular": require("./assets/fonts/Syne-Regular.ttf"),
"Syne-Bold": require("./assets/fonts/Syne-Bold.ttf"),
"Syne-SemiBold": require("./assets/fonts/Syne-SemiBold.ttf"),
"Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
"Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
});

if (!fontsLoaded) {
return <ActivityIndicator size="large" color="#0000ff" />;
}
  // Cacher le splash une fois fonts chargées
  SplashScreen.hideAsync();
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Masque les headers par défaut (ajustez si besoin)
        contentStyle: { backgroundColor: "#fff" }, // Style global
      }}
    >
      {/* Écrans : Ajoutez-les selon votre structure */}
      <Stack.Screen name="chat" options={{ title: "Chat" }} />
    </Stack>
  );
}
