import { getInfoById } from "@/helpers/api";
import { IUser } from "@/helpers/data.type";
import { decodeHtmlEntities } from "@/helpers/library";
import { deleteOne, getValueFor } from "@/helpers/store.access";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View,Image,Text,StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message";


const UserProfile =  () =>{
    const id_user: number = parseInt(useLocalSearchParams().id_user+"");
    const [idUserLocal, setIdUserLocal] = useState<number>();
    const token: string = useLocalSearchParams().token as string
    const [currentUser, setCurrentUser] = useState<Omit<IUser, "password" | "confirmPassword"> | null>(null);
    
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
        <View className=" flex-col justify-between items-center  h-full p-3">
            <View className=" flex-col justify-center items-center p-3">
                {
                    (currentUser?.profile_url) ?
                        <Image 
                            source={{ uri: currentUser.profile_url }}
                            className="w-9 h-9"
                        />
                    :
                        <View className="w-9 h-9 bg-gray-300" ></View>
                }
                <Text className=" font-syne-bold text-xl ">{currentUser?.firstname} {currentUser?.lastname}</Text>
                <Text className=" font-syne-bold text-md">{currentUser?.email}</Text>
            </View>

            <View className="m-2  w-full p-3">
                <Text className=" font-syne-bold text-base">Profile</Text>
                <View className=" flex-col gap-2  p-3">
                    <TouchableOpacity  style={styles.grayBG}>
                       <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Nom</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">{currentUser?.firstname}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                       </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Email</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold bg-[#e4e4e4]">{currentUser?.email}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.grayBG}>
                       <View className=" flex-row items-center justify-between ">
                            <View>
                                <Text className="font-bold text-lg">Numéro</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">{currentUser?.tel}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                       </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Adresse</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">{currentUser?.region} {currentUser?.pays}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="m-2  w-full p-3 ">
                <Text className=" font-syne-bold text-base">Paramètres</Text>
                <View>
                    <TouchableOpacity  style={styles.grayBG}>
                        <View className="  flex-row items-center justify-between p-3">
                            <View>
                                <Text className="font-bold text-lg">Changer de mot de passe</Text>
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
                    <TouchableOpacity onPress={handleDeconnexion} className=" bg-blackPrimary w-11/12 p-3 rounded-xl">
                        <Text className="text-white font-syne-semiBold text-center ">Déconexions</Text>
                    </TouchableOpacity>
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
        borderRadius: 10,
        padding: 4
    },
    userdetails: {
        color: 'gray'
    }
})

export default UserProfile