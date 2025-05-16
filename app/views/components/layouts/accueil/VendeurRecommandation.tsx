// components/SectionVendeursRecommandes.tsx
import { View, Text, FlatList, Image } from "react-native";

interface Vendeur {
    id: string;
    nom: string;
    ville: string;
    imageSource: any;
    note: number;
}

const dataVendeurs: Vendeur[] = [
    { id: '1', nom: 'Mike Thomas', ville: 'Antananarivo, Madagascar', imageSource: require('../../../../assets/images/vendeur1.png'), note: 4.6 },
    { id: '2', nom: 'Sarah Dubois', ville: 'Paris, France', imageSource: require('../../../../assets/images/vendeur1.png'), note: 4.8 },
    { id: '3', nom: 'John Williams', ville: 'New York, USA', imageSource: require('../../../../assets/images/vendeur1.png'), note: 4.5 },
    { id: '4', nom: 'Alice Dupont', ville: 'Bruxelles, Belgique', imageSource: require('../../../../assets/images/vendeur1.png'), note: 4.7 }
];

const SectionVendeursRecommandes = () => {
    const renderVendeurItem = ({ item }: { item: Vendeur }) => (
        <View className="w-[150] h-full flex justify-between items-center">
            <View className="w-full h-[70%] flex flex-col justify-center items-center bg-zinc-100 rounded-xl">
                <Image source={item.imageSource} className="w-[100] h-full"/>
            </View>
            <View className="w-full h-[30%] mt-[8] flex justify-start items-start">
                <View className="w-full h-fit flex flex-row justify-between items-center">
                    <Text className="text-xl text-blackPrimary font-lato-regular">{item.nom}</Text>
                    <View className="w-fit h-fit flex flex-row justify-center items-center gap-[8]">
                        <Image source={require("../../../../assets/icons/Star.png")} className="w-[20] h-[20]" />
                        <Text className="text-2xl text-blackPrimary font-lato-bold">{item.note}</Text>
                    </View>
                </View>
                <Text className="text-xl text-blackPrimary font-lato-bold">{item.ville}</Text>
            </View>
        </View>
    );

    return (
        <View className="w-full h-[280] flex justify-between items-center gap-[12]">
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Text className="text-2xl text-blackPrimary font-syne-bold">Vendeurs mieux notés</Text>
                <Text className="text-2xl text-blackPrimary font-lato-regular">Voir plus</Text>
            </View>
            <FlatList
                data={dataVendeurs}
                renderItem={renderVendeurItem}
                keyExtractor={(item) => item.id} // Important pour le rendu des items
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ columnGap: 20 }} // Ajoute un espace entre les éléments
            />
        </View>
    );
};

export default SectionVendeursRecommandes;