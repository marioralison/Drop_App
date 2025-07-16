import { postAnnoce } from "@/helpers/api";
import { useState } from "react";
import { View, Image, TextInput, Pressable, Keyboard } from "react-native";
import Toast from "react-native-toast-message";

const SectionAnnonce = (props: { url: string | null, token: string }) => {
    const [annonce, setAnnonce] = useState<string>("");

    return (
        <View className="w-full h-[70] flex flex-row justify-between items-center">
            {props.url ? (
                <Image source={{ uri: props.url }} className="w-[45] h-[45]" />                
            ) : (
                <Image source={require("../../../../assets/icons/user.png")} className="w-[45] h-[45]" />   
            )}
            <View className="w-[82%] h-[56] flex flex-row justify-between items-center pr-[12] border rounded-xl">
                <TextInput
                    className="w-[90%] h-full pl-5 font-lato-regular text-xl"
                    placeholder="Faire une annonce"
                    value={annonce}
                    onChangeText={(value: string) => setAnnonce(value)}
                />
                
                <Pressable
                    onPress={ async () => {
                        try {
                            const status: boolean = await postAnnoce(annonce,props.token);
                            if (status) {
                                Toast.show({
                                    type: "success",
                                    text1: "Votre annonce est publié"
                                })
                                setAnnonce("");
                                Keyboard.dismiss();
                            }
                        } catch (error) {
                            throw error;
                        }
                    }}
                >
                    <Image source={require("../../../../assets/icons/Sent.png")} className="w-[30] h-[30]" />
                </Pressable>
            </View>
        </View>
    );
};

export default SectionAnnonce;