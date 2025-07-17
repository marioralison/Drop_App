// components/SectionPublicationsAccueil.tsx
import { View } from "react-native";
import PublicationAccueil from "../../publicationCard";
import { Dictionnaire, IPublication } from "@/helpers/data.type";


interface Props {
  onCommentPress: (id_post: number) => void;
  checkComment: (id_post: number, is_desc: boolean) => Promise<void>;
  pubs: Omit<IPublication,"iconStarSource" | "iconCommentSource" | "onCommentPress" | "checkComment">[];
  token: string;
  postReactedId: Dictionnaire<number, boolean>;
}

const SectionPublicationsAccueil = ({ onCommentPress, checkComment , pubs, token, postReactedId }: Props ) => {

    return (
        <View className="w-full h-[auto] flex flex-col gap-[22]">
            {
                pubs.map((publication, index) => {
                    const pub: IPublication = {...publication, onCommentPress: onCommentPress, checkComment: checkComment}; 
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