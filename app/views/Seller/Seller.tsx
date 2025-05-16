import { View, Image, Text, TextInput, ScrollView, Pressable } from "react-native";

export default function Seller() {
    return(
        <View className="w-full h-full bg-white p-[25] flex gap-10">
            <View className="w-full h-[10%] flex justify-center">
                <Image source={require("../../assets/icons/Back.png")} className="w-[30] h-[30]"/>
            </View>
            <ScrollView>

                <View className="w-[70%]">
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Devenir Vendeur</Text>
                    <Text className="mt-3">Veuillez remplir tous les champs, en entrant des informations valides</Text>
                </View>

                <View className="w-full gap-[25] mt-[50] mb-[20]">
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Nom"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Prénom"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Région"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Pays"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Numéro"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Adresse e-mail"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Mot de passe"
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl font-lato-regular text-xl"
                        placeholder="Confirmer le mot de passe"
                    />

                    <Pressable className="flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
                        <Text className="font-lato-bold text-lg">Confirmer</Text>
                    </Pressable>

                    <Pressable className="flex flex-row justify-center items-center bg-blackPrimary gap-[10] px-6 py-5 rounded-xl">
                        <Image source={require("../../assets/icons/Google.png")} className="w-[30] h-[30]"/>
                        <Text className="font-lato-bold text-lg text-white">Google</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}