import { router } from "expo-router";
import { Image, TouchableOpacity, Alert } from "react-native";
import { View, Text } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function PhotoImageInput() {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [savedImagePath, setSavedImagePath] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert(
                'Permission refusée',
                'Nous avons besoin de la permission pour accéder à vos photos.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Permet de recadrer l'image
            aspect: [4, 4], // Ratio de recadrage
            quality: 1, // Qualité de 0 à 1
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    }

    const saveImage = async () => {
        if (!selectedImage) {
            Alert.alert('Aucune image sélectionnée', 'Veuillez sélectionner une image avant de la sauvegarder.');
            return null
        }

        try {
            const filename = `profile_${Date.now()}.jpg`;
            const destinationPath = `${FileSystem.documentDirectory}${filename}`;

            await FileSystem.copyAsync({
                from: selectedImage,
                to: destinationPath,
            });
            console.log(destinationPath)
            setSavedImagePath(destinationPath);
            Alert.alert('Succès', 'Image enregistrée avec succès !');

            return destinationPath;
        }
        catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'image :', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde de l\'image.');
            return null
        }
    }

    return(
        <View className="w-full h-full bg-white flex flex-col items-center justify-between p-[25] gap-[20]">
            <View className="w-full flex-1 flex gap-10">
                <TouchableOpacity className="w-full h-[10%] flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </TouchableOpacity>
                <View className="w-full flex-1 flex-col justify-center items-center">
                    <View className="flex flex-col items-center justify-center">
                        <Text className="text-3xl font-syne-bold">Ajouter une photo</Text>
                        <Text className="pt-[2] text-xl font-lato-regular">Veuillez ajouter une image de profil</Text>
                    </View>
                    {selectedImage ? (
                        <TouchableOpacity onPress={pickImage} className="w-full flex-1 flex flex justify-center items-center mt-10">
                            <Image
                                source={{ uri: selectedImage }}
                                className="w-full h-full rounded-xl"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pickImage} className="w-full flex-1 flex border border-black/10 flex justify-center items-center mt-10 rounded-xl">
                            <Text className="text-xl">Ajout image</Text>
                        </TouchableOpacity>
                    )}
                    {selectedImage && (
                        <TouchableOpacity
                            onPress={() => setSelectedImage(null)}
                            className="border px-6 py-1 rounded-full mt-3 w-64"
                        >
                            <Text className="text-black text-center font-lato-regular text-lg">
                                Supprimer
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View className="w-full mt-10">
                <TouchableOpacity
                    onPress={async () => {
                        const imagePath = await saveImage();
                        if (imagePath) {
                            router.push({
                                pathname: '/recognition_screen',
                            })
                        }
                        return
                    }}
                    className={`w-full h-[60] flex justify-center items-center ${selectedImage ? "bg-vert" : "bg-black/20"} px-6 py-5 rounded-xl`}
                    disabled={!selectedImage ? true : false}
                >
                    <Text className="font-lato-bold text-lg">Confirmer</Text>
                    
                </TouchableOpacity> 
            </View>
        </View>
    )
}