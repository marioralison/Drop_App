import React, { useEffect, useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { socket, sendMessage, MessageProps } from "@/app/services/socket.service";

export default function Message() {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const { id_sender, id_recever, nom_sender } = useLocalSearchParams();

    const handleGoBack = () => router.back();

    const loadMessagesFromStorage = async () => {
        try {
            const stored = await AsyncStorage.getItem("messages");
            if (stored) {
                setMessages(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des messages", error);
        }
    };

    const saveMessagesToStorage = async (updated: MessageProps[]) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(updated));
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des messages", error);
        }
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: MessageProps = {
            id_expediteur: Number(id_sender),
            id_receiveur: Number(id_recever),
            content: message.trim(),
        };

        setMessages((prev) => {
            const updated = [...prev, newMessage];
            saveMessagesToStorage(updated);
            return updated;
        });

        sendMessage(newMessage);

        setMessage("");
    };

    useEffect(() => {
        loadMessagesFromStorage();

        socket.on("on_receive_message", (data: MessageProps) => {
            setMessages((prev) => {
                const updated = [...prev, data];
                saveMessagesToStorage(updated);
                return updated;
            });
        });

        return () => {
            socket.off("on_receive_message");
        };
    }, []);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[10]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%] h-full flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]" />
                </Pressable>
                <View className="w-[85%] flex flex-row justify-start items-start">
                    <Image source={require("./assets/icons/user.png")} className="w-[45] h-[45]" />
                    <View className="ml-3">
                        <Text className="text-2xl text-black font-syne-bold">{nom_sender as string}</Text>
                        <Text className="text-lg text-gray-500 font-lato-bold">actif</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                ref={scrollViewRef}
                className="w-full h-[80%] flex"
                showsVerticalScrollIndicator={false}
            >
                {messages.map((msg, index) => {
                    const isSentByMe = msg.id_expediteur === Number(id_sender);
                    return (
                        <View
                        key={`${msg.id_expediteur}-${msg.id_receiveur}-${index}`}
                        className={`mb-4 flex-col ${isSentByMe ? "items-end" : "items-start"}`}
                        >
                        <View
                            className={`max-w-[80%] p-3 rounded-2xl ${
                            isSentByMe
                                ? "bg-[#C9D856] rounded-t-xl rounded-br-none"
                                : "bg-[#f0f0f0] rounded-t-xl rounded-bl-none"
                            }`}
                        >
                            <Text
                            className={`text-base font-bold ${
                                isSentByMe ? "text-black" : "text-slate-800"
                            }`}
                            >
                            {msg.content}
                            </Text>
                        </View>
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
                        className="w-full h-[60] pl-5 pr-12 border rounded-xl text-xl font-lato-regular"
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        className="h-full absolute right-4 flex justify-center items-center"
                    >
                        <Image source={require("./assets/icons/Sent.png")} className="size-8" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
