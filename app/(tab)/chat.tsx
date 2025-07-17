import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import { FlatList } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface UserList {
    id: string;
    nom: string;
    imagePdp: any;
}

const dataUserList: UserList[] = [
    {
        id: 'ul1',
        nom: 'Fano',
        imagePdp: require('../assets/images/vendeur1.png'),
    },
    {
        id: 'ul2',
        nom: 'Mario',
        imagePdp: require('../assets/images/vendeur1.png'),
    },
    // {
    //     id: 'ul3',
    //     nom: 'Mario Ralison',
    //     imagePdp: require('../././assets/images/react-logo.png'),
    // },
    // {
    //     id: 'ul4',
    //     nom: 'Mario Ralison',
    //     imagePdp: require('../././assets/images/react-logo.png'),
    // },
    // {
    //     id: 'ul5',
    //     nom: 'Mario Ralison',
    //     imagePdp: require('../././assets/images/react-logo.png'),
    // },
];

export default function Chat() {

    const router = useRouter();
    
    const handleGoBack = () => {
    router.back();
    };

    const currentUser = 'Fano';
    const otherCurrentUser = 'Mario';
    

    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[20]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
                    <Image source={require("../assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Messages</Text>
            </View>
            <View className="w-full h-[90%]">
                <FlatList
                    data={dataUserList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push({
                            pathname: '/message',
                            params: { nom: item.nom, sender: currentUser, otherCurrentUser: otherCurrentUser}
                                })
                            } 
                            className="w-full h-[70] flex flex-row items-center px-5"
                        >
                            <Image source={require("../assets/images/vendeur1.png")} className="w-[50] h-[50] rounded-full mr-3" />
                            <View className="flex flex-row items-center w-[70%]">
                                <View className="w-full flex flex-col">
                                    <Text className="text-lg font-syne-regular">{item.nom}</Text>
                                    <Text className="text-gray-500 font-bold">Bonjour, comment ça va ?</Text>
                                </View>
                                <Text>12:00</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}