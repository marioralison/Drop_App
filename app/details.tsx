import { IPublication } from "@/helpers/data.type";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { View,Text,TouchableOpacity,Image,StyleSheet,Pressable } from "react-native";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
    photoDetails: {
        maxHeight: '45%'
    },
    colorDetails: {
        width: 85,
        height: 75,
    },
    touchablePay: {
        width: '85%'
    },
    touchableBasket: {
        backgroundColor: 'gray'
    },
})

const Details = () => {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };

    const publication: IPublication = JSON.parse(useLocalSearchParams().pub+"") as IPublication

    return (
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-between gap-[20]">
            <View className="w-full flex items-start justify-center gap-[20]">
                <View className="w-full h-[50] flex flex-row justify-between items-center">
                    <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                        <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                    </Pressable>
                    <Text className="w-[80%] text-4xl text-center text-blackPrimary font-syne-bold">Détails</Text>
                    <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                        <Image source={require("./assets/icons/ChatBubble.png")} className="w-[30] h-[30]"/>
                    </Pressable>
                </View>
                <View className="w-full flex justify-center items-center" style={styles.photoDetails}>
                    {
                        publication.imagePublicationSource ?
                            <Image source={{ uri: publication.imagePublicationSource }} className="w-full h-full rounded-xl"/>
                        :
                            <View></View>
                    }
                </View>
                <View className="w-full flex-row justify-between items-center ">
                    <Text className="w-[70%] font-lato-bold text-2xl line-clamp-2">{publication.textePublication}</Text>
                    <View className="flex-row items-center justify-center gap-[5]">
                        <Image source={require("./assets/icons/Star.png")} className="size-5"/>
                        <Text className=" font-lato-bold text-2xl">4.5</Text>
                    </View>
                </View>
                <View className="flex justify-center items-start gap-[8]">
                    <Text className="font-syne-bold text-2xl">Couleurs</Text>
                    <View className=" flex-row  gap-3">
                        {
                            publication.imagePublicationSource ?
                                <Image source={{ uri: publication.imagePublicationSource }} className="rounded-xl" style={styles.colorDetails} />
                            :
                                <View></View>
                        }
                    </View>
                </View>

                <View className="flex justify-center items-start gap-[8] ">
                    <Text className=" font-lato-bold text-2xl">Taille</Text>
                    <View className=" flex-row gap-3 items-center">
                        <View><Text className="font-syne-semiBold text-xl rounded-xl bg-black text-white p-[20]">XL</Text></View>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-center gap-[2%] items-center">
                <Pressable
                    className="w-[79%] h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
                    <Text className="font-lato-bold text-lg">Confirmer</Text>
                </Pressable>
                <TouchableOpacity className="w-[19%] h-[60] flex justify-center rounded-xl items-center flex-1 p-3" style={styles.touchableBasket}>
                    <Image source={require("./assets/icons/ShoppingBasket.png")} className="size-7"/>
                </TouchableOpacity>
            </View>
            <Toast />
        </View>
    )
}

export default Details