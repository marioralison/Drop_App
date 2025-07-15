import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';

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
    imageProduit: require('./assets/images/agraffeuse.png'),
    description: 'Description du produit 1',
    prix: 10,
    nombre: 2,
  },
  {
    id: 'p2',
    nom: 'Produit 2',
    imageProduit: require('./assets/images/agraffeuse.png'),
    description: 'Description du produit 2',
    prix: 20,
    nombre: 1,
  },
];

export default function Panier() {
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
    <View className="bg-white w-full h-full flex justify-between">
      <View className="w-full h-[10%] flex justify-center items-center">
        <TouchableOpacity onPress={() => console.log('Back pressed')} className="absolute left-5">
            <Image source={require('./assets/icons/Back.png')} className="w-[30] h-[30]" />
        </TouchableOpacity>
        <Text className="text-2xl font-syne-bold">Panier</Text>
      </View>
      <ScrollView className="w-full h-full">
        <FlatList
          data={panier}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-4 border-b border-gray-200">
              <Image source={item.imageProduit} className="w-16 h-16 mr-4" />
              <View className="flex-1">
                <Text className="text-lg font-syne-bold">{item.nom}</Text>
                <Text className="text-gray-600">Prix: ${item.prix}</Text>
                <Text className="text-gray-600">Description: {item.description}</Text>
                <View className="flex-row justify-between items-center mt-2">
                  <TouchableOpacity
                    onPress={() => moins(item.id)}
                    className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-1"
                  >
                    <Image
                      source={require('./assets/icons/Back.png')}
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                  <Text className="text-gray-600">Quantité: {item.nombre}</Text>
                  <TouchableOpacity
                    onPress={() => plus(item.id)}
                    className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-1"
                  >
                    <Image
                      source={require('./assets/icons/Right.png')}
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View>
        <Text className='m-3'>Details du paiment:</Text>
        <Text className='m-3'>Taxe:</Text>
        <Text className='m-3'>Frais de service:</Text>
        <Text className="text-lg font-syne-bold text-center p-4">
          Total: ${panier.reduce((total, item) => total + item.prix * item.nombre, 0)}
        </Text>
        <TouchableOpacity className="bg-green-600 p-4 rounded-lg m-3">
          <Text className="text-white text-center font-syne-bold">Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
