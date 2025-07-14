import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { io } from "socket.io-client";

// ⚠️ À adapter avec ton IP locale
const socket = io("http://192.168.1.232:3000");

interface MessageProps {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

const currentUser = 'User1';

export default function Message() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const router = useRouter();
  const { nom } = useLocalSearchParams();

  useEffect(() => {
    socket.on('receive_message', (data: MessageProps) => {
      setMessages(prev => [...prev, data]);
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
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', newMessage);
      setMessage('');
    }
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="pt-12 pb-6 px-5 bg-white rounded-b-3xl">
        <View className="flex-row gap-4 items-center">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-5">
            <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]" />
          </TouchableOpacity>
          <View className="flex flex-row items-center gap-5 ml-10">
            <Image source={require("./assets/images/vendeur1.png")} className="w-[50] h-[50] rounded-full mr-3" />
            <Text className="text-2xl font-syne-bold text-gray-800">{nom as string}</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>
        {messages.map((msg) => {
          const isCurrentUser = msg.sender === currentUser;

          return (
            <View
              key={msg.id}
              className={`mb-5 flex-col gap-2 ${isCurrentUser ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[85%] p-4 rounded-2xl ${
                  isCurrentUser
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

      {/* Input */}
      <View className="flex-row items-center px-4 py-3">
        <View className="flex-1 relative">
          <TextInput
            placeholder="Tapez votre message..."
            placeholderTextColor="#94a3b8"
            value={message}
            onChangeText={setMessage}
            className="text-base text-slate-800 border border-black rounded-lg px-5 pr-14"
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="w-12 h-12 rounded-full absolute right-1 top-1 justify-center items-center"
          >
            <Image source={require("./assets/icons/Sent.png")} className="size-5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
