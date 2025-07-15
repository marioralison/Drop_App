// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { IPublication } from "@/helpers/data.type";
import { ImageSourcePropType } from "react-native";


interface Props {
  onCommentPress: () => void;
  pubs: Omit<IPublication,"iconStarSource" | "iconCommentSource" | "onCommentPress">[];
}

const SectionPublicationsAccueil = ({ onCommentPress, pubs }: Props ) => {
    
    return (
        <View className="w-full flex flex-col gap-[22]">
            {
                pubs.map((publication, index) => {
                    const pub: IPublication = {...publication, onCommentPress: onCommentPress}; 
                    return (
                        <PublicationAccueil
                            pub={pub}
                            key={publication.id}
                        />
                    )
                })
            }
        </View>
    );
};

export default SectionPublicationsAccueil;