// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { IPublication } from "@/helpers/data.type";


const publications: IPublication[] = [
    {
        id: 1,
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
    },
    {
        id: 2,
        nomUtilisateur: "John Doe",
        villeUtilisateur: "New York, USA",
        datePublication: "15 Mai",
        heurePublication: "09:00 am",
        textePublication: "Superbe tasse à café en céramique",
        imagePublicationSource: require("../../../../assets/images/agraffeuse.png"),
        note: 4.9,
        nombreReactions: 35,
        prix: "$12.99",
        nombreCommentaires: 8,
        imageUtilisateurSource: require("../../../../assets/icons/user.png"),
    }
]


const SectionPublicationsAccueil = ({ onCommentPress }: { onCommentPress: () => void }) => {
    return (
        <View className="w-full flex flex-col gap-[22]">
            {
                publications.map((publication, index) => {
                    return (
                        <PublicationAccueil
                            {...publication}
                            iconStarSource={require("../../../../assets/icons/Star.png")}
                            iconCommentSource={require("../../../../assets/icons/Comments.png")}
                            onCommentPress={onCommentPress}
                            key={publication.id}
                        />
                    )
                })
            }
        </View>
    );
};

export default SectionPublicationsAccueil;