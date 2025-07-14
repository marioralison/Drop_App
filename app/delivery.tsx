import { View,Text,Image,TouchableOpacity } from "react-native";
import { useState } from "react";

const TABS = [
  { id: "during", title: "En cours" },
  { id: "deliver", title: "Livré" },
];


const TabContent = ({ tabId }: { tabId: string }) => {
  switch (tabId) {
    case "during":
      return <Text >commande en cours</Text>;
    case "deliver":
      return <Text >commande livré</Text>;
  }
};
const Delivery = () => {
    const [activeTab, setActiveTab] = useState("during");
    return (
        <View >
           <View className="flex flex-row items-center justify-center gap-16">
                 <Image source={require("./assets/icons/Back.png")} className="size-7" />
                  <Text className="text-4xl text-blackPrimary font-syne-bold ">
                    Livraisons
                </Text>
           </View>

           <View className="flex flex-row items-center gap-3  mt-4 px-4">
               {TABS.map((tab) => (
                     <TouchableOpacity
                          key={tab.id}
                          onPress={() => setActiveTab(tab.id)}
                          className="px-4 py-2 rounded-lg bg-gray-700"
                     >
                          <Text
                             style={{ 
                                color: activeTab === tab.id ? 'red' : '#000',
                                backgroundColor: activeTab === tab.id ? '#fff' : 'transparent',
                             }}
                             className="text-sm font-syne-bold">
                                {tab.title} 

                          </Text>
                     </TouchableOpacity>
               ))}
           </View>
        </View>
    );
}

export default Delivery;