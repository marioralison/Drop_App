import { useCallback, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from "react-native-toast-message";

import { IUser } from "@/helpers/data.type";
import Checkbox from "@/app/components/checkbox/checkbox";
import { addPreferedArticle } from "@/helpers/library";
import { bestArticles } from "@/helpers/init";
import { signupUser } from "@/helpers/api";

export default function OnboardBuyer(){

    const [articles, setCuisines] = useState<{id: number,name: string,selected: boolean}[]>(bestArticles)

    const toggleArticle = useCallback((id : number) => {
        setCuisines((prevArticles) => {
            return prevArticles.map((article) => {
                if (article.id === id) {
                    return {
                        ...article,
                        selected : !article.selected
                    }
                }
                return article
            })
        })
    }, [])

    const router = useRouter();

    const handleGoBack = () => {
        router.push({
            pathname: "/buyerForm",
            params: {
                user: JSON.stringify(user)
            }
        })
    };

    const user: IUser = JSON.parse(useLocalSearchParams().user as string);

    return(
        <View className="w-full h-full bg-white p-[25] flex gap-10">
            <Pressable onPress={handleGoBack} className="w-full h-[10%] flex justify-center">
                <Image style={{zIndex: -10}} source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <View className="w-full h-[70%] flex items-start gap-20">
                <View className="w-[70%]">
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Préférence de produits</Text>
                    <Text className="mt-3 text-xl">Choisis les produits que vous aimez pour que DropShop vous les recommande</Text>
                </View>
                <View className="w-full flex">
                    <View className="h-fit w-full flex flex-row flex-wrap gap-[14]">
                        {articles.map((article) => {
                            return (
                                <Checkbox 
                                    key={article.id} 
                                    label={article.name} 
                                    checked={article.selected}
                                    onPress={() => {
                                        toggleArticle(article.id)
                                    }}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
            <View className="w-full h-[10%] flex justify-center items-center">
                <Pressable 
                    onPress={async () => {
                        const isSigned = await signupUser(addPreferedArticle(articles,user));
                        if (isSigned) router.push('/accueil')
                    }} 
                    className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl"
                >
                    <Text className="font-lato-bold text-lg">Confirmer</Text>
                </Pressable>
            </View>
            <Toast />   
        </View>
    )
}