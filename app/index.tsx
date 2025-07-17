import "./global.css";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { Stack, Tabs, Link, router } from 'expo-router';

import Welcome from "./welcome";

import Chat from "./(tabs)/chat";
import SelectAccount from "./selectAccount";
import BuyerForm from "./buyerForm";
import OnboardBuyer from "./onboardBuyer";
import Seller from "./views/Seller/Seller";
import Accueil from "./(tabs)/accueil";
import Delivery from "./(tabs)/delivery";
import AddWallet from "./addWallet";

import Details from "./details";
import OrderTracking from "./orderTracking";
import WalletForm from "./walletForm";
import Notifications from "./notification";
import UserProfile from "./userProfile";
import LocalProducts from "./localProduct";


//import Panier from "./panier";


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
        {/* <Message></Message> */}
        {/* <Welcome></Welcome> */}
        {/* <OrderTracking></OrderTracking> */}
        {/* <AddWallet></AddWallet> */}
        {/* <WalletForm></WalletForm> */}
        {/* <Panier></Panier> */}
        {/* <Notifications></Notifications> */}

        {/* <Details></Details> */}
        {/* <UserProfile></UserProfile> */}
        {/* <LocalProducts></LocalProducts> */}
         {/* <Accueil></Accueil> */}
        <TouchableOpacity onPress={() => router.push("/accueil")} className="flex items-center justify-center h-full">
          <Text className="text-2xl text-center font-syne-bold">Démarrer</Text>
        
        </TouchableOpacity>
         

    </View>
  );
}