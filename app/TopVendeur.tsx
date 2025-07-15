
import {View, Text, TouchableOpacity, Image, FlatList} from "react-native";

interface TopVendeurProps {
    imageProduit: any;
    nom: string;
    point: string;
    id: string;
    lieu: string;
}

const topvendeur: TopVendeurProps[] = [
    {
        id: '1',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Chaussure",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '2',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Agrafeuse",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '3',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Speaker",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '4',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Chaussure",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '5',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Speaker",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '6',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Chaussure",
        point: "$15.23",
        lieu: "Antananarivo"
    },
    {
        id: '7',
        imageProduit: require("./assets/images/agraffeuse.png"),
        nom: "Chaussure",
        point: "$15.23",
        lieu: "Antananarivo"
    }
];

export default function TopVendeur() {
    const renderItem = ({ item, index }: { item: TopVendeurProps, index: number }) => (
        <View className={`bg-green-100 rounded-2xl p-4 items-center ${index % 2 === 0 ? 'mr-2' : 'ml-2'} mb-4`} style={{width: '48%'}}>
            <Image source={item.imageProduit} className="w-20 h-20 mb-3" style={{resizeMode: 'contain'}} />
            
            <View className="items-center w-full">
                <Text className="text-sm font-semibold text-gray-800 mb-1">{item.nom}</Text>
                <Text className="text-base font-bold text-gray-900">{item.point}</Text>
                <Text className="text-xs text-gray-600 font-bold">{item.lieu}</Text>
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
                    Top Vendeurs
                </Text>
            </View>

            {/* Products Grid */}
            <View className="flex-1 px-4">
                <FlatList
                    data={topvendeur}
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