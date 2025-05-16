import { useState } from "react";
import { View, ScrollView } from "react-native"
import NavigationBottom from "./views/components/navigation"

import HeaderAccueil from "./views/components/layouts/accueil/Header";
import ProduitLocal from "./views/components/layouts/accueil/ProduitLocal"
import SectionCategories from "./views/components/layouts/accueil/Categorie"
import SectionAnnonce from "./views/components/layouts/accueil/AnnonceInput"
import SectionPublicationsAccueil from "./views/components/layouts/accueil/SectionPublication";
import SectionVendeursRecommandes from "./views/components/layouts/accueil/VendeurRecommandation";

export default function Accueil() {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryPress = (id: string) => {
        setSelectedCategory(id);
    };

    return(
        <View className="w-full h-full bg-white px-[20] py-[20] flex gap-[2%]">

            <HeaderAccueil/>

            <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
                <View className="w-full h-full flex justify-start items-center gap-[22]">

                    <SectionAnnonce/>

                    <ProduitLocal/>

                    <SectionCategories
                        onCategoryPress={handleCategoryPress}
                        selectedCategoryId={selectedCategory}
                    />

                    <View className="w-full h-[1] bg-black"></View>

                    <SectionPublicationsAccueil/>

                    <View className="w-full h-[1] bg-black"></View>
                    
                    <SectionVendeursRecommandes/>

                </View>
            </ScrollView>

            <View className="w-full h-[9%] flex justify-center items-center">
                <NavigationBottom></NavigationBottom>
            </View>

        </View>
    )
}