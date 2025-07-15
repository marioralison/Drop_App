import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

const TABS = [
  { id: "during", title: "En cours (1)" },
  { id: "deliver", title: "Livré (2)" },
];

const TabContent = ({ tabId }: { tabId: string }) => {
  switch (tabId) {
    case "during":
      return (
        <View className=" flex  justify-center items-center my-3">
          <View className=" w-11/12 flex-row justify-center items-center gap-4 bg-gray-100 py-2 rounded-lg">
            <View>
              <Text className="bg-white">Sary</Text>
            </View>
            <View>
              <Text className="font-bold  text-2xl font-syne-semiBold text-blackPrimary">
                Speaker Bloom
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-b">$251</Text>
              </Text>
              <Text>
                Quantite : <Text className=" font-bold">4</Text>
              </Text>
              <Text>
                Date de livraison :{" "}
                <Text className=" font-semibold">25 Avril 2025,09:45 PM</Text>
              </Text>
            </View>
            <View className=" flex-col  justify-center items-center">
              <Text className=" text-gray-400 text-lg font-semibold">
                Total
              </Text>
              <Text className=" font-bold text-xl">$1004</Text>
            </View>
          </View>
        </View>
      );
    case "deliver":
      return (
        <View className=" flex  justify-center items-center my-3">
          <View className=" w-11/12 flex-row justify-center items-center gap-4 bg-gray-100 py-2 rounded-lg">
            <View>
              <Text className="bg-white">Sary</Text>
            </View>
            <View>
              <Text
                className="font-bold  text-2xl font-syne-semiBold 
              text-blackPrimary"
              >
                Agrafeuse
              </Text>
              <Text>
                Prix unitaire : <Text className=" font-bold">$15</Text>
              </Text>
              <Text>
                Quantite : <Text className="font-bold">2</Text>
              </Text>
              <Text>
                Livré :{" "}
                <Text className=" font-semibold">11 Juillet 2025,07:30 PM</Text>
              </Text>
            </View>
            <View className=" flex-col  justify-center items-center">
              <Text className=" text-gray-400 text-lg font-semibold">
                Total
              </Text>
              <Text className=" font-bold text-xl">$1004</Text>
            </View>
          </View>
        </View>
      );
  }
};
const Delivery = () => {
  const [activeTab, setActiveTab] = useState("during");
  return (
    <View>
      <View className="flex flex-row items-center justify-center gap-16">
        <Image source={require("./assets/icons/Back.png")} className="size-7" />
        <Text className="text-4xl text-blackPrimary font-syne-bold ">
          Livraisons
        </Text>
      </View>
      <View className="flex flex-row items-center gap-3  mt-4 px-4">
        <View className=" flex justify-center items-center w-full">
          <View className="flex flex-row items-center gap-3  mt-4 px-4 ">
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`px-4 flex justify-center items-center text-center w-1/3 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-black"
                    : "bg-transparent border border-black"
                }`}
              >
                <Text
                  style={{
                    color: activeTab === tab.id ? "white" : "black",
                  }}
                  className="text-sm text-center font-syne-bold w-full"
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className=" font-syne-bold">
          <TabContent tabId={activeTab} />
        </View>
      </View>
    </View>
  );
};

export default Delivery;
