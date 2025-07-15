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
    imagePublicationSource: ImageSourcePropType;
    note: number;
    nombreReactions: number;
    prix: string;
    nombreCommentaires: number;
    imageUtilisateurSource: ImageSourcePropType;
    iconStarSource: ImageSourcePropType;
    iconCommentSource: ImageSourcePropType;
    onCommentPress: () => void;
}


enum UserRole {
    SELLER="SELLER",
    BUYER="BUYER"
}

export {
    IUser,
    UserRole,
    IPublication
}