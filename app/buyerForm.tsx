import { View, Image, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from "react";

import { IUser, UserRole } from "@/helpers/data.type";
import { checkRequiredPropriety } from "@/helpers/library";


export default function BuyerForm() {

    const params = useLocalSearchParams();
    const userDefaultData: Omit<IUser,"id"> = (params.user)? JSON.parse(params.user as string) : {
        firstname: "",
        lastname: "",
        region: "",
        country: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        preference_product: "",
        role: UserRole.BUYER
    }
    
    const [users,setUser] = useState<Omit<IUser,"id">>(userDefaultData)

    const handleChange = (field: keyof IUser, value: string) => {
        setUser({ ...users, [field]: value });
    };

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return(
        <View className="w-full h-full bg-white p-[25] flex gap-10">
            <Pressable onPress={handleGoBack} className="w-full h-[10%] flex justify-center">
                <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>

                <View className="w-[70%]">
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Devenir Acheteur</Text>
                    <Text className="text-xl font-lato-regular mt-3">Veuillez remplir tous les champs, en entrant des informations valides</Text>
                </View>

                <View className="w-full gap-[25] mt-[50] mb-[20] text-xl font-lato-regular">
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Nom"
                        value={users.firstname}
                        onChangeText={(value: string) => handleChange("firstname",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Prénom"
                        value={users.lastname}
                        onChangeText={(value: string) => handleChange("lastname",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Région"
                        value={users.region}
                        onChangeText={(value: string) => handleChange("region",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Pays"
                        value={users.pays}
                        onChangeText={(value: string) => handleChange("pays",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Numéro téléphone"
                        value={users.tel}
                        onChangeText={(value: string) => handleChange("tel",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Adresse e-mail"
                        value={users.email}
                        onChangeText={(value: string) => handleChange("email",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Mot de passe"
                        value={users.password}
                        onChangeText={(value: string) => handleChange("password",value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Confirmer le mot de passe"
                        value={users.confirmPassword}
                        onChangeText={(value: string) => {
                            if (value != users.password){
                                // password not matched
                            } 
                            handleChange("confirmPassword",value);
                        }}
                    />

                    <Pressable 
                        onPress={() => {
                            if(checkRequiredPropriety(users)) {
                                return router.push({
                                    pathname: '/onboardBuyer',
                                    params: {
                                        user: JSON.stringify(users)
                                    }
                                })
                            }
                            return;
                        }}
                        className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl"
                    >
                        <Text className="font-lato-bold text-lg">Confirmer</Text>
                        
                    </Pressable> 

                    <Pressable className="w-full h-[60] flex flex-row justify-center items-center bg-blackPrimary gap-[10] px-6 py-5 rounded-xl">
                        <Image source={require("./assets/icons/Google.png")} className="w-[30] h-[30]"/>
                        <Text className="font-lato-bold text-lg text-white">Google</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}