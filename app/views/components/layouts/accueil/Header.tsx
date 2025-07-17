import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from 'expo-router';

const HeaderAccueil = () => {

    const router = useRouter()

    return (
        <View className="w-full h-[5%] flex flex-row justify-between items-center">
            <Text className="text-4xl text-blackPrimary font-syne-bold">Dropshop</Text>
            <View className="h-full flex flex-row justify-center items-center gap-[20]">
                <Image source={require("../../../../assets/images/ISPM.png")} className="w-[50] h-[55]" />
                <Pressable onPress={() => router.push("/notification")}>
                    <Image source={require("../../../../assets/icons/Notification.png")} className="w-[30] h-[30]" />
                </Pressable>
            </View>
        </View>
    );
};

export default HeaderAccueil;