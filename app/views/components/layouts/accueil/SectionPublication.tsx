// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { IPublication } from "@/helpers/data.type";


interface Props {
  onCommentPress: () => void;
  pubs: IPublication[];
}

const SectionPublicationsAccueil = ({ onCommentPress, pubs }: Props ) => {

    
    return (
        <View className="w-full flex flex-col gap-[22]">
            {
                pubs.map((publication, index) => {
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