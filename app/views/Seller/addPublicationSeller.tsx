import { View,Text,Image,TouchableOpacity,TextInput } from "react-native";
import { useState } from "react";

const AddPublictionSeller = () => {
    const [price,setPrice] = useState("")

    
    return(
        <View className=" flex flex-col justify-between   h-full p-2">
            <View className=" flex flex-col gap-3 h-1/3">
                <View className=" flex flex-row items-center w-fit ">
                    <TouchableOpacity>
                        <Image source={require("../../assets/icons/Back.png")} className="size-8"/>
                    </TouchableOpacity>
                    <Text className=" font-lato-bold text-2xl">Nouvelle Publication</Text>
                </View>
                <View className=" my-2 h-full bg-gray-100 flex justify-center items-center rounded-xl">
                    <Text className=" font-lato-bold text-xl text-gray-400">Ajouter une photo</Text>
                </View>
                <TouchableOpacity className=" flex items-center justify-center py-3 rounded-xl bg-gray-400">
                    <Text className=" font-lato-bold text-lg">Ajouter une photo</Text>
                </TouchableOpacity>
                <View >
                    <Text className=" font-lato-bold text-lg mx-1">Prix</Text>
                    <View className=" flex flex-row items-center justify-between mx-1">
                        <TextInput
                            onChangeText={setPrice}
                            value={price}
                            className="text-xl font-lato-regular"
                            placeholder="Entrer le prix"
                        />
                        <Text className=" font-syne-semiBold">Modifier</Text>
                    </View>
                </View>
                <View className="mx-1">
                    <Text className=" font-lato-bold text-lg mx-1">Description</Text>
                    <TextInput
                        placeholder="Enter la description"className="text-lg font-lato-regular bg-gray-50 rounded-xl"
                    />
                </View>
            </View>
            <TouchableOpacity className=" bg-vert py-3 rounded-xl flex items-center justify-center">
                <Text className=" font-syne-bold text-lg ">Publier la publication</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPublictionSeller;