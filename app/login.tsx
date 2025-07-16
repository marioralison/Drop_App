import { View, Image, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useRouter } from 'expo-router';

export default function Login() {

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
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Se connecter à Dropshop</Text>
                    <Text className="text-xl font-lato-regular mt-3">Veuillez remplir tous les champs, en entrant des informations valides</Text>
                </View>

                <View className="w-full gap-[25] mt-[50] mb-[20] text-xl font-lato-regular">
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Email"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Mot de passe"
                    />

                    <Pressable onPress={() => router.push('/accueil')} className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
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