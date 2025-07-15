import { useState } from "react";
import { Image,Text,View,TextInput,TouchableOpacity } from "react-native";

const WalletForm = () => {
    
    const [numberCard,setNumberCard] = useState("")
    const [expireDate,setExpireDate] = useState("")
    const [cvv,setCvv] = useState("")
    const [nomTitulaire,setNomTitulaire] = useState("")

    return(
        <View className="flex-col gap-3 py-4 w-full justify-between  h-full "> 
            <View className="flex-col gap-10">
                <View className=" flex-row  items-center  justify-between w-3/4">
                    <TouchableOpacity>
                        <Image source={require("./assets/icons/Back.png")}/>
                    </TouchableOpacity>
                    <Text className="font-syne-bold  text-3xl">Portefeuille</Text>
                </View>

                <View className=" flex-col gap-5 p-3">
                    <View >
                        <TextInput
                            value={numberCard}
                            onChangeText={newText => setNumberCard(newText)}
                            placeholder="Entrer votre numero de carte"
                            className=" border border-black w-full py-4 rounded-xl"
                        />
                    </View>
                    <View className=" flex-row justify-center  items-center gap-2 w-full">
                        <TextInput
                            value={expireDate}
                            onChangeText={newText => setExpireDate(newText)}
                            className=" border border-black w-1/2 py-4 rounded-xl"
                            placeholder="date d'expiration"
                        />
                        <TextInput
                            value={cvv}
                            onChangeText={newText => setCvv(newText)}
                            className=" border border-black w-1/2 py-4 rounded-xl"
                            placeholder="CVV"
                        />
                    </View>
                    <View >
                        <TextInput
                            value={nomTitulaire}
                            onChangeText={newText => setNomTitulaire(newText)}
                            placeholder="Titulaire de la carte "
                            className=" border border-black py-4 rounded-xl"
                        />
                    </View>
                </View>
            </View>
           

            <TouchableOpacity className="bg-vert py-3 rounded-xl">
                <Text className=" text-center text-xl font-syne-bold">Valider</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WalletForm 