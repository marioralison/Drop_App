import { View,Text,Image, TouchableOpacity,ScrollView } from "react-native";
import SellerNaviagtion from "./SellerNavigation";
import { dataArticles } from "@/app/data/articles";
import { useRouter } from "expo-router";

const SellerTransaction = () => {
    const router = useRouter();
    return(
        <View className=" flex flex-col h-screen gap-3 p-2 pt-4 m-3">
            <View className="flex flex-row items-center gap-4 pb-4">
                <TouchableOpacity
                    onPress={() => {router.back() as any}}
                >
                    <Image source={require("../../assets/icons/Back.png")} className="size-8"/>
                </TouchableOpacity>
                <Text className="font-syne-semiBold text-3xl">Transaction et portefeuille</Text>
            </View>
            <View className=" flex flex-col gap-4 justify-around h-1/5 bg-vert rounded-xl p-3 px-5 mx-3">
                <View>
                    <Text className=" font-lato-bold text-lg text-gray-50">Solde du compte</Text>
                    <Text className="text-4xl font-lato-bold">000000 MGA</Text>
                </View>
                <View className=" flex flex-row items-center justify-between">
                    <View className=" flex fle-col gap-1">
                        <Text className=" text-gray-50 font-lato-bold">N° du compte</Text>
                        <Text className=" font-lato-bold text-sm">**** **** **45</Text>
                    </View>
                    <View className=" flex fle-col gap-1">
                        <Text className=" text-gray-50 font-lato-bold text-base">Titulaire</Text>
                        <Text className=" font-lato-bold text-sm">Iannis Guerra</Text>
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