import { View,Image,Text,TouchableOpacity } from "react-native";

const AddWallet = () => {
    return(
        <View className=" flex-col  gap-5  h-full">
            <View className=" flex-row justify-between items-center w-3/4 my-3">
                <Image source={require("./assets/icons/Back.png")}/>
                <Text className=" font-syne-semiBold text-3xl">Portefeuille</Text>
            </View>
            <View className="   flex-col justify-around items-center h-full gap-5">
                <View className=" flex-col items-center p-3">
                    <Image source={require("./assets/images/vendeur1.png")} className=""/>
                    <Text className=" text-4xl font-syne-bold text-center">
                        Profitez de paiements plus rapide et plus surs
                    </Text>
                </View>
                <TouchableOpacity className="bg-vert py-3 px-5 w-11/12 rounded-lg">
                    <Text className=" text-center font-syne-semiBold text-lg">Ajouter mon portefeuille</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddWallet