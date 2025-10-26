import { View, Image, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import { FlatList } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


interface UserList {
    id: string;
    nom: string;
    imagePdp: any;
}

const dataUserList: UserList[] = [
    {
        id: 'ul1',
        nom: 'Fano',
        imagePdp: require('../././assets/images/react-logo.png'),
    },
    {
        id: 'ul2',
        nom: 'Mario',
        imagePdp: require('../././assets/images/react-logo.png'),
    },
];

export default function Chat() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState('Fano');

    // Charger l'utilisateur actuel depuis AsyncStorage
    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('currentUser');
            if (savedUser) {
                setCurrentUser(savedUser);
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'utilisateur:', error);
        }
    };

    const saveCurrentUser = async (user: string) => {
        try {
            await AsyncStorage.setItem('currentUser', user);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
        }
    };

    const switchUser = () => {
        Alert.alert(
            "Changer d'utilisateur",
            "Quel utilisateur voulez-vous être ?",
            [
                {
                    text: "Fano",
                    onPress: () => {
                        setCurrentUser('Fano');
                        saveCurrentUser('Fano');
                    }
                },
                {
                    text: "Mario", 
                    onPress: () => {
                        setCurrentUser('Mario');
                        saveCurrentUser('Mario');
                    }
                },
                {
                    text: "Annuler",
                    style: "cancel"
                }
            ]
        );
    };

    const handleUserPress = (selectedUser: UserList) => {
        if (selectedUser.nom === currentUser) {
            Alert.alert(
                "Attention",
                "Vous ne pouvez pas vous envoyer un message à vous-même. Changez d'utilisateur d'abord.",
                [{ text: "OK" }]
            );
            return;
        }

        router.push({
            pathname: "/message",
            params: {
                nom: selectedUser.nom,    // le destinataire
                sender: currentUser,      // celui qui envoie
            },
        });
    };

    return (
        <View className="bg-white w-full h-full flex justify-between">
            <View className="w-full h-[10%] flex justify-center items-center">
                <TouchableOpacity onPress={() => router.back()} className="absolute left-5">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </TouchableOpacity>
                
                {/* Bouton pour changer d'utilisateur */}
                <TouchableOpacity 
                    onPress={switchUser} 
                    className="absolute right-5 bg-blue-500 px-3 py-1 rounded-full"
                >
                    <Text className="text-white text-xs font-bold">
                        {currentUser}
                    </Text>
                </TouchableOpacity>
                
                <Text className="text-2xl font-syne-bold">Messages</Text>
            </View>
            
            {/* Indicateur de l'utilisateur actuel */}
            <View className="w-full bg-blue-50 p-3 border-b border-blue-200">
                <Text className="text-center text-blue-700 font-bold">
                    🟢 Connecté en tant que: {currentUser}
                </Text>
                <Text className="text-center text-blue-500 text-xs mt-1">
                    Appuyez sur votre nom en haut à droite pour changer
                </Text>
            </View>
            
            <View className="w-full flex-1">
                <FlatList
                    data={dataUserList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => handleUserPress(item)}
                            className={`w-full h-[70] flex flex-row items-center px-5 ${
                                item.nom === currentUser ? 'bg-gray-100 opacity-50' : 'bg-white'
                            }`}
                        >
                            <Image
                                source={item.imagePdp}
                                className="w-[50] h-[50] rounded-full mr-3"
                            />
                            <View className="flex flex-row items-center w-[70%]">
                                <View className="w-full flex flex-col">
                                    <View className="flex flex-row items-center">
                                        <Text className="text-lg font-syne-regular">
                                            {item.nom}
                                        </Text>
                                        {item.nom === currentUser && (
                                            <Text className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                                                C'est vous
                                            </Text>
                                        )}
                                    </View>
                                    <Text className="text-gray-500 font-bold">
                                        {item.nom === currentUser 
                                            ? "Vous ne pouvez pas vous parler"
                                            : "Bonjour, comment ça va ?"
                                        }
                                    </Text>
                                </View>
                                <Text>12:00</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>

            {/* Instructions pour les tests */}
            <View className="w-full bg-yellow-50 p-4 border-t border-yellow-200">
                <Text className="text-yellow-800 font-bold text-center mb-2">
                    🧪 Mode Test
                </Text>
                <Text className="text-yellow-700 text-xs text-center">
                    1. Choisissez un utilisateur en haut à droite{'\n'}
                    2. Cliquez sur l'autre utilisateur pour commencer une conversation{'\n'}
                    3. Envoyez des messages{'\n'}
                    4. Revenez ici et changez d'utilisateur pour répondre
                </Text>
            </View>
        </View>
    );
}