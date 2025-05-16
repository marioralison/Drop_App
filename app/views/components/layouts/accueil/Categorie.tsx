import { View, Text, FlatList } from "react-native";
import { useState } from 'react';
import { CategorieItem } from "../../categorieItem"; // Assure-toi que le chemin est correct

interface Categorie {
    id: string;
    nom: string;
}

interface CategorieItemProps {
    item: Categorie;
    isSelected: boolean;
    onPress: (id: string) => void;
}

const dataCategories: Categorie[] = [
    { id: 'cat1', nom: 'Catégories' },
    { id: 'cat2', nom: 'Autre Catégorie' },
    { id: 'cat3', nom: 'Encore une' },
    { id: 'cat4', nom: 'Dernière pour l\'exemple' },
];

interface SectionCategoriesProps {
    onCategoryPress: (id: string) => void;
    selectedCategoryId: string | null;
}

const SectionCategories = ({ onCategoryPress, selectedCategoryId }: SectionCategoriesProps) => {
    const renderCategorieItem = ({ item }: { item: Categorie }) => (
        <CategorieItem
            item={item}
            isSelected={item.id === selectedCategoryId}
            onPress={onCategoryPress}
        />
    );

    return (
        <View className="w-full h-[72] flex justify-between items-center gap-[12]">
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Text className="text-2xl text-blackPrimary font-syne-bold">Catégories</Text>
                <Text className="text-2xl text-blackPrimary font-lato-regular">Voir plus</Text>
            </View>
            <FlatList
                data={dataCategories}
                renderItem={renderCategorieItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ columnGap: 20 }}
            />
        </View>
    );
};

export default SectionCategories;