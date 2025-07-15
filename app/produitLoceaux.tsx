
import {View, Text, TouchableOpacity, Image, FlatList} from "react-native";

interface ProduiLoceauxProps {
    imageProduit: any;
    imageVendeur: any;
    title: string;
    prix: string;
    nom: string;
    id: string;
}

const produitLoceaux: ProduiLoceauxProps[] = [
    {
        id: '1',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Chaussure",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '2',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Agrafeuse",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '3',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Speaker",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '4',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Chaussure",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '5',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Speaker",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '6',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Chaussure",
        prix: "$15.23",
        nom: "Lionel Myres"
    },
    {
        id: '7',
        imageProduit: require("./assets/images/agraffeuse.png"),
        imageVendeur: require("./assets/images/vendeur1.png"),
        title: "Chaussure",
        prix: "$15.23",
        nom: "Lionel Myres"
    }
];

export default function ProduiLoceaux() {
    const renderItem = ({ item, index }: { item: ProduiLoceauxProps, index: number }) => (
        <View className={`bg-green-100 rounded-2xl p-4 items-center ${index % 2 === 0 ? 'mr-2' : 'ml-2'} mb-4`} style={{width: '48%'}}>
            <Image source={item.imageProduit} className="w-20 h-20 mb-3" style={{resizeMode: 'contain'}} />
            
            <View className="items-center w-full">
                <View className="flex-row items-center mb-2">
                    <Image source={item.imageVendeur} className="w-5 h-5 rounded-full mr-2" />
                    <Text className="text-xs text-red-600 font-medium">{item.nom}</Text>
                </View>
                
                <Text className="text-sm font-semibold text-gray-800 mb-1">{item.title}</Text>
                <Text className="text-base font-bold text-gray-900">{item.prix}</Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-100 pt-12">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pb-5">
                <TouchableOpacity className="w-10 h-10 justify-center items-center">
                    <Text className="text-2xl text-gray-800 font-bold">{'<'}</Text>
                </TouchableOpacity>
                
                <Text className="text-2xl font-bold text-gray-800 flex-1 text-center -mr-10">
                    Produits locaux
                </Text>
            </View>

            {/* Products Grid */}
            <View className="flex-1 px-4">
                <FlatList
                    data={produitLoceaux}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                />
            </View>
        </View>
    );
}