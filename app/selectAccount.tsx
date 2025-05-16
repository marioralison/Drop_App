import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from 'expo-router';

export default function SelectAccount(){

    const router = useRouter();
    const[selectAccount, setSelectAccount] = useState<"buyer" | "seller" | null>(null)

    const handleGoBack = () => {
        router.back();
    };
    
    return(
        <View className="w-full h-full bg-white p-[25] flex gap-10">
            <Pressable onPress={handleGoBack} className="w-full h-[10%] flex justify-center">
                <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <View className="w-full h-[90%] flex justify-start gap-20">
                <View className="w-[70%]">
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Veuillez créer un compte</Text>
                    <Text className="mt-3 text-xl">Choisir ce que vous voulez devenir, en cliquant une des deux boutons</Text>
                </View>
                <View className="w-full flex gap-10">

                    <Pressable 
                            onPress={() => setSelectAccount(selectAccount === "buyer" ? null : "buyer")}
                            className={`${selectAccount === "buyer" ? 'bg-blackPrimary' : 'bg-none'} flex justify-center items-center border border-blackPrimary px-6 py-5 rounded-xl`}
                        >
                        <Text className={`${selectAccount === "buyer" ? 'text-white' : 'text-blackPrimary'} font-lato-bold text-lg`}>
                            Devenir Acheteur
                        </Text>
                    </Pressable>

                    <Pressable 
                            onPress={() => setSelectAccount(selectAccount === "seller" ? null : "seller")}
                            className={`${selectAccount === "seller" ? 'bg-blackPrimary' : 'bg-none'} flex justify-center items-center border border-blackPrimary px-6 py-5 rounded-xl`}
                        >
                        <Text className={`${selectAccount === "seller" ? 'text-white' : 'text-blackPrimary'} font-lato-bold text-lg`}>
                            Devenir Vendeur
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => router.push('/buyerForm')} className="flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
                        <Text className="font-lato-bold text-lg">Confirmer</Text>
                    </Pressable>

                </View>
            </View>
        </View>
    )
}