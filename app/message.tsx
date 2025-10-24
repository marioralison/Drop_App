import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import sécurisé du router
let useRouter: any, useLocalSearchParams: any;
let routerAvailable = false;

try {
  const routerModule = require("expo-router");
  useRouter = routerModule.useRouter;
  useLocalSearchParams = routerModule.useLocalSearchParams;
  routerAvailable = true;
  console.log("✅ Expo Router disponible");
} catch (error) {
  console.warn("⚠️ Expo Router non disponible:", error.message);
  // Fallbacks pour éviter les erreurs
  useRouter = () => ({
    back: () => console.log("Navigation back non disponible"),
  });
  useLocalSearchParams = () => ({ nom: "User1", sender: "User2" });
  routerAvailable = false;
}

const SOCKET_URL = "http://192.168.1.232:3000";

interface MessageProps {
  id: string;
  content: string;
  sender: string;
  nom: string;
  timestamp: string;
  translated?: string;
  originalLang?: string;
  targetLang?: string;
  translationStatus?: "pending" | "success" | "error";
  error?: string;
}

export default function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Connexion...");
  const scrollViewRef = useRef<ScrollView>(null);
  const socketRef = useRef<any>(null);

  // Utilisation sécurisée des hooks de navigation
  const router = routerAvailable ? useRouter() : null;
  const params = routerAvailable
    ? useLocalSearchParams()
    : { nom: "TestUser", sender: "CurrentUser" };

  const currentUser = params.sender as string;
  const otherCurrentUser = params.nom as string;
  const roomId = [currentUser, otherCurrentUser].sort().join("_");
  const conversationKey = `messages_${roomId}`;

  console.log("🔧 Debug Message Component:");
  console.log("Router disponible:", routerAvailable);
  console.log("Current User:", currentUser);
  console.log("Other User:", otherCurrentUser);
  console.log("Room ID:", roomId);

  // Fonction de retour sécurisée
  const handleGoBack = () => {
    try {
      if (router && routerAvailable) {
        router.back();
      } else {
        console.log("Navigation non disponible, utilisation du BackHandler");
        BackHandler.exitApp();
      }
    } catch (error) {
      console.error("Erreur navigation:", error);
      Alert.alert("Info", "Navigation non disponible");
    }
  };

  // Gestion du bouton retour Android
  useEffect(() => {
    const backAction = () => {
      handleGoBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Initialiser Socket
  useEffect(() => {
    console.log("🔌 Initialisation Socket...");
    setConnectionStatus("Connexion...");

    try {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      const socket = socketRef.current;

      socket.on("connect", () => {
        console.log("✅ Socket connecté:", socket.id);
        setIsConnected(true);
        setConnectionStatus("Connecté");
        socket.emit("join_room", roomId);
        console.log("🏠 Rejoint room:", roomId);
      });

      socket.on("room_joined", (data) => {
        console.log("🏠 Room confirmée:", data);
        setConnectionStatus("En ligne");
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket déconnecté");
        setIsConnected(false);
        setConnectionStatus("Hors ligne");
      });

      socket.on("connect_error", (error: any) => {
        console.error("❌ Erreur connexion socket:", error);
        setIsConnected(false);
        setConnectionStatus("Erreur de connexion");
      });

      socket.on("receive_message", (data: MessageProps) => {
        console.log("📨 Message reçu:", {
          id: data.id,
          content: data.content,
          translated: data.translated,
          sender: data.sender,
        });

        // Utiliser une fonction de mise à jour qui ne dépend pas de la navigation
        updateMessages(data);
      });

      return () => {
        console.log("🧹 Nettoyage socket...");
        if (socket) {
          socket.disconnect();
        }
      };
    } catch (error) {
      console.error("❌ Erreur initialisation socket:", error);
      setConnectionStatus("Erreur d'initialisation");
    }
  }, [roomId]);

  // Fonction séparée pour mettre à jour les messages (sans dépendances navigation)
  const updateMessages = (newMessage: MessageProps) => {
    setMessages((prevMessages) => {
      const existingIndex = prevMessages.findIndex(
        (msg) => msg.id === newMessage.id
      );

      if (existingIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[existingIndex] = {
          ...updatedMessages[existingIndex],
          ...newMessage,
        };
        console.log("🔄 Message mis à jour avec traduction");
        saveMessagesToStorage(updatedMessages);
        return updatedMessages;
      } else {
        const newMessages = [...prevMessages, newMessage];
        console.log("✅ Nouveau message ajouté, total:", newMessages.length);
        saveMessagesToStorage(newMessages);
        return newMessages;
      }
    });
  };

  // Charger les messages au démarrage
  useEffect(() => {
    loadMessagesFromStorage();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Sauvegarder les messages - fonction pure sans dépendances navigation
  const saveMessagesToStorage = async (newMessages: MessageProps[]) => {
    try {
      await AsyncStorage.setItem(conversationKey, JSON.stringify(newMessages));
      console.log("💾 Messages sauvegardés:", newMessages.length);
    } catch (error) {
      console.error("❌ Erreur sauvegarde:", error);
    }
  };

  const loadMessagesFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem(conversationKey);
      if (stored) {
        const parsedMessages = JSON.parse(stored) as MessageProps[];
        console.log("📂 Messages chargés:", parsedMessages.length);
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error("❌ Erreur chargement:", error);
    }
  };

  // FIX PRINCIPAL : Fonction d'envoi de message isolée
  const sendMessage = async () => {
    console.log("📤 Début sendMessage");

    if (!message.trim()) {
      console.log("⚠️ Message vide ignoré");
      return;
    }

    if (!isConnected || !socketRef.current) {
      Alert.alert("Erreur", "Connexion au serveur perdue. Veuillez réessayer.");
      return;
    }

    // Isoler la logique d'envoi pour éviter les conflits de navigation
    try {
      setIsLoading(true);

      const newMessage: MessageProps = {
        id: `${currentUser}_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        content: message.trim(),
        sender: currentUser,
        nom: otherCurrentUser,
        timestamp: new Date().toISOString(),
        translationStatus: "pending",
      };

      console.log("📤 Création message:", newMessage.id);

      // Ajouter immédiatement le message localement
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      await saveMessagesToStorage(updatedMessages);

      // Envoyer via socket dans un timeout pour éviter les conflits
      setTimeout(() => {
        if (socketRef.current) {
          console.log("📡 Émission vers socket");
          socketRef.current.emit("send_message", newMessage);
        }
      }, 10);

      // Reset de l'input
      setMessage("");
    } catch (error) {
      console.error("❌ Erreur sendMessage:", error);
      Alert.alert("Erreur", "Impossible d'envoyer le message");
    } finally {
      setIsLoading(false);
    }
  };

  // Test de traduction - fonction isolée
  const testTranslation = async () => {
    try {
      console.log("🧪 Test de traduction");
      const response = await fetch(`${SOCKET_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Bonjour, comment allez-vous ?" }),
      });

      const result = await response.json();
      Alert.alert(
        "Test Traduction",
        `Original: ${result.original}\nTraduit: ${result.translated}`
      );
    } catch (error) {
      console.error("❌ Erreur test:", error);
      Alert.alert("Erreur", "Test de traduction échoué");
    }
  };

  const clearConversation = () => {
    Alert.alert(
      "Effacer la conversation",
      "Voulez-vous vraiment effacer tous les messages ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Effacer",
          style: "destructive",
          onPress: async () => {
            setMessages([]);
            try {
              await AsyncStorage.removeItem(conversationKey);
              console.log("🗑️ Conversation effacée");
            } catch (error) {
              console.error("❌ Erreur effacement:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="pt-12 pb-4 px-5 bg-white rounded-b-3xl shadow-sm">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={handleGoBack}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Text className="text-lg">←</Text>
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center ml-4">
            <View className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">
                {otherCurrentUser.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-xl font-bold text-gray-800">
                {otherCurrentUser}
              </Text>
              <Text
                className={`text-sm font-medium ${
                  isConnected ? "text-green-600" : "text-red-600"
                }`}
              >
                {isConnected ? "🟢" : "🔴"} {connectionStatus}
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={testTranslation}
              className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center"
            >
              <Text className="text-blue-600 text-lg">🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={clearConversation}
              className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
            >
              <Text className="text-red-600 text-lg">🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-6xl mb-4">🌍</Text>
            <Text className="text-gray-500 text-lg text-center font-medium">
              Chat avec traduction automatique
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Français ↔ English
            </Text>
          </View>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = msg.sender === currentUser;
            const hasTranslation =
              msg.translated &&
              msg.translated !== msg.content &&
              !msg.translated.includes("[erreur") &&
              !msg.translated.includes("[EN]") &&
              !msg.translated.includes("[FR]");

            return (
              <View
                key={msg.id}
                className={`mb-4 flex ${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                <View
                  className={`max-w-[85%] ${
                    isCurrentUser ? "bg-blue-500" : "bg-white"
                  } rounded-2xl shadow-sm overflow-hidden`}
                >
                  {/* Message original */}
                  <View className="p-4">
                    <Text
                      className={`text-base ${
                        isCurrentUser ? "text-white" : "text-gray-800"
                      } font-medium leading-relaxed`}
                    >
                      {msg.content}
                    </Text>

                    {/* Status de traduction */}
                    {msg.translationStatus === "pending" && (
                      <View className="flex-row items-center mt-2">
                        <ActivityIndicator
                          size="small"
                          color={isCurrentUser ? "white" : "#3B82F6"}
                        />
                        <Text
                          className={`ml-2 text-xs ${
                            isCurrentUser ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          Traduction...
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Traduction */}
                  {hasTranslation && (
                    <View
                      className={`px-4 pb-4 pt-2 border-t ${
                        isCurrentUser
                          ? "border-blue-300 bg-blue-400"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <Text className="text-xs font-bold text-gray-500 mb-2">
                        🔄 {msg.originalLang?.toUpperCase()} →{" "}
                        {msg.targetLang?.toUpperCase()}
                      </Text>
                      <Text
                        className={`text-sm font-medium ${
                          isCurrentUser ? "text-white" : "text-gray-700"
                        } leading-relaxed`}
                      >
                        {msg.translated}
                      </Text>
                    </View>
                  )}

                  {/* Erreur */}
                  {msg.error && (
                    <View className="px-4 pb-4 pt-2 border-t border-red-200 bg-red-50">
                      <Text className="text-xs text-red-600 font-medium">
                        ⚠️ {msg.error}
                      </Text>
                    </View>
                  )}
                </View>

                <Text className="text-xs text-gray-400 mt-1 px-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Input zone */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <TextInput
            placeholder="Écrivez en français ou anglais..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            className="flex-1 text-base text-gray-800 py-2 max-h-20"
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={isLoading || !message.trim() || !isConnected}
            className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${
              isLoading || !message.trim() || !isConnected
                ? "bg-gray-300"
                : "bg-blue-500 shadow-lg"
            }`}
          >
            <Text className="text-white text-lg">{isLoading ? "⏳" : "➤"}</Text>
          </TouchableOpacity>
        </View>

        {!isConnected && (
          <View className="mt-2 px-4 py-2 bg-red-50 rounded-lg">
            <Text className="text-red-600 text-sm text-center font-medium">
              🔴 Connexion perdue - Reconnexion en cours...
            </Text>
          </View>
        )}
      </View>

      {/* Debug info */}
      {__DEV__ && (
        <View className="bg-yellow-100 p-3 border-t border-yellow-200">
          <Text className="text-xs text-yellow-800">
            🐛 Nav: {routerAvailable ? "OK" : "KO"} | Msgs: {messages.length} |
            Status: {connectionStatus}
          </Text>
        </View>
      )}
    </View>
  );
}
