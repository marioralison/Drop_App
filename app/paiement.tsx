import { router } from "expo-router";
import { useState } from "react";
import { Image,Text,View,TextInput,TouchableOpacity,Pressable } from "react-native";

const paiement = () => {
    
    const [numberCard,setNumberCard] = useState("")
    const [expireDate,setExpireDate] = useState("")
    const [cvv,setCvv] = useState("")
    const [nomTitulaire,setNomTitulaire] = useState("")

    const handleGoBack = () => {
        router.back();
    };


    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[20]"> 
            <View className="flex-col gap-[20]">
                <View className="w-full h-[50] flex flex-row justify-between items-center">
                    <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                        <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                    </Pressable>
                    <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Paiement</Text>
                </View>

                <View className=" flex-col gap-5">
                    <View className="w-full flex gap-[8]">
                        <Text className="font-lato-bold text-lg">Total prix</Text>
                        <Text className="text-4xl font-lato-bold">Ar 500000</Text>
                    </View>
                    <View className="w-full flex gap-[8]">
                        <Text className="font-lato-bold text-lg">Paiement par Stripe</Text>
                        <TextInput
                            className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-lg font-lato-regular"
                            placeholder="Email"
                        />
                    </View>
                    <View className="w-full flex flex-row gap-[4%]">
                        <View className="w-[48%] flex gap-[8]">
                            <Text className="font-lato-bold text-lg">Paiement par Stripe</Text>
                            <TextInput
                                className="w-full h-[60] pl-5 border rounded-xl text-lg font-lato-regular"
                                placeholder="Email"
                            />
                        </View>
                        <View className="w-[48%] flex gap-[8]">
                            <Text className="font-lato-bold text-lg">Paiement par Stripe</Text>
                            <TextInput
                                className="w-full h-[60] pl-5 border rounded-xl text-lg font-lato-regular"
                                placeholder="Email"
                            />
                        </View>
                    </View>
                    <View className="w-full flex gap-[8]">
                        <Text className="font-lato-bold text-lg">Paiement par Stripe</Text>
                        <TextInput
                            className="w-full h-[60] pl-5 border rounded-xl text-lg font-lato-regular"
                            placeholder="Email"
                        />
                    </View>
                    <View className="w-full flex gap-[8]">
                        <Text className="font-lato-bold text-lg">Paiement par Stripe</Text>
                        <TextInput
                            className="w-full h-[60] pl-5 border rounded-xl text-lg font-lato-regular"
                            placeholder="Email"
                        />
                    </View>
                </View>
            </View>

            <Pressable onPress={() => router.push('/accueil')} className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
                <Text className="font-lato-bold text-lg">Confirmer</Text>
            </Pressable>
        </View>
    )
}

export default paiement;