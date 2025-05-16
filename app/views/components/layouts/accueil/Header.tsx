import { View, Text, Image } from "react-native";

const HeaderAccueil = () => {
    return (
        <View className="w-full h-[5%] flex flex-row justify-between items-center">
            <Text className="text-4xl text-blackPrimary font-syne-bold">Dropshop</Text>
            <View className="w-fit h-full flex flex-row justify-center items-center gap-7">
                <Image source={require("../../../../assets/icons/Search.png")} className="w-[30] h-[30]" />
                <Image source={require("../../../../assets/icons/Notification.png")} className="w-[30] h-[30]" />
            </View>
        </View>
    );
};

export default HeaderAccueil;