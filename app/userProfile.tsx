import { getInfoById } from "@/helpers/api";
import { IUser } from "@/helpers/data.type";
import { decodeHtmlEntities } from "@/helpers/library";
import { deleteOne, getValueFor } from "@/helpers/store.access";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View,Image,Text,StyleSheet, Pressable } from "react-native"
import { TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message";


const UserProfile =  () =>{
    const id_user: number = parseInt(useLocalSearchParams().id_user+"");
    const [idUserLocal, setIdUserLocal] = useState<number>();
    const token: string = useLocalSearchParams().token as string
    const [currentUser, setCurrentUser] = useState<Omit<IUser, "password" | "confirmPassword"> | null>(null);

    const handleGoBack = () => {
        router.back();
    };

    
    const handleDeconnexion = async () => {
        try {
            await handler();
            router.push("/welcome")
        } catch (error) {
            throw error;
        }
    }
    const handler = async () => {
        try {
            const key: string[] = ["id","token","infoUser"];
            key.forEach(async k => {
                await deleteOne(k);
            })
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        const chechUserToDetailed = async () => {
            try {
                const dataLocal: string | null = await getValueFor("infoUser");
                const current_info: Omit<IUser, "password" | "confirmPassword"> = JSON.parse(dataLocal? dataLocal: '') as Omit<IUser, "password" | "confirmPassword">;
                setIdUserLocal(current_info.id)
                if(id_user == current_info.id) {
                    setCurrentUser({
                        ...current_info,
                        profile_url: (current_info.profile_url)? decodeHtmlEntities(current_info.profile_url) : null
                    });
                    return;
                }
                const dataProd = await getInfoById(token,id_user+"",false);
                setCurrentUser(dataProd);
            } catch (error) {
                console.error(error);
            }
        }
        chechUserToDetailed();
    },[])

    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-between gap-[20]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
            </View>
            <View className="w-full flex-col justify-center items-center gap-[20]">
                {
                    (currentUser?.profile_url) ?
                        <Image 
                            source={{ uri: currentUser.profile_url }}
                            style={{width: 100, height: 100}}
                            className="rounded-full"
                        />
                    :
                        <View style={{width: 100, height: 100}} className="bg-gray-300 rounded-full" ></View>
                }
                <View className="w-full flex justify-center items-center">
                    <Text className=" font-syne-bold text-4xl">{currentUser?.firstname} {currentUser?.lastname}</Text>
                    <Text className=" font-lato-regular text-xl">{currentUser?.email}</Text>
                </View>
            </View>

            <View className="w-full flex justify-center items-center gap-[20]">
                <View className="w-full flex justify-center items-start gap-[10]">
                    <Text className="font-syne-bold text-2xl">Profile</Text>
                    <View className="w-full flex-col gap-[10]">
                        <TouchableOpacity style={styles.grayBG} className="rounded-xl">
                            <View className="flex-row items-center justify-between p-3">
                                <View>
                                    <Text className="font-bold text-lg">Nom</Text>
                                    <Text style={styles.userdetails} className="text-xl font-lato-semiBold">{currentUser?.firstname}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.grayBG} className="rounded-xl">
                            <View className=" flex-row items-center justify-between p-3">
                                <View>
                                    <Text className="font-bold text-lg">Email</Text>
                                    <Text style={styles.userdetails} className="text-xl font-lato-semiBold bg-[#e4e4e4]">{currentUser?.email}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.grayBG} className="rounded-xl">
                            <View className=" flex-row items-center justify-between p-3">
                                <View>
                                    <Text className="font-bold text-lg">Numéro</Text>
                                    <Text style={styles.userdetails} className="text-xl font-lato-semiBold">{currentUser?.tel}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.grayBG} className="rounded-xl">
                            <View className=" flex-row items-center justify-between p-3">
                                <View>
                                    <Text className="font-bold text-lg">Adresse</Text>
                                    <Text style={styles.userdetails} className="text-xl font-lato-semiBold">{currentUser?.region} {currentUser?.pays}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    (currentUser?.id === idUserLocal) ? (
                        <View className="w-full flex gap-[10]">
                            <Text className=" font-syne-bold text-2xl">Paramètres</Text>
                            <TouchableOpacity  style={styles.grayBG} className="px-6 py-5 rounded-xl">
                                <View className="  flex-row items-center justify-between">
                                    <Text className="font-bold text-lg">Changer de mot de passe</Text>
                                    <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text></Text>
                    )
                }
            </View>
            
            {
                (currentUser?.id === idUserLocal) ? (
                    <Pressable onPress={() => handleDeconnexion()} className="w-full h-[60] flex justify-center items-center bg-blackPrimary px-6 py-5 rounded-xl">
                        <Text className="font-lato-bold text-white text-lg">Déconnextion</Text>
                    </Pressable>
                ) : (
                    <Text></Text>
                )
            }
            <Toast/>
        </View>
    )
}


const styles = StyleSheet.create({
    grayBG: {
        backgroundColor: "#e4e4e4",
        padding: 4
    },
    userdetails: {
        color: 'gray'
    }
})

export default UserProfile