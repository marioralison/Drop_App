import { View,Image,Text,TouchableOpacity } from "react-native";


const Notifications = () => {
    return(
        <View className=" flex-col justify-center gap-3">
            <View className=" flex-row items-center justify-around mb-2">
                <TouchableOpacity>
                    <Image source={require("./assets/icons/Back.png")}/>
                </TouchableOpacity>
                <Text className=" font-syne-bold text-3xl">Notifications</Text>
            </View>
            <View className="flex-col justify-center items-center">
                <View className=" flex-col gap-1">
                    <Text className="  font-bold">La commande N°124 a été expédié avec succès</Text>
                    <Text className=" font-semibold text-gray-300">Aujourd'hui 08:24 AM</Text>
                </View>
                <View>W</View>
            </View>
        </View>
    )
}

export default Notifications