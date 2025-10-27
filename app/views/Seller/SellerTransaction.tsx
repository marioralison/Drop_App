import { View,Text,Image, TouchableOpacity,ScrollView } from "react-native";
import SellerNaviagtion from "./SellerNavigation";
import { dataArticles } from "../../data/articles";
import { useRouter } from "expo-router";
import { useState } from "react";

const SellerTransaction = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    
    return(
        <View className=" flex flex-col h-screen gap-3 p-2 pt-4 m-3">
            <View className="flex flex-row items-center gap-4 pb-4">
                <TouchableOpacity
                    onPress={() => {router.back() as any}}
                >
                    <Image source={require("../../assets/icons/Back.png")} className="size-8"/>
                </TouchableOpacity>
                <Text className="font-syne-semiBold text-3xl">Portefeuille</Text>
            </View>
            <View className=" flex flex-col gap-4 justify-around h-auto bg-vert rounded-xl p-5 px-5 mx-3">
                <View className="w-full flex justify-between bg-vert rounded-3xl">
                    <Text className="font-lato-bold text-white text-lg">Balance du compte</Text>
                    <View className="w-full h-[100] flex flex-row justify-start items-center">
                        <Text className="w-[90%] font-lato-bold text-white text-5xl">
                            {isVisible ? "MGA 200 000" : "••••••••"}
                        </Text>
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            {isVisible ? 
                                <Image source={require("../../assets/icons/EyeClosed.png")} className="w-[30] h-[30]" /> :
                                <Image source={require("../../assets/icons/Eye.png")} className="w-[30] h-[30]" />
                            }
                        </TouchableOpacity>
                    </View>

                    <View className="w-full flex flex-row justify-start items-center">
                        <View className="w-[50%] flex flex-col items-start justify-center">
                            <Text className="font-lato-bold text-white text-lg">N° Compte</Text>
                            <Text className="font-lato-bold text-black text-lg">**** **** **** 2546</Text>
                        </View>
                        <View className="w-[50%] flex flex-col items-end justify-center">
                            <Text className="font-lato-bold text-white text-lg">Titulaire compte</Text>
                            <Text className="font-lato-bold text-black text-lg">Mario Ralison</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="border mx-3 flex justify-center bg-black items-center py-4 rounded-xl">
                <TouchableOpacity>
                    <Text className="font-lato-bold text-white ">Retirer de l'argent</Text>
                </TouchableOpacity>
            </View>
            <View className="h-full px-2 pt-4">
                <Text className=" text-gray-400 font-lato-bold text-lg">Transaction faites</Text>
                <ScrollView >
                        {dataArticles.map((item,index) => (
                            <View key={index} className=" flex flex-row items-center rounded-lg justify-between p-1 ">
                                <View className=" flex flex-row gap-1 items-center">
                                    <Image className=" size-20" source={require("../../assets/images/agraffeuse.png")}/>
                                    <View className=" flex flex-col  gap-0.5">
                                        <Text className=" font-lato-bold text-lg">{item.name}</Text>
                                        <Text className="font-syne-regular"> Nom acheteur : {item.acheteur}</Text>
                                    </View>
                                </View>
                                <View className=" flex flex-col gap-0.5 ">
                                    <Text className="ml-auto font-lato-bold">MGA {item.price}</Text>
                                    <Text className="font-syne-regular text-gray-500">28 Octobre 2025</Text>
                                </View>
                            </View>
                        ))}
                </ScrollView>
            </View>
            <SellerNaviagtion></SellerNaviagtion>
        </View>
    )
}

export default SellerTransaction