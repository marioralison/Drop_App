import { IProduct } from "@/helpers/data.type";
import { View, Text, FlatList, Image } from "react-native";

interface Props {
    productLocal: IProduct[]
}

const SectionProduitsLocaux = ({ productLocal }: Props ) => {
    const renderProduitLocalItem = ({ item }: { item: IProduct }) => (
        <View className="w-[150] h-full flex justify-between items-center bg-lime-50 px-[10] py-[12] rounded-xl">
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Image 
                    source={
                        item.user.profile_url ?
                        { uri: item.user.profile_url }
                        : require('../../../../assets/icons/avatar.png')
                    } 
                className="w-[26] h-[26]" />
                <Text className="text-xl text-blackPrimary font-lato-regular">{item.user.lastname}</Text>
            </View>
            <View className="w-full h-[70%] flex justify-center items-center">
                <Image source={
                    item.image_url?
                    (
                        { uri: item.image_url }
                    ) : (
                        require("../../../../assets/icons/user.png")
                    )
                } className="w-[100] h-[100]" resizeMode="contain" />
            </View>
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Text className="text-xl text-blackPrimary font-lato-regular">{item.description}</Text>
                <Text className="text-xl text-blackPrimary font-lato-bold">{(item.unit_price)? (item.unit_price)+ " Ar" : "contact us"}</Text>
            </View>
        </View>
    );

    return (
        <View className="w-full h-[220] flex justify-between items-center gap-[12]">
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Text className="text-2xl text-blackPrimary font-syne-bold">Produits locaux</Text>
                <Text className="text-2xl text-blackPrimary font-lato-regular">Voir plus</Text>
            </View>
            <FlatList
                data={productLocal}
                renderItem={renderProduitLocalItem}
                keyExtractor={(item) => item.id+""}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ columnGap: 20}} // Maintient l'espacement entre les produits
            />
        </View>
    );
};

export default SectionProduitsLocaux;