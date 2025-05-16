import { View, Text, Pressable } from "react-native";

interface CategorieItemProps {
    item: { id: string; nom: string };
    isSelected: boolean;
    onPress: (id: string) => void;
}

export const CategorieItem = ({ item, isSelected, onPress }: CategorieItemProps) => {
    const buttonStyle = isSelected ? 'bg-blackPrimary rounded-xl' : 'border border-black rounded-xl';
    const textStyle = isSelected ? 'text-white' : 'text-blackPrimary';

    return (
        <Pressable
            className={`w-fit h-full flex justify-center items-center ${buttonStyle}`}
            onPress={() => onPress(item.id)}
        >
            <Text className={`text-xl px-[16] font-lato-bold ${textStyle}`}>
                {item.nom}
            </Text>
        </Pressable>
    );
};