import React from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";




interface MessageProps {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

const currentUser = 'User1';

const messages: MessageProps[] = [
  {
    id: 'msg1',
    content: 'Hello, how are you?',
    sender: 'User1',
    timestamp: '2023-10-01 10:00',
  },
  {
    id: 'msg2',
    content: 'I am fine, thank you! And you?',
    sender: 'User2',
    timestamp: '2023-10-01 10:01',
  },
  {
    id: 'msg3',
    content: 'Doing well, excited for our meeting later.',
    sender: 'User1',
    timestamp: '2023-10-01 10:02',
  },
  {
    id: 'msg4',
    content: 'That sounds great! See you there 😊',
    sender: 'User2',
    timestamp: '2023-10-01 10:03',
  }
];

export default function Message() {
  return (
    <View className="flex-1">
      {/* En-tête avec gradient */}
      <View className="pt-12 pb-6 px-5 bg-gradient-to-r  rounded-b-3xl">
        <View className="flex-row gap-4 items-center">
         <TouchableOpacity>
            <Image source={require("./assets/icons/Back.png")} className="size-7"/>
         </TouchableOpacity>
         <View className="flex flex-row items-center">
             <Image source={require("./assets/images/vendeur1.png")} className="size-14"/>
            <Text className="text-2xl font-syne-bold text-gray-800">Fano</Text>
         </View>
        </View>
      </View>

      {/* Liste des messages */}
      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>
        {messages.map((message) => {
          const isCurrentUser = message.sender === currentUser;
          
          return (
            <View
              key={message.id}
              className={`mb-5 flex-col gap-2 ${isCurrentUser ? 'items-end' : 'items-start'}`}
            >
              
              <View
                className={`max-w-[85%] p-4 rounded-2xl  ${
                  isCurrentUser 
                    ? 'bg-[#C9D856] rounded-t-xl rounded-br-none' 
                    : 'bg-[#f0f0f0] rounded-t-xl rounded-bl-none'
                }`}
              >
                {/* <Text
                  className={`text-xs font-semibold mb-1 ${
                    isCurrentUser ? 'text-white text-opacity-90 ' : 'text-slate-500 font-bold'
                  }`}
                >
                  {message.sender}
                </Text> */}
                <Text
                  className={`text-base leading-6 ${
                    isCurrentUser ? 'text-black font-bold' : 'text-slate-800 font-bold'
                  }`}
                >
                  {message.content}
                </Text>
              </View>
              <Text className={`text-xs text-slate-400 mb-2 font-medium ${isCurrentUser ? 'text-right mr-2' : 'text-left ml-3'}`}>
                {message.timestamp}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Champ de saisie amélioré */}
      <View className="flex-row items-center px-4 py-3 ">
        <View className="flex-1 relative">
          <TextInput
            placeholder="Tapez votre message..."
            placeholderTextColor="#94a3b8"
            className="text-base text-slate-800 border border-black rounded-lg px-5"
            multiline
            
          />
          <TouchableOpacity className="w-12 h-12 rounded-full absolute right-0 justify-center items-center shadow-lg shadow-indigo-500/30">
            <Image source={require("./assets/icons/Sent.png")} className="size-5 "/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}