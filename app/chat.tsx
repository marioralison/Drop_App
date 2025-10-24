import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import React from "react";

interface UserList {
  id: string;
  nom: string;
  imagePdp: any;
}

const dataUserList: UserList[] = [
  {
    id: "ul1",
    nom: "Fano",
    imagePdp: require("../././assets/images/react-logo.png"),
  },
  {
    id: "ul2",
    nom: "Mario",
    imagePdp: require("../././assets/images/react-logo.png"),
  },
];

export default function Chat() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("Fano");

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(savedUser);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur:", error);
    }
  };

  const saveCurrentUser = async (user: string) => {
    try {
      await AsyncStorage.setItem("currentUser", user);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
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
            setCurrentUser("Fano");
            saveCurrentUser("Fano");
          },
        },
        {
          text: "Mario",
          onPress: () => {
            setCurrentUser("Mario");
            saveCurrentUser("Mario");
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
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
        nom: selectedUser.nom,
        sender: currentUser,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Image
            source={require("./assets/icons/Back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={switchUser} style={styles.userButton}>
          <Text style={styles.userButtonText}>{currentUser}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.userIndicator}>
        <Text style={styles.userIndicatorText}>
          🟢 Connecté en tant que: {currentUser}
        </Text>
        <Text style={styles.userIndicatorSubtext}>
          Appuyez sur votre nom en haut à droite pour changer
        </Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={dataUserList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleUserPress(item)}
              style={[
                styles.userItem,
                item.nom === currentUser && styles.userItemDisabled,
              ]}
            >
              <Image source={item.imagePdp} style={styles.avatar} />
              <View style={styles.userInfo}>
                <View style={styles.userDetails}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{item.nom}</Text>
                    {item.nom === currentUser && (
                      <Text style={styles.badge}>C'est vous</Text>
                    )}
                  </View>
                  <Text style={styles.messagePreview}>
                    {item.nom === currentUser
                      ? "Vous ne pouvez pas vous parler"
                      : "Bonjour, comment ça va ?"}
                  </Text>
                </View>
                <Text style={styles.time}>12:00</Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.testMode}>
        <Text style={styles.testModeTitle}>🧪 Mode Test</Text>
        <Text style={styles.testModeText}>
          1. Choisissez un utilisateur en haut à droite{"\n"}
          2. Cliquez sur l'autre utilisateur pour commencer une conversation
          {"\n"}
          3. Envoyez des messages{"\n"}
          4. Revenez ici et changez d'utilisateur pour répondre
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  header: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  userButton: {
    position: "absolute",
    right: 20,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  userButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userIndicator: {
    width: "100%",
    backgroundColor: "#eff6ff",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#bfdbfe",
  },
  userIndicatorText: {
    textAlign: "center",
    color: "#1d4ed8",
    fontWeight: "bold",
  },
  userIndicatorSubtext: {
    textAlign: "center",
    color: "#3b82f6",
    fontSize: 12,
    marginTop: 4,
  },
  listContainer: {
    width: "100%",
    flex: 1,
  },
  userItem: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  userItemDisabled: {
    backgroundColor: "#f3f4f6",
    opacity: 0.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  userDetails: {
    width: "100%",
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
  },
  badge: {
    marginLeft: 8,
    fontSize: 10,
    backgroundColor: "#bbf7d0",
    color: "#166534",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messagePreview: {
    color: "#6b7280",
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
  },
  testMode: {
    width: "100%",
    backgroundColor: "#fefce8",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#fde047",
  },
  testModeTitle: {
    color: "#854d0e",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  testModeText: {
    color: "#a16207",
    fontSize: 12,
    textAlign: "center",
  },
});
