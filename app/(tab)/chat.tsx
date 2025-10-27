import { View, Image, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValueFor } from "@/helpers/store.access";
import { getSomeUser } from "@/helpers/api";
import { UserRole } from "@/helpers/users.type"
import { IBestUser } from "@/helpers/data.type";

export default function Chat() {

    const [userId, setUserId] = useState<string | null>(null);

    const router = useRouter();
    
    const handleGoBack = () => {
    router.back();
    };

    const [ dataUserList, setDataUserList ] = useState<IBestUser[]>([]);

    const handleGetUserId = async () => {
        try {
            const userId = await getValueFor('id');
            setUserId(userId);
        }
        catch (error) {
            console.error("Erreur lors de la récupération de l'ID utilisateur :", error);
            return null;
        }
    };

    const handleGetSomeUser = async () => {
        try {
            const users : IBestUser[] | null = await getSomeUser(UserRole.BUYER, 0, 10);
            if (users) {
                setDataUserList(users);
            }
            return;
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            return [];
        }
    };

    useEffect(() => {
        handleGetSomeUser();
        handleGetUserId();
    }, []);
    

    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[20]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                    <Image source={require("../assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Messages</Text>
            </View>
            <View className="w-full h-[90%]">
                <FlatList
                    data={dataUserList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable 
                            onPress={() => router.push({
                                    pathname: '/message',
                                    params: { 
                                        id_sender: userId, 
                                        id_recever : item.id, 
                                        nom_sender: item.nom, 
                                        imageSender: item.imageSource}
                                })
                            } 
                            className="w-full h-[70] flex flex-row items-center px-5"
                        >
                            {item.imageSource ? (
                                <Image source={{ uri: item.imageSource }} className="w-[50] h-[50] rounded-full mr-4"/>
                            ) : (
                                <Image source={require("../assets/icons/user.png")} className="w-[50] h-[50] rounded-full mr-4"/>
                            )}
                            <View className="flex flex-row items-center w-[70%]">
                                <View className="w-full flex flex-col">
                                    <Text className="text-lg font-syne-regular">{item.nom}</Text>
                                    <Text className="text-gray-500 font-bold">Bonjour, comment ça va ?</Text>
                                </View>
                                <Text>12:00</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}