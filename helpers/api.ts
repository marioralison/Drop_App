import Toast from "react-native-toast-message";
import { save } from "./store.access";
import { IUser } from "./user.type";

const DROP_API_URL: string = "http://192.168.243.199:8080";

const signupUser = async (user: IUser): Promise<boolean> => {
    try {
        const newUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            tel: user.tel,
            pays: user.pays,
            role: user.role,
            product_preference: user.preference_product
        }
        const res = await fetch(DROP_API_URL+"/signup",{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if (!res.ok){
            Toast.show({
                type: "error",
                text2: data.message
            })
            return false;
        }
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "inscription réussi"
        })
        save("id",`${data.id}`);
        save("token",`${data.token}`);
        return true;
    } catch (error: any) {
        throw new error;
    }
}

const authentificationUser = async (): Promise<Pick<IUser, "id" | "role" | "email"> | null> => {
    try {
        const res = await fetch(DROP_API_URL+"/auth",{
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();

        if (!res.ok) return null
        const currentUser: Pick<IUser,"id" | "role" | "email"> = data as Pick<IUser,"id" | "role" | "email">
        return currentUser;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: error+""
        })
        throw error
    }
}

const getInfoById = async (token: string,id: string): Promise<Omit<IUser, "password" | "confirmPassword"> | null> => {
    try {
        const res = await fetch(DROP_API_URL+`/user?id_user=${id}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        const data = await res.json();

        if (!res.ok) {
            Toast.show({
                type: "error",
                text1: data.message+""
            });
            return null;
        }

        return data as Omit<IUser, "password" | "confirmPassword">;
    } catch (error) {
        throw error;
    }
}

const fetchBestArticle = (): string[] => ['Italian',"a","b","c","d","e","f","g","k","y"]

export {
    signupUser,
    fetchBestArticle,
    authentificationUser,
    getInfoById
}