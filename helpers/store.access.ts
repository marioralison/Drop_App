import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

async function save(key: string, value: string) {
    try {
        if (Platform.OS == "web"){
            localStorage.setItem(key,value)
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    } catch (error) {
        console.error("Storage error");
        throw error
    }
}

async function getValueFor(key: string): Promise<string | null> {
    try {
        if (Platform.OS === "web"){
            return localStorage.getItem(key)
        } else {
            const result: string | null = await SecureStore.getItemAsync(key);
            return result
        }
    } catch (error) {
        console.error("Storage error");
        throw error
    }
}

const DROP_API_URL: string = "http://localhost:8080"

export {
    DROP_API_URL,
    save,
    getValueFor
}     