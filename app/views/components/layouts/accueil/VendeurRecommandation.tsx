// components/SectionVendeursRecommandes.tsx
import { IBestUser } from "@/helpers/data.type";
import { View, Text, FlatList, Image } from "react-native";


const SectionVendeursRecommandes = ({ seller }: { seller: IBestUser[] | [] }) => {
    const renderVendeurItem = ({ item }: { item: IBestUser }) => (
        <View className="w-[150] h-full flex justify-between items-center">
            <View className="w-full h-[70%] flex flex-col justify-center items-center bg-zinc-100 rounded-xl">
                <Image source={item.imageSource ?
                    { uri: item.imageSource }
                    :
                    require('../../../../assets/images/vendeur1.png')
                 } className="w-[100] h-full"/>
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
                data={seller}
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