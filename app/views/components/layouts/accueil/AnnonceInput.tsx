import { router } from "expo-router";
import { View, Image, TextInput, TouchableOpacity } from "react-native";

const SectionAnnonce = () => {
    return (
        <View className="w-full h-[70] flex flex-row justify-between items-center">
            <TouchableOpacity 
                onPress={() => {
                    router.push("../../../userProfile")
                }}
            >
                <Image  source={require("../../../../assets/icons/user.png")} className="w-[45] h-[45]" />
            </TouchableOpacity>
            <View className="w-[82%] h-[56] flex flex-row justify-between items-center pr-[12] border rounded-xl">
                <TextInput
                    className="w-[90%] h-full pl-5 font-lato-regular text-xl"
                    placeholder="Faire une annonce"
                />
                <Image source={require("../../../../assets/icons/Sent.png")} className="w-[30] h-[30]" />
            </View>
        </View>
    );
};

export default SectionAnnonce;