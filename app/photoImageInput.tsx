import { router } from "expo-router";
import { Pressable, Image } from "react-native";
import { View, Text } from "react-native";

export default function PhotoImageInput() {
    return(
        <View className="w-full h-full bg-white flex flex-col items-center justify-between p-[25]">
            <View className="w-full flex-1 border flex gap-10">
                <Pressable className="w-full h-[10%] flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <View>
                    <View className="border">
                        <Text>Ajouter image</Text>
                    </View>
                </View>
            </View>
            <View className="w-full mt-10 border">
                <Pressable 
                    onPress={() => {
                        router.push("/onboardBuyer")
                    }}
                    className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl"
                >
                    <Text className="font-lato-bold text-lg">Confirmer</Text>
                    
                </Pressable> 
            </View>
        </View>
    )
}