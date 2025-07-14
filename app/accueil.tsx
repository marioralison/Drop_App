import React, { useRef, useMemo, useCallback, useState } from "react";
import { View, ScrollView, TextInput, Text, Image, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import NavigationBottom from "./views/components/navigation";
import HeaderAccueil from "./views/components/layouts/accueil/Header";
import ProduitLocal from "./views/components/layouts/accueil/ProduitLocal";
import SectionCategories from "./views/components/layouts/accueil/Categorie";
import SectionAnnonce from "./views/components/layouts/accueil/AnnonceInput";
import SectionPublicationsAccueil from "./views/components/layouts/accueil/SectionPublication";
import SectionVendeursRecommandes from "./views/components/layouts/accueil/VendeurRecommandation";

export default function Accueil() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setIsCommentSheetOpen(false); // Masque le fond quand fermé
        }
    }, []);

    const openCommentSection = () => {
        setIsCommentSheetOpen(true);
        bottomSheetRef.current?.snapToIndex(0);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="w-full h-full bg-white px-[20] py-[20] flex gap-[2%]">
                <HeaderAccueil />
                <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
                    <View className="w-full h-full flex justify-start items-center gap-[22]">
                        <SectionAnnonce />
                        <ProduitLocal />
                        <SectionCategories
                            onCategoryPress={() => {}}
                            selectedCategoryId={null}
                        />
                        <View className="w-full h-[1] bg-black"></View>
                        <SectionPublicationsAccueil onCommentPress={openCommentSection} />
                        <View className="w-full h-[1] bg-black"></View>
                        <SectionVendeursRecommandes />
                    </View>
                </ScrollView>

                <View className="w-full h-[9%] flex justify-center items-center">
                    <NavigationBottom />
                </View>
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
                    <Text className="text-2xl text-blackPrimary font-lato-bold">Commentaire (25)</Text>
                    <View style={styles.commentList}>
                        <View className="w-full flex flex-row">
                            <Image source={require("./assets/icons/avatar.png")} className="w-[50] h-[50]" />
                            <View className="w-full flex flex-col">
                                <Text className="text-2xl w-full text-blackPrimary font-lato-bold px-4">John Doe</Text>
                                <Text className="text-xl w-full text-blackPrimary font-lato-regular px-4 mb-2">Tsy intelligence artificielle ilay projetTsy intelligence artificielle ilay projetTsy intelligence artificielle ilay projetTsy intelligence artificielle ilay projet</Text>
                                <Text className="px-4 font-bold">-  Aujourd'hui</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex flex-row w-full justify-center items-center gap-2">
                        <TextInput
                            style={styles.input}
                            placeholder="Écrivez un commentaire..."
                            placeholderTextColor="#999"
                        />
                        <Image source={require("./assets/icons/Sent.png")} className="w-[30] h-[30]" />
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
