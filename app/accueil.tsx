import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { View, ScrollView, TextInput, Text, Image, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Keyboard } from 'react-native';

import NavigationBottom from "./views/components/navigation";
import HeaderAccueil from "./views/components/layouts/accueil/Header";
import ProduitLocal from "./views/components/layouts/accueil/ProduitLocal";
import SectionCategories from "./views/components/layouts/accueil/Categorie";
import SectionAnnonce from "./views/components/layouts/accueil/AnnonceInput";
import SectionPublicationsAccueil from "./views/components/layouts/accueil/SectionPublication";
import SectionVendeursRecommandes from "./views/components/layouts/accueil/VendeurRecommandation";
import { Dictionnaire, IBestUser, IComment, IProduct, IPublication, IUser, UserRole } from "@/helpers/data.type";
import { getValueFor } from "@/helpers/store.access";
import Toast from "react-native-toast-message";
import { commentAPost, getAllComment, getInfoById, getLocalProduct, getPostReactedByUser, getPubs, getSomeUser } from "@/helpers/api";


export default function Accueil() {
    const [currentUser, setCurrentUser] = useState<Omit<IUser, "password" | "confirmPassword"> | null>(null);
    const [comment, setComment] = useState<IComment[]>([]);
    const [tokenUser,setToken] = useState<string>("");
    const [publications, setPublications] = useState<Omit<IPublication, "onCommentPress" | "checkComment">[] | []>([]);
    const [bestSeller, setBestSeller] = useState<IBestUser[] | [] | null>([]);
    const [idPostReacted, setIdPostReact] = useState<Dictionnaire<number, boolean>>(new Dictionnaire<number, boolean>);
    const [product, setProduct] = useState<IProduct[]>([]);
    const [content, setContent] = useState<string>("");
    const [idPostSelected, setIdPostSelected] = useState<number>(0);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    useEffect(() => {
        const setUserPropriety = async () => {
            try {
                // for checking current user
                const token: string | null = await getValueFor("token");
                const id: string | null = await getValueFor("id");
                if (!token) {
                    Toast.show({
                        type: "error",
                        text1: "token not defined"
                    });
                    return;
                }
                setToken(token);
                if (!id) {
                    Toast.show({
                        type: "error",
                        text1: "id not defined"
                    });
                    return;
                }
                const info: Omit<IUser, "password" | "confirmPassword"> | null = await getInfoById(token,id);
                if (!info) return;
                setCurrentUser(info);
                
                // to get local product 
                const products: IProduct[] = await getLocalProduct("Madagascar");
                setProduct(products)

                // to get all post reacted by this current user
                const tmp: Dictionnaire<number, boolean> | null = await getPostReactedByUser(parseInt(id));
                if (!tmp) return;
                setIdPostReact(tmp);

                // to get some pubs
                const pubs: Omit<IPublication,"onCommentPress" | "checkComment">[] | null = await getPubs(10);
                if (pubs === null) return;
                setPublications(pubs);

                // to get best seller
                const bestSeller: IBestUser[] | [] | null = await  getSomeUser(UserRole.SELLER,0,10)
                if (bestSeller) setBestSeller(bestSeller);
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: `${error}`
                });
                throw error;
            }
        }
        setUserPropriety()
    },[]);

    const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setIsCommentSheetOpen(false); // Masque le fond quand fermé
        }
    }, []);

    const checkComment = async (id_post: number, is_desc: boolean) => {
        try {
            const comments: IComment[] = await getAllComment(id_post,is_desc);
            setComment(comments);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error+""
            });
            throw error;
        }
    }

    const openCommentSection = (id_post: number) => {
        setIdPostSelected(id_post);
        setIsCommentSheetOpen(true);
        bottomSheetRef.current?.snapToIndex(0);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="w-full h-full bg-white px-[20] py-[20] flex gap-[2%]">
                <HeaderAccueil />
                <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
                    <View className="w-full h-full flex justify-start items-center gap-[22]">
                        <SectionAnnonce url={null}/>
                        <ProduitLocal productLocal={product} />
                        <SectionCategories
                            onCategoryPress={() => {}}
                            selectedCategoryId={null}
                        />
                        <View className="w-full h-[1] bg-black"></View>
                        <SectionPublicationsAccueil 
                            postReactedId={idPostReacted} 
                            token={tokenUser} pubs={publications} 
                            onCommentPress={openCommentSection} 
                            checkComment={checkComment}
                        />
                        <View className="w-full h-[1] bg-black"></View>
                        
                        <SectionVendeursRecommandes seller={bestSeller? bestSeller : []} />
                    </View>
                </ScrollView>

                <View className="w-full h-[9%] flex justify-center items-center">
                    <NavigationBottom />
                </View>
                <Toast/>
            </View>

            {isCommentSheetOpen && (
                <Pressable
                    onPress={() => bottomSheetRef.current?.close()}
                    style={styles.overlay}
                />
            )}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                backgroundStyle={styles.sheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <Text className="text-2xl text-blackPrimary font-lato-bold">Commentaire{(comment.length > 1) && 's'} {comment.length}</Text>

                    {
                        comment.map((c,i) => {
                            return (
                                <View style={styles.commentList} key={c.id} >
                                    <View className="w-full flex flex-row">
                                        <Image source={require("./assets/icons/avatar.png")} className="w-[50] h-[50]" />
                                        <View className="w-full flex flex-col">
                                            <Text className="text-2xl w-full text-blackPrimary font-lato-bold px-4">{c.user.firstname} {c.user.lastname}</Text>
                                            <Text className="text-xl w-full text-blackPrimary font-lato-regular px-4 mb-2">{c.content}</Text>
                                            <Text className="px-4 font-bold">- {c.datePublication} - {c.heurePublication}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }

                    <View className="flex flex-row w-full justify-center items-center gap-2">
                        <TextInput
                            style={styles.input}
                            placeholder="Écrivez un commentaire..."
                            placeholderTextColor="#999"
                            value={content}
                            onChangeText={(value: string) => setContent(value)}
                        />
                        <Pressable 
                            onPress={async () => {
                                try {
                                    const status: boolean = await commentAPost(tokenUser,idPostSelected,{ content })
                                    if (status) {
                                        bottomSheetRef.current?.close();
                                        Keyboard.dismiss();
                                        Toast.show({
                                            type: "success",
                                            text1: "Votre commentaire",
                                            text2: `${content}`
                                        })
                                        const comments: IComment[] = await getAllComment(idPostSelected,true);
                                        setComment(comments);
                                        setContent("");
                                    }
                                } catch (error) {
                                    throw error
                                }
                            }} 
                        >
                            <Image source={require("./assets/icons/Sent.png")} className="w-[30] h-[30]" />
                        </Pressable>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handleIndicator: {
        backgroundColor: '#ccc',
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 14,
        gap: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentList: {
        gap: 10,
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacité à 50%
        zIndex: 0,
    },
});
