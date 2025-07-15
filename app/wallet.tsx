import { View, Pressable, Image, Text, TextInput } from "react-native"
import { useRouter } from 'expo-router';

export default function Wallet() {

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[10]">

            <View className="w-full h-[7%] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Portefeuille</Text>
            </View>

            <View className="w-full h-[92%] flex gap-[2%]">
                <View className="w-full flex justify-between p-[20] bg-vert rounded-3xl">
                    <Text className="font-lato-bold text-white text-lg">Balance du compte</Text>
                    <View className="w-full h-[100] flex flex-row justify-start items-center">
                        <Text className="w-[90%] font-lato-bold text-white text-6xl">$45,687.52</Text>
                        <Image source={require("./assets/icons/Eye.png")} className="w-[30] h-[30]"/>
                    </View>
                    <View className="w-full flex flex-row justify-start items-center">
                        <View className="w-[50%] flex flex-col items-start justify-center">
                            <Text className="font-lato-bold text-white text-lg">N° Compte</Text>
                            <Text className="font-lato-bold text-black text-lg">**** **** **** 2546</Text>
                        </View>
                        <View className="w-[50%] flex flex-col items-end justify-center">
                            <Text className="font-lato-bold text-white text-lg">N° Compte</Text>
                            <Text className="font-lato-bold text-black text-lg">**** **** **** 2546</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full gap-[8] text-xl font-lato-regular">
                    <Pressable onPress={() => router.push('/accueil')} className="w-full h-[60] flex justify-center items-center bg-blackPrimary px-6 py-5 rounded-xl">
                        <Text className="font-lato-bold text-white text-lg">Retirer argent</Text>
                    </Pressable>
                    <Pressable className="w-full h-[60] flex flex-row justify-center items-center gap-[10] px-6 py-5 rounded-xl">
                        <Image source={require("./assets/icons/left-right.png")} className="w-[30] h-[30]"/>
                        <Text className="font-lato-bold text-lg text-black">Changer portefeuille</Text>
                    </Pressable>
                </View>

                <View className="w-full h-[auto] text-xl font-lato-regular gap-[10]">
                    <View className="w-full flex flex-row justify-between items-center">
                        <Text className="font-lato-bold text-black text-lg">Transaction faites</Text>
                        <Text className="font-lato-bold text-black text-lg text-right">Voir plus</Text>
                    </View>

                    <View className="w-full flex flex-col justify-center items-center gap-[10]">
                        <View className="w-full p-[10] flex flex-row items-center">
                            <View className="w-[20%]">
                                <Image source={require("../app/assets/icons/user.png")} className="w-[55] h-[55]" />
                            </View>
                            <View className="w-[80%] h-full flex flex-row justify-between items-center">
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl">Transaction faites</Text>
                                    <Text className="font-lato-bold text- text-lg">Nom vendeur</Text>
                                </View>
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl text-right">$450</Text>
                                    <Text className="font-lato-bold text-black text-lg text-right">Mar 21, 2025</Text>
                                </View>
                            </View>
                        </View>
                        <View className="w-full p-[10] flex flex-row items-center">
                            <View className="w-[20%]">
                                <Image source={require("../app/assets/icons/user.png")} className="w-[55] h-[55]" />
                            </View>
                            <View className="w-[80%] h-full flex flex-row justify-between items-center">
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl">Transaction faites</Text>
                                    <Text className="font-lato-bold text- text-lg">Nom vendeur</Text>
                                </View>
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl text-right">$450</Text>
                                    <Text className="font-lato-bold text-black text-lg text-right">Mar 21, 2025</Text>
                                </View>
                            </View>
                        </View>
                        <View className="w-full p-[10] flex flex-row items-center">
                            <View className="w-[20%]">
                                <Image source={require("../app/assets/icons/user.png")} className="w-[55] h-[55]" />
                            </View>
                            <View className="w-[80%] h-full flex flex-row justify-between items-center">
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl">Transaction faites</Text>
                                    <Text className="font-lato-bold text- text-lg">Nom vendeur</Text>
                                </View>
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl text-right">$450</Text>
                                    <Text className="font-lato-bold text-black text-lg text-right">Mar 21, 2025</Text>
                                </View>
                            </View>
                        </View>
                        <View className="w-full p-[10] flex flex-row items-center">
                            <View className="w-[20%]">
                                <Image source={require("../app/assets/icons/user.png")} className="w-[55] h-[55]" />
                            </View>
                            <View className="w-[80%] h-full flex flex-row justify-between items-center">
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl">Transaction faites</Text>
                                    <Text className="font-lato-bold text- text-lg">Nom vendeur</Text>
                                </View>
                                <View className="flex flex-col">
                                    <Text className="font-lato-bold text-black text-2xl text-right">$450</Text>
                                    <Text className="font-lato-bold text-black text-lg text-right">Mar 21, 2025</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}