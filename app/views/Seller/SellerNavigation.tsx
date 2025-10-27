import { View, Image, TouchableOpacity,Text } from "react-native";
import { useRouter, usePathname } from "expo-router";


export default function SellerNaviagtion() {
  const router = useRouter();
  const pathname = usePathname();    
          // route courante

  const icons = [
    { icon: require("../../assets/icons/HomeGreen.png"),      route: "/views/Seller/sellerDashboard" },
    { icon: require("../../assets/icons/ChatBubble.png"),     route: "/views/Seller/SellerMessage" },
    { icon: require("../../assets/icons/Cash.png"),           route: "/views/Seller/SellerTransaction" },
    { icon: require("../../assets/icons/user.png"),       route: "/views/Seller/SellerProfile" },
  ];

  return (
    <View className="flex-row justify-around bottom-5 items-center absolute bg-gray-100 rounded-2xl w-full h-20">
      {icons.map((item, index) => {
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={index}
            // onPress={() => router.push(item.route)}
            onPress={() => {router.push(item.route as any)}}
            activeOpacity={0.6}
            style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <View
              style={{
                padding: 6,                   
                borderRadius: 12,              
                backgroundColor: isActive ? "#C9D856" : "transparent",
              }}
            >
              <Image source={item.icon} style={{ width: 30, height: 30 }} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}