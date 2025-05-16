import { View, Text, FlatList, Image } from "react-native";

interface ProduitLocal {
    id: string;
    nomVendeur: string;
    nomProduit: string;
    prix: string;
    imageSourceVendeur: any;
    imageSourceProduit: any;
}

const dataProduitsLocaux: ProduitLocal[] = [
    {
        id: 'pl1',
        nomVendeur: 'Mario Ralison',
        nomProduit: 'Agraffeuse',
        prix: '$35.23',
        imageSourceVendeur: require('../../../../assets/icons/avatar.png'),
        imageSourceProduit: require('../../../../assets/images/agraffeuse.png'),
    },
    {
        id: 'pl2',
        nomVendeur: 'Lucie Dubois',
        nomProduit: 'Cahier',
        prix: '$12.50',
        imageSourceVendeur: require('../../../../assets/icons/avatar.png'),
        imageSourceProduit: require('../../../../assets/images/agraffeuse.png'),
    },
    {
        id: 'pl3',
        nomVendeur: 'Jean Rakoto',
        nomProduit: 'Stylo',
        prix: '$2.75',
        imageSourceVendeur: require('../../../../assets/icons/avatar.png'),
        imageSourceProduit: require('../../../../assets/images/agraffeuse.png'),
    },
    {
        id: 'pl4',
        nomVendeur: 'Jean Rakoto',
        nomProduit: 'Stylo',
        prix: '$2.75',
        imageSourceVendeur: require('../../../../assets/icons/avatar.png'),
        imageSourceProduit: require('../../../../assets/images/agraffeuse.png'),
    },
    {
        id: 'pl5',
        nomVendeur: 'Jean Rakoto',
        nomProduit: 'Stylo',
        prix: '$2.75',
        imageSourceVendeur: require('../../../../assets/icons/avatar.png'),
        imageSourceProduit: require('../../../../assets/images/agraffeuse.png'),
    },
];

const SectionProduitsLocaux = () => {
    const renderProduitLocalItem = ({ item }: { item: ProduitLocal }) => (
        <View className="w-[150] h-full flex justify-between items-center bg-lime-50 px-[10] py-[12] rounded-xl">
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Image source={item.imageSourceVendeur} className="w-[26] h-[26]" />
                <Text className="text-xl text-blackPrimary font-lato-regular">{item.nomVendeur}</Text>
            </View>
            <View className="w-full h-[70%] flex justify-center items-center">
                <Image source={item.imageSourceProduit} className="w-[100] h-[100]" resizeMode="contain" />
            </View>
            <View className="w-full h-fit flex flex-row justify-between items-center">
                <Text className="text-xl text-blackPrimary font-lato-regular">{item.nomProduit}</Text>
                <Text className="text-xl text-blackPrimary font-lato-bold">{item.prix}</Text>
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
                data={dataProduitsLocaux}
                renderItem={renderProduitLocalItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ columnGap: 20}} // Maintient l'espacement entre les produits
            />
        </View>
    );
};

export default SectionProduitsLocaux;