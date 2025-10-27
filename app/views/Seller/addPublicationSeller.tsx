import { View,Text,Image,TouchableOpacity,TextInput } from "react-native";
import { useState } from "react";
import { router, usePathname } from "expo-router";

const AddPublictionSeller = () => {
    const [price,setPrice] = useState("")
    const pathname = usePathname()

    return(
        <View className="flex flex-col justify-between h-full p-6">
            <View className="flex flex-col gap-5 h-1/3">
                <View className=" flex flex-row items-center w-fit gap-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <Image source={require("../../assets/icons/Back.png")} className="size-8"/>
                    </TouchableOpacity>
                    <Text className=" font-lato-bold text-2xl">Nouvelle Publication</Text>
                </View>
                <TouchableOpacity className=" my-2 h-full bg-gray-200 flex justify-center items-center rounded-xl">
                    <Text className=" font-lato-bold text-xl text-gray-400">Ajouter une photo</Text>
                </TouchableOpacity>
                <View className="flex flex-col gap-2">
                    <Text className=" font-lato-bold text-lg mx-1">Description</Text>
                    <View className=" flex flex-row items-center justify-between">
                        <TextInput
                            onChangeText={setPrice}
                            value={price}
                            className="text-xl font-lato-regular bg-white w-full pl-4 rounded-xl"
                            placeholder="Entrer le Description"
                        />
                    </View>
                </View>
                <View className="flex flex-col gap-2">
                    <Text className=" font-lato-bold text-lg mx-1">Type article</Text>
                    <View className=" flex flex-row items-center justify-between">
                        <TextInput
                            onChangeText={setPrice}
                            value={price}
                            className="text-xl font-lato-regular bg-white w-full pl-4 rounded-xl"
                            placeholder="Entrer le Type article"
                        />
                    </View>
                </View>
                <View className="flex flex-col gap-2">
                    <Text className=" font-lato-bold text-lg mx-1">Prix</Text>
                    <View className=" flex flex-row items-center justify-between">
                        <TextInput
                            onChangeText={setPrice}
                            value={price}
                            className="text-xl font-lato-regular bg-white w-full pl-4 rounded-xl"
                            placeholder="Entrer le prix"
                        />
                    </View>
                </View>
                <View className="flex flex-col gap-2">
                    <Text className=" font-lato-bold text-lg mx-1">Stock</Text>
                    <View className=" flex flex-row items-center justify-between">
                        <TextInput
                            onChangeText={setPrice}
                            value={price}
                            className="text-xl font-lato-regular bg-white w-full pl-4 rounded-xl"
                            placeholder="Entrer le Stock"
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity className=" bg-vert py-3 rounded-xl flex items-center justify-center">
                <Text className="font-lato-regular text-lg">Publier la publication</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPublictionSeller;