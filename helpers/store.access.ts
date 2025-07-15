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
        console.error("Error on store.accesss.ts save:",error);
    }
}

async function getValueFor(key: string): Promise<string | null> {
    try {
        if (Platform.OS === "web"){
            return localStorage.getItem(key)
        } else {
            const result: string | null = await SecureStore.getItemAsync(key) as string | null;
            return result
        }
    } catch (error) {
        console.error("Error on store.accesss.ts getValueFor:",error);
        return null;
    }
}

export {
    save,
    getValueFor
}     