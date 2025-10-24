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
  StyleSheet,
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

  useEffect(() => {
    loadMessagesFromStorage();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

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

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      await saveMessagesToStorage(updatedMessages);

      setTimeout(() => {
        if (socketRef.current) {
          console.log("📡 Émission vers socket");
          socketRef.current.emit("send_message", newMessage);
        }
      }, 10);

      setMessage("");
    } catch (error) {
      console.error("❌ Erreur sendMessage:", error);
      Alert.alert("Erreur", "Impossible d'envoyer le message");
    } finally {
      setIsLoading(false);
    }
  };

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerUserInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {otherCurrentUser.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.userName}>{otherCurrentUser}</Text>
              <Text
                style={[
                  styles.connectionStatus,
                  isConnected ? styles.connected : styles.disconnected,
                ]}
              >
                {isConnected ? "🟢" : "🔴"} {connectionStatus}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={testTranslation}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={clearConversation}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🌍</Text>
            <Text style={styles.emptyStateTitle}>
              Chat avec traduction automatique
            </Text>
            <Text style={styles.emptyStateSubtitle}>Français ↔ English</Text>
          </View>
        ) : (
          messages.map((msg) => {
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
                style={[
                  styles.messageWrapper,
                  isCurrentUser
                    ? styles.messageWrapperRight
                    : styles.messageWrapperLeft,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isCurrentUser
                      ? styles.messageBubbleUser
                      : styles.messageBubbleOther,
                  ]}
                >
                  {/* Message original */}
                  <View style={styles.messageContent}>
                    <Text
                      style={[
                        styles.messageText,
                        isCurrentUser
                          ? styles.messageTextUser
                          : styles.messageTextOther,
                      ]}
                    >
                      {msg.content}
                    </Text>

                    {/* Status de traduction */}
                    {msg.translationStatus === "pending" && (
                      <View style={styles.translationPending}>
                        <ActivityIndicator
                          size="small"
                          color={isCurrentUser ? "white" : "#3B82F6"}
                        />
                        <Text
                          style={[
                            styles.translationPendingText,
                            isCurrentUser
                              ? styles.translationPendingTextUser
                              : styles.translationPendingTextOther,
                          ]}
                        >
                          Traduction...
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Traduction */}
                  {hasTranslation && (
                    <View
                      style={[
                        styles.translationContainer,
                        isCurrentUser
                          ? styles.translationContainerUser
                          : styles.translationContainerOther,
                      ]}
                    >
                      <Text style={styles.translationLabel}>
                        🔄 {msg.originalLang?.toUpperCase()} →{" "}
                        {msg.targetLang?.toUpperCase()}
                      </Text>
                      <Text
                        style={[
                          styles.translationText,
                          isCurrentUser
                            ? styles.translationTextUser
                            : styles.translationTextOther,
                        ]}
                      >
                        {msg.translated}
                      </Text>
                    </View>
                  )}

                  {/* Erreur */}
                  {msg.error && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>⚠️ {msg.error}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.messageTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Input zone */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Écrivez en français ou anglais..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={isLoading || !message.trim() || !isConnected}
            style={[
              styles.sendButton,
              (isLoading || !message.trim() || !isConnected) &&
                styles.sendButtonDisabled,
            ]}
          >
            <Text style={styles.sendButtonText}>{isLoading ? "⏳" : "➤"}</Text>
          </TouchableOpacity>
        </View>

        {!isConnected && (
          <View style={styles.disconnectedBanner}>
            <Text style={styles.disconnectedText}>
              🔴 Connexion perdue - Reconnexion en cours...
            </Text>
          </View>
        )}
      </View>

      {/* Debug info */}
      {__DEV__ && (
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            🐛 Nav: {routerAvailable ? "OK" : "KO"} | Msgs: {messages.length} |
            Status: {connectionStatus}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 18,
  },
  headerUserInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  connectionStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  connected: {
    color: "#16A34A",
  },
  disconnected: {
    color: "#DC2626",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    fontSize: 18,
    color: "#2563EB",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#DC2626",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyStateTitle: {
    color: "#6B7280",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  emptyStateSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageWrapperRight: {
    alignItems: "flex-end",
  },
  messageWrapperLeft: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "85%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  messageBubbleUser: {
    backgroundColor: "#3B82F6",
  },
  messageBubbleOther: {
    backgroundColor: "#FFFFFF",
  },
  messageContent: {
    padding: 16,
  },
  messageText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  messageTextUser: {
    color: "#FFFFFF",
  },
  messageTextOther: {
    color: "#1F2937",
  },
  translationPending: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  translationPendingText: {
    marginLeft: 8,
    fontSize: 12,
  },
  translationPendingTextUser: {
    color: "#BFDBFE",
  },
  translationPendingTextOther: {
    color: "#6B7280",
  },
  translationContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  translationContainerUser: {
    borderTopColor: "#93C5FD",
    backgroundColor: "#60A5FA",
  },
  translationContainerOther: {
    borderTopColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  translationLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 8,
  },
  translationText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
  },
  translationTextUser: {
    color: "#FFFFFF",
  },
  translationTextOther: {
    color: "#374151",
  },
  errorContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#FECACA",
    backgroundColor: "#FEE2E2",
  },
  errorText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "600",
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    paddingHorizontal: 8,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 8,
    maxHeight: 80,
  },
  sendButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  disconnectedBanner: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
  },
  disconnectedText: {
    color: "#DC2626",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  debugInfo: {
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#FDE047",
  },
  debugText: {
    fontSize: 12,
    color: "#92400E",
  },
});
