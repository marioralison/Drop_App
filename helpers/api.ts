import Toast from "react-native-toast-message";
import { DROP_API_URL, save } from "./store.access";
import { IUser } from "./user.type";


const signupUser = async (user: IUser): Promise<boolean> => {
    try {
        const newUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            tel: user.phone,
            pays: user.country,
            role: user.role,
            product_preference: user.preference_product
        }
        const res = await fetch(DROP_API_URL+"/signup",{
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            },
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
        save("token",data.token);
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

const fetchBestArticle = (): string[] => ['Italian',"a","b","c","d","e","f","g","k","y"]

export {
    signupUser,
    fetchBestArticle,
    authentificationUser
}