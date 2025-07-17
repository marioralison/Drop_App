import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable  } from "react-native";
import {  useState } from "react";
import { IPublication } from "@/helpers/data.type";
import { likeOrInlikePost } from "@/helpers/api";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { decodeHtmlEntities } from "@/helpers/library";

const HeartIcon = require("../../assets/icons/Heart.png")
const HeartFilledIcon = require("../../assets/icons/HeartGreen.png");

interface Props {
    pub: IPublication,
    token: string,
    reactionStatus: boolean,
    id_user: number,
    goToDetails: (id_user: number) => void
}

const PublicationAccueil = ({ pub,token, reactionStatus, id_user, goToDetails }: Props) => {

    const [isLiked, setIsLiked] = useState(reactionStatus);
    const [reactions, setReactions] = useState(pub.nombreReactions);

    const handleLikePress = async  () => {
        try {
            setIsLiked(!isLiked);
            setReactions(isLiked ? reactions - 1 : reactions + 1);
            await likeOrInlikePost(token,pub.id);
        } catch (error) {
            throw error;
        }
    };

    const heartIconSource = isLiked ? HeartFilledIcon : HeartIcon;

    return (
        <View className="w-full h-[auto] flex-col justify-center items-center">
            <View className="w-full h-[80] flex flex-row justify-between items-center">
                <View className="w-fit h-full flex flex-row justify-start items-center gap-[10]">
                    <TouchableOpacity
                        onPress={() => {
                            goToDetails(id_user)
                        }}
                    >
                        <Image source={
                            pub.imageUtilisateurSource ? (
                                { uri: pub.imageUtilisateurSource }
                            ) : (
                                require("../../assets/icons/user.png")
                            )
                        } 
                        className="w-[50] h-[50] rounded-full" />
                    </TouchableOpacity>
                    <View className="h-full justify-center items-start">
                        <TouchableOpacity 
                            onPress={() => {
                                goToDetails(id_user)
                            }}
                        >
                            <Text className="text-xl text-blackPrimary font-lato-bold">{pub.nomUtilisateur}</Text>
                        </TouchableOpacity>
                        
                        <Text className="text-xl text-blackPrimary font-lato-light">{pub.villeUtilisateur}</Text>
                    </View>
                </View>
                <View className="w-fit h-full justify-center items-end">
                    <Text className="text-xl text-blackPrimary font-lato-bold">{pub.datePublication}</Text>
                    <Text className="text-xl text-blackPrimary font-lato-light">{pub.heurePublication}</Text>
                </View>
            </View>
            <View className="w-full h-fit flex justify-center items-center gap-[10]">
                {
                    (pub.type != 'SIMPLE_POST') && <Text className="line-clamp-3 text-2xl text-left w-full text-blackPrimary font-lato-regular">
                        {pub.textePublication}
                    </Text>
                }
                <Pressable 
                    onPress={() => {
                        // router.push('/det')
                    }}
                    className="w-full min-h-[250] max-h-[500] flex justify-center items-center bg-lime-50 rounded-xl-2-black">
                    {
                        (pub.type == 'SIMPLE_POST') ? (
                            <Text className="text-3xl w-full px-[10] text-center font-lato-bold"> {pub.textePublication} </Text>
                        ) : (
                            <Image source={
                                pub.imagePublicationSource ? (
                                    { uri: pub.imagePublicationSource }
                                ) : (
                                    require("../../assets/icons/user.png")
                                )
                            } className="w-full h-full rounded-lg" />
                        )
                    }
                </Pressable>
            </View>
            <View className="w-full h-[80] flex flex-row justify-between items-center">
                <View className="w-fit h-full flex justify-center items-start gap-[8]">
                    <View className="w-fit h-fit flex flex-row justify-center items-center gap-[8]">
                        <Image source={require("../../assets/icons/Star.png")} className="w-[20] h-[20]" />
                        <Text className="text-2xl text-blackPrimary font-lato-bold">{pub.note}</Text>
                    </View>
                    <View className="w-fit h-fit flex flex-row justify-center items-center gap-[8]">
                        <TouchableOpacity onPress={
                            handleLikePress
                        }>
                            <Image source={heartIconSource} className="w-[30] h-[30]" />
                        </TouchableOpacity>
                        <Text className="text-xl text-blackPrimary font-lato-bold">{reactions} réactions</Text>
                    </View>
                </View>
                <View className="w-fit h-full justify-center items-end gap-[8]">
                    <Text className="text-2xl text-blackPrimary font-lato-bold">{(pub.prix != 'null') ? (pub.prix)+ " Ar" : ("contact us")}</Text>
                    <TouchableOpacity className="w-fit h-fit flex flex-row justify-center items-center gap-[8]" 
                    onPress={async () => {
                        try {
                            await pub.checkComment(pub.id,true);
                            pub.onCommentPress(pub.id);
                        } catch (error) {
                            throw error
                        }
                    }
                    }>
                        <Image source={require("../../assets/icons/Comments.png")} className="w-[30] h-[30]" />
                        <Text className="text-xl text-blackPrimary font-lato-bold">{pub.nombreCommentaires} commantaires</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast/>
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