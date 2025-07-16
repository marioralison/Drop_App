import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { save, getValueFor } from "@/helpers/store.access";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { authentificationUser } from "@/helpers/api";
import { IUser } from "@/helpers/data.type";

export default function Welcome() {

    const router = useRouter();

    const [valueAuth, setValueAuth] = useState<Pick<IUser,"id" | "email" | "role"> | null>(null)

    useEffect(() => {
        const testAuth = async () => {
            setValueAuth(await authentificationUser())
        }
        testAuth();
    }, [])

    return(
        <View className="bg-vert w-full h-full flex justify-between">
            <View className="w-full h-[80%] flex-1 justify-center items-center">
                <Image source={require("./assets/images/ISPM.png")} style={{width: 100, height: 120}}/>
                <Image source={require("./assets/images/welcomeImage.png")} style={{width: 200, height: 400}}/>
                <Text className="text-6xl text-blackPrimary font-syne-bold">
                    DropShop
                </Text>
                <Text className="h-auto w-[75%] font-medium text-blackPrimary text-center mt-4 text-2xl font-syne-regular">
                </Text>
            </View>

            <View className="w-full h-[20%] flex justify-center items-center gap-4">
                <View className="w-[200] h-[60] flex flex-row justify-between items-center gap-4 bg-blackPrimary rounded-full">
                    <Text className="text-white text-2xl ml-[25%] font-syne-regular">Découvrir</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            if (valueAuth) router.push('/accueil');
                            else router.push("/selectAccount")
                        }} 
                    className="w-[46] h-[46] mr-2 flex items-center justify-center bg-white rounded-full">
                        <View className="w-[46] h-[46] mr-2 flex items-center justify-center bg-white rounded-full">
                            <Image source={require("./assets/icons/Right.png")} className="w-[30] h-[30]"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="w-[200] h-[60] flex flex-row justify-between items-center gap-4">
                    <TouchableOpacity onPress={() => router.push('/login')} className="mr-2 flex items-center justify-center">
                        <Text className="text-black text-2xl ml-[25%] font-syne-regular">Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast/>
        </View>
    );
}