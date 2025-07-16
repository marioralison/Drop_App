import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io("http://192.168.88.21:3000");

interface MessageProps {
    id: string;
    content: string;
    sender: string;
    nom: string;
    timestamp: string;
}

export default function Message() {
    
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const { nom, sender } = useLocalSearchParams();
    const currentUser = sender as string;
    const otherCurrentUser = nom as string;

    const saveMessagesToStorage = async (newMessages: MessageProps[]) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des messages', error);
        }
    };

    const loadMessagesFromStorage = async () => {
        try {
            const stored = await AsyncStorage.getItem('messages');
            if (stored) {
                setMessages(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des messages', error);
        }
    };


    useEffect(() => {
        loadMessagesFromStorage();

        socket.on('receive_message', (data: MessageProps) => {
            setMessages(prev => {
            const updated = [...prev, data];
            saveMessagesToStorage(updated);
            return updated;
            });
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);


    const sendMessage = () => {
        if (message.trim() !== '') {
            const newMessage: MessageProps = {
                id: Date.now().toString(),
                content: message,
                sender: currentUser,
                nom: otherCurrentUser,
                timestamp: new Date().toLocaleTimeString(),
            };
            socket.emit('send_message', newMessage);
            setMessage('');
        }
    };

    return (
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[10]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%] h-full flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <View className="w-[85%] h-full flex flex-row justify-center items-start">
                    <View className="w-[20%] h-full flex justify-center items-start">
                        <Image source={require("./assets/icons/user.png")} className="w-[45] h-[45]"/>
                    </View>
                    <View className="w-[80%] h-full flex flex-col justify-center items-start">
                        <Text className="w-[90%] pr-8 text-2xl text-blackPrimary font-syne-bold">{nom as string}</Text>
                        <Text className="w-[90%] pr-8 text-lg text-blackPrimary font-lato-bold">actif</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="w-full h-[80%] flex" showsVerticalScrollIndicator={false}>
                {messages.map((msg) => {
                    
                    const isCurrentUser = msg.sender === currentUser;
                    const isotherCurrentUser = msg.nom === otherCurrentUser;

                    return (
                        <View
                            key={msg.id}
                            className={`mb-5 flex-col gap-2 ${isotherCurrentUser ? 'items-end' : 'items-start'}`}
                        >
                        <View
                            className={`max-w-[85%] p-4 rounded-2xl ${
                            isotherCurrentUser
                                ? 'bg-[#C9D856] rounded-t-xl rounded-br-none'
                                : 'bg-[#f0f0f0] rounded-t-xl rounded-bl-none'
                            }`}
                        >
                            <Text
                            className={`text-base leading-6 ${
                                isCurrentUser ? 'text-black font-bold' : 'text-slate-800 font-bold'
                            }`}
                            >
                            {msg.content}
                            </Text>
                        </View>
                            <Text className={`text-xs text-slate-400 mb-2 font-medium ${isCurrentUser ? 'text-right mr-2' : 'text-left ml-3'}`}>
                                {msg.timestamp}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>

            <View className="w-full h-[10%] flex-row justify-center items-center">
                <View className="w-full h-full flex justify-center items-center relative">
                    <TextInput
                        placeholder="Tapez votre message..."
                        placeholderTextColor="#94a3b8"
                        value={message}
                        onChangeText={setMessage}
                        className="w-full h-[60] pl-5 border rounded-xl text-xl font-lato-regular"
                        multiline
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        className="h-full absolute flex justify-center items-center right-4"
                    >
                        <Image source={require("./assets/icons/Sent.png")} className="size-8" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
