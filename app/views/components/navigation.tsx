import { View, Image, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function NavigationBottom() {
  const router = useRouter();
  const pathname = usePathname();            // route courante

  const icons = [
    { icon: require("../../assets/icons/HomeGreen.png"),      route: "/accueil" },
    { icon: require("../../assets/icons/ChatBubble.png"),     route: "/chat" },
    { icon: require("../../assets/icons/ShoppingBasket.png"), route: "/panier" },
    { icon: require("../../assets/icons/Cash.png"),           route: "/wallet" },
    { icon: require("../../assets/icons/Delivery.png"),       route: "/delivery" },
  ];

  return (
    <View className="flex-row justify-around items-center bg-zinc-100 rounded-2xl w-full h-full">
      {icons.map((item, index) => {
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            activeOpacity={0.6}
            style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            {/* Conteneur avec fond conditionnel */}
            <View
              style={{
                padding: 6,                       // espace autour de l’icône
                borderRadius: 12,                 // arrondi
                backgroundColor: isActive ? "#C9D856" /* vert-500 */ : "transparent",
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