import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface ListPanier {
  id: string;
  nom: string;
  imageProduit: any;
  description: string;
  prix: number;
  nombre: number;
}

const initialData: ListPanier[] = [
  {
    id: 'p1',
    nom: 'Produit 1',
    imageProduit: require('../assets/images/agraffeuse.png'),
    description: 'Agraffeuse bleu',
    prix: 10,
    nombre: 2,
  },
  {
    id: 'p2',
    nom: 'Produit 2',
    imageProduit: require('../assets/images/agraffeuse.png'),
    description: 'Agraffeuse modèle unique',
    prix: 20,
    nombre: 1,
  },
];

export default function Panier() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handlePaiement = () => {
    router.push("/paiement");
  };

  const [panier, setPanier] = useState<ListPanier[]>(initialData);

  const plus = (id: string) => {
    const updated = panier.map((item) =>
      item.id === id ? { ...item, nombre: item.nombre + 1 } : item
    );
    setPanier(updated);
  };

  const moins = (id: string) => {
    const updated = panier.map((item) =>
      item.id === id && item.nombre > 1
        ? { ...item, nombre: item.nombre - 1 }
        : item
    );
    setPanier(updated);
  };

  return (
    <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[20]">

      <View className="w-full h-[50] flex flex-row justify-between items-center">
        <Pressable onPress={handleGoBack} className="w-[10%] flex justify-center">
            <Image source={require("../assets/icons/Back.png")} className="w-[30] h-[30]"/>
        </Pressable>
        <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Panier</Text>
      </View>
      <FlatList
        data={panier}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center p-4 border-b border-gray-200">
            <Image source={item.imageProduit} className="w-16 h-16 mr-4" />
            <View className="flex-1 gap-[7]">
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">{item.nom}</Text>
              <Text className="text-gray-600 font-lato-bold">Prix: ${item.prix}</Text>
              <Text className="text-gray-600 font-lato-regular">Description: {item.description}</Text>
              <View className="flex-row justify-between items-center mt-2">
                <TouchableOpacity
                  onPress={() => moins(item.id)}
                  className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-1"
                >
                  <Image
                    source={require('../assets/icons/Subtract.png')}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
                <Text className="text-gray-600">Quantité: {item.nombre}</Text>
                <TouchableOpacity
                  onPress={() => plus(item.id)}
                  className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-1"
                >
                  <Image
                    source={require('../assets/icons/Plus.png')}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View>
        <Text className='m-3 font-lato-regular text-xl'>Taxe : <Text className='font-lato-bold'> Ar 2000</Text></Text>
        <Text className='m-3 font-lato-regular text-xl'>Frais de service :  <Text className='font-lato-bold'> Ar 4000</Text></Text>
        <Text className="text-3xl font-lato-bold text-center p-[20]">
          Total: ${panier.reduce((total, item) => total + item.prix * item.nombre, 0)}
        </Text>
        <Pressable onPress={() => handlePaiement()} className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
          <Text className="font-lato-bold text-lg">Confirmer</Text>
        </Pressable>
      </View>
    </View>
  );
}