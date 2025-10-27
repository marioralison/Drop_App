import { View,Text,Image,ScrollView } from "react-native";
import { dataArticles } from "@/app/data/articles";
import SellerNaviagtion from "./views/Seller/SellerNavigation";

const SelllerDashBoard = () => {

    return(
        <View className="flex flex-col justify-between h-full gap-3 p-2 pt-4 m-3">
            <View className="flex flex-row items-center">
                <Image className="w-14 h-14 rounded-full" source={require("./assets/images/vendeur1.png")}/>
                <View>
                    <Text className="font-syne-bold  text-base">Iannis Guerra</Text>
                    
                    <Text className="font-lato-regular text-gray-500  text-xs">Antananarivo,Madagascar</Text>
                </View>
            </View>
            <View className=" flex flex-col gap-8 h-full">
                <View className="flex gap-4">
                    <View className=" flex flex-col gap-5 rounded-xl  p-3 bg-vert">
                        <View className=" flex flex-row items-center justify-between">
                            <Text className="font-syne-bold text-2xl">Ventes aujourd'hui</Text>
                            {/* Image */}
                            <View className=" w-7 h-7 bg-black rounded-full"></View>
                        </View>
                        <View>
                            <Text className="font-syne-semiBold text-3xl">000000 MGA</Text>
                        </View>
                    </View>

                    <View className="flex flex-col gap-5 rounded-xl  p-3 bg-gray-200 ">
                        <View className=" flex flex-row items-center justify-between">
                            <Text className="font-syne-bold text-2xl">Chiffres d'affaires</Text>
                            {/* Image */}
                            <View className=" w-7 h-7 bg-black rounded-full"></View>
                        </View>
                        <View>
                            <Text className="font-syne-semiBold text-3xl">000000 MGA</Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-col h-full rounded-xl">
                    <Text className="font-lato-bold text-lg pb-2">Ventes recentes</Text>
                    <ScrollView className="h-full overflow-y-auto">
                        {dataArticles.map((item,index) => (
                            <View key={index} className=" flex flex-row items-center rounded-lg justify-between px-4 bg-gray-50 mb-4">
                                <View className="flex flex-row gap-1 items-center">
                                    <Image className=" size-20" source={require("./assets/images/agraffeuse.png")}/>
                                    <View className="flex flex-col pl-2">
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
            </View>
            <SellerNaviagtion></SellerNaviagtion>
        </View>
    )
}

export default SelllerDashBoard;