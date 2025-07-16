import { View, Text, Image, StyleSheet, TouchableOpacity  } from "react-native";
import { useState } from "react";
import { IPublication } from "@/helpers/data.type";

const HeartIcon = require("../../assets/icons/Heart.png")
const HeartFilledIcon = require("../../assets/icons/HeartGreen.png");

interface Props {
    pub: IPublication
}

const PublicationAccueil = ({ pub }: Props) => {

    const [isLiked, setIsLiked] = useState(false);
    const [reactions, setReactions] = useState(pub.nombreReactions);

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        setReactions(isLiked ? reactions - 1 : reactions + 1);
    };

    const heartIconSource = isLiked ? HeartFilledIcon : HeartIcon;

    return (
        <View className="w-full h-[420]">
            <View className="w-full h-[70] flex flex-row justify-between items-center">
                <View className="w-fit h-full flex flex-row justify-center items-center">
                    <Image source={
                        pub.imageUtilisateurSource ? (
                            { uri: pub.imageUtilisateurSource }
                        ) : (
                            require("../../assets/icons/user.png")
                        )
                    } 
                    className="w-[50] h-[50]" />
                    <View className="w-fit h-full justify-center items-start">
                        <Text className="text-2xl px-[16] text-blackPrimary font-lato-bold">{pub.nomUtilisateur}</Text>
                        <Text className="text-xl px-[16] text-blackPrimary font-lato-light">{pub.villeUtilisateur}</Text>
                    </View>
                </View>
                <View className="w-fit h-full justify-center items-end">
                    <Text className="text-2xl text-blackPrimary font-lato-bold">{pub.datePublication}</Text>
                    <Text className="text-xl text-blackPrimary font-lato-light">{pub.heurePublication}</Text>
                </View>
            </View>
            <View className="w-full h-[270] flex justify-center items-start gap-[10]">
                <Text className="text-2xl text-blackPrimary font-lato-regular">{pub.textePublication}</Text>
                <View className="w-full h-[230] flex justify-center items-center bg-lime-50 rounded-xl">
                    <Image source={
                        pub.imagePublicationSource ? (
                            { uri: pub.imagePublicationSource }
                        ) : (
                            require("../../assets/icons/user.png")
                        )
                    } className="w-[180] h-[180]" />
                </View>
            </View>
            <View className="w-full h-[80] flex flex-row justify-between items-center">
                <View className="w-fit h-full flex justify-center items-start gap-[8]">
                    <View className="w-fit h-fit flex flex-row justify-center items-center gap-[8]">
                        <Image source={require("../../assets/icons/Star.png")} className="w-[20] h-[20]" />
                        <Text className="text-2xl text-blackPrimary font-lato-bold">{pub.note}</Text>
                    </View>
                    <View className="w-fit h-fit flex flex-row justify-center items-center gap-[8]">
                        <TouchableOpacity onPress={handleLikePress}>
                            <Image source={heartIconSource} className="w-[30] h-[30]" />
                        </TouchableOpacity>
                        <Text className="text-xl text-blackPrimary font-lato-bold">{reactions} réactions</Text>
                    </View>
                </View>
                <View className="w-fit h-full justify-center items-end gap-[8]">
                    <Text className="text-2xl text-blackPrimary font-lato-bold">{(pub.prix != 'null') ? (pub.prix) : ("contact us")}</Text>
                    <TouchableOpacity className="w-fit h-fit flex flex-row justify-center items-center gap-[8]" onPress={pub.onCommentPress}>
                        <Image source={require("../../assets/icons/Comments.png")} className="w-[30] h-[30]" />
                        <Text className="text-xl text-blackPrimary font-lato-bold">{pub.nombreCommentaires} commantaires</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    likedIcon: {
        tintColor: 'red', // Couleur lorsque le cœur est cliqué
    },
});

export default PublicationAccueil;