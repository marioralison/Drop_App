import "./global.css";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';

import Welcome from "./welcome";
import { useEffect, useState } from "react";
import { getLocalValue } from "@/helpers/librairy";
import { useRouter } from "expo-router";

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

  const [token,setToken] = useState<string | null>("wait");

  const router = useRouter();
  
  useEffect(() => {
    const checkToken = async () => {
        const tokenUser: string | null = await getLocalValue("token");
        setToken(tokenUser);
    }
    checkToken();
  },[])

  if (!token){
    return (
      <View>
        <Welcome></Welcome>
      </View>
    );
  } else if (token != "wait"){
    router.replace("/accueil");
  }
}