// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { Dictionnaire, IPublication } from "@/helpers/data.type";
import { useEffect } from "react";


interface Props {
  onCommentPress: () => void;
  pubs: Omit<IPublication,"iconStarSource" | "iconCommentSource" | "onCommentPress">[];
  token: string;
  postReactedId: Dictionnaire<number, boolean>;
}

const SectionPublicationsAccueil = ({ onCommentPress, pubs, token, postReactedId }: Props ) => {

    return (
        <View className="w-full flex flex-col gap-[22]">
            {
                pubs.map((publication, index) => {
                    const pub: IPublication = {...publication, onCommentPress: onCommentPress}; 
                    return (
                        <PublicationAccueil
                            pub={pub}
                            reactionStatus={postReactedId.hasKey(pub.id)}
                            token={token}
                            key={publication.id}
                        />
                    )
                })
            }
        </View>
    );
};

export default SectionPublicationsAccueil;