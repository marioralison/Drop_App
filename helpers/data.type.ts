import { ImageSourcePropType } from "react-native";

interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    tel: string;
    region: string;
    pays: string;
    role: UserRole
    preference_product: string | null;
    adress: string | null;
    profile_url: string | null;
    code_postal: string | null;
    confirmPassword: string;
}

interface IPublication {
    id: number;
    nomUtilisateur: string;
    villeUtilisateur: string;
    datePublication: string;
    heurePublication: string;
    textePublication: string;
    imagePublicationSource: string | null;
    note: number;
    nombreReactions: number;
    prix: string;
    nombreCommentaires: number;
    imageUtilisateurSource: string | null;
    onCommentPress: () => void;
}

interface IBestUser {
    id: string;
    nom: string;
    ville: string;
    imageSource: string | null;
    note: number;
}

class Dictionnaire<K,V> {
    private map = new Map();
    private set = new Set();

    public addValue (key: K,value: V): void {
        this.map.set(key,value);
        this.set.add(value);
    }

    public getValue(key: K): V {
        return this.map.get(key)
    }

    public hasValue(value: V): boolean {
        return (this.set.has(value))? true : false;
    }

    public hasKey(key: K): boolean {
        return (this.map.has(key))? true : false;
    }
}

enum UserRole {
    SELLER="SELLER",
    BUYER="BUYER"
}

export {
    IUser,
    UserRole,
    IPublication,
    IBestUser,
    Dictionnaire
}