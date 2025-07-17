import { Slot, usePathname } from "expo-router";
import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import NavigationBottom from "../../app/views/components/navigation";

export default function TabsLayout() {
  const pathname = usePathname();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide from right to left when path changes
    translateX.setValue(500); // Start off-screen to the right
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [pathname]);

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        className="flex-1"
        style={{
          transform: [{ translateX }],
        }}
      >
        <Slot />
      </Animated.View>
      <View className="h-[70] px-4 py-2">
        <NavigationBottom />
      </View>
    </View>
  );
}