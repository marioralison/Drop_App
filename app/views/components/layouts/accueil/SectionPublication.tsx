// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { ImageSourcePropType } from "react-native"; // Import pour le type d'image

interface PublicationData {
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
}

const publication1Data: PublicationData = {
    nomUtilisateur: "Lisa Moore",
    villeUtilisateur: "Californie, USA",
    datePublication: "02 Janv",
    heurePublication: "14:30 pm",
    textePublication: "Chaussure en cuir, fabriqué en tissu fin",
    imagePublicationSource: require("../../../../assets/images/shoes.png"),
    note: 4.6,
    nombreReactions: 24,
    prix: "$45.32",
    nombreCommentaires: 15,
    imageUtilisateurSource: require("../../../../assets/icons/userWoman.png"),
};

const publication2Data: PublicationData = {
    nomUtilisateur: "John Doe",
    villeUtilisateur: "New York, USA",
    datePublication: "15 Mai",
    heurePublication: "09:00 am",
    textePublication: "Superbe tasse à café en céramique",
    imagePublicationSource: require("../../../../assets/images/agraffeuse.png"), // Remplace par l'image de la tasse
    note: 4.9,
    nombreReactions: 35,
    prix: "$12.99",
    nombreCommentaires: 8,
    imageUtilisateurSource: require("../../../../assets/icons/user.png"), // Remplace par l'image de John
};

const SectionPublicationsAccueil = () => {
    return (
        <View className="w-full flex flex-col gap-[22]">
            <PublicationAccueil
                {...publication1Data}
                iconStarSource={require("../../../../assets/icons/Star.png")}
                iconCommentSource={require("../../../../assets/icons/Comments.png")}
            />
            <PublicationAccueil
                {...publication2Data}
                iconStarSource={require("../../../../assets/icons/Star.png")}
                iconCommentSource={require("../../../../assets/icons/Comments.png")}
            />
        </View>
    );
};

export default SectionPublicationsAccueil;