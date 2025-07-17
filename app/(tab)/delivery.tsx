import { View, Text, Image, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from 'expo-router';

const TABS = [
  { id: "during", title: "En cours (1)" },
  { id: "deliver", title: "Livré (2)" },
];

const TabContent = ({ tabId }: { tabId: string }) => {
  switch (tabId) {
    case "during":
      return (
        <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className="font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className="font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className="font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
        </ScrollView>
      );
    case "deliver":
      return (
        <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
          <View className="w-full h-[110] mt-[10] flex flex-row justify-between items-center py-[8] px-[12] rounded-2xl bg-gray-100">
            <View className="flex justify-center items-center">
              <Image source={require("../assets/images/shoes.png")} className="h-[80] w-[80]"/>
            </View>

            <View>
              <Text className="font-bold text-2xl font-syne-bold text-blackPrimary">
                Agraffe
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-lato-bold">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-lato-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :
                <Text className=" font-lato-bold"> 25 Avril 2025</Text>
              </Text>
            </View>

            <View className="flex flex-col justify-center items-end">
              <Text className=" text-gray-400 text-lg font-lato-bold">Total</Text>
              <Text className="font-lato-bold text-xl">Ar 1004</Text>
            </View>
          </View>
        </ScrollView>
      );
  }
};
const Delivery = () => {
  const router = useRouter();
  const handleGoBack = () => {
      router.back();
  };
  const [activeTab, setActiveTab] = useState("during");

  return (
    <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[10]">

      <View className="w-full h-[50] flex flex-row justify-between items-center">
        <Pressable onPress={handleGoBack} className="w-[10%]  flex justify-center">
            <Image source={require("../assets/icons/Back.png")} className="w-[30] h-[30]"/>
        </Pressable>
        <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Livraisons</Text>
      </View>

      <View className="flex flex-col items-center gap-[15]">
        <View className=" flex flex-row justify-center items-center gap-[16] w-full">
          {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`px-4 flex justify-center items-center text-center w-1/3 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-black"
                    : "bg-transparent-black border"
                }`}
              >
                <Text
                  style={{
                    color: activeTab === tab.id ? "white" : "black",
                  }}
                  className="text-sm text-center font-lato-bold w-full"
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <TabContent tabId={activeTab} />
      </View>
    </View>
  );
};

export default Delivery;