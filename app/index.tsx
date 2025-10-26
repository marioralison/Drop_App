import "./global.css";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';

// import Seller from "./views/Seller/Seller";
// import Accueil from "./accueil";
// import Delivery from "./delivery";
// import AddWallet from "./addWallet";
import Details from "./details";
// import OrderTracking from "./orderTracking";
// import WalletForm from "./walletForm";
// import Notifications from "./notification";
// import UserProfile from "./userProfile";
import LocalProducts from "./localProduct";
import SelllerDashBoard from "./SellerDashboard";
import AddPublictionSeller from "./views/Seller/addPublicationSeller";
import SellerProfile from "./views/Seller/SellerProfile";
import SellerNaviagtion from "./views/Seller/SellerNavigation";


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
    <View className="h-screen">
        {/* <Details></Details> */}
        {/* <UserProfile></UserProfile> */}
        {/* <LocalProducts></LocalProducts> */}
        {/* <Seller></Seller> */}
        {/* <AddPublictionSeller></AddPublictionSeller> */}
        {/* <SellerProfile></SellerProfile> */}
        {/* <SellerNaviagtion></SellerNaviagtion> */}
        <SelllerDashBoard></SelllerDashBoard>
    </View>
  );
}

