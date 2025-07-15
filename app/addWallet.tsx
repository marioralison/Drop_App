import { View,Image,Text,TouchableOpacity } from "react-native";

const AddWallet = () => {
    return(
        <View className=" flex-col justify-center items-center gap-5">
            <View className=" flex-row justify-between items-center w-3/4">
                <Image source={require("./assets/icons/Back.png")}/>
                <Text className=" font-syne-semiBold text-3xl">Portefeuille</Text>
            </View>
            <View>
                <Text className=" text-4xl font-syne-bold text-center">
                    Profitez de paiements plus rapide et plus surs</Text>
            </View>
            <TouchableOpacity className="bg-vert py-3 px-5 w-3/5 rounded-lg">
                <Text className=" text-center font-syne-semiBold text-lg">Ajouter mon portefeuille</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddWallet