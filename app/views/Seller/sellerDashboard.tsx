import { View,Text,Image,ScrollView, TouchableOpacity } from "react-native";
import { dataArticles } from "@/app/data/articles";
import SellerNaviagtion from "./SellerNavigation";
import { router } from "expo-router";

const SelllerDashBoard = () => {
    
    return(
        <View className=" flex relative flex-col h-full gap-6 p-4 pt-5 m-2">
            <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-4">
                    <Image className="w-14 h-14 rounded-full border" source={require("../../assets/images/vendeur1.png")}/>
                    <View>
                        <Text className="font-syne-bold  text-base">Iannis Guerra</Text>
                        <Text className="font-lato-regular text-gray-500  text-xs">Antananarivo,Madagascar</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => router.push("/views/Seller/addPublicationSeller")}
                    className="bg-black px-4 py-2 rounded-xl"
                >
                    <Text className="text-white font-lato-regular text-lg">Ajout article</Text>
                </TouchableOpacity>
            </View>
            <View className=" flex flex-col gap-3">
                <View className=" flex flex-col gap-5 rounded-xl px-4 bg-vert py-4">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="font-syne-bold text-2xl">Ventes aujourd'hui</Text>
                        <View className=" w-7 h-7 bg-black rounded-full"></View>
                    </View>
                    <Text className="font-syne-semiBold text-4xl">250 000 MGA</Text>
                </View>
                <View className="flex flex-col gap-5 rounded-xl px-4 bg-gray-200 py-4">
                    <View className=" flex flex-row items-center justify-between">
                        <Text className="font-syne-bold text-2xl">Chiffres d'affaires</Text>
                        <View className=" w-7 h-7 bg-black rounded-full"></View>
                    </View>
                    <Text className="font-syne-semiBold text-4xl">3 500 000 MGA</Text>
                </View>
            </View>
            <View className="flex flex-col gap-3 rounded-xl py-3">
                <Text className="font-lato-bold text-lg pl-2">Ventes recentes</Text>
                <ScrollView className="h-full flex overflow-y-auto">
                    {dataArticles.map((item,index) => (
                        <View key={index} className=" flex flex-row items-center rounded-lg justify-between px-4 bg-gray-50 mb-4">
                            <View className="flex flex-row items-center gap-4">
                                <Image className="size-20" source={require("../../assets/images/agraffeuse.png")}/>
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

export default SelllerDashBoard