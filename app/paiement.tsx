import { useState } from "react";
import { Image,Text,View,TextInput,TouchableOpacity } from "react-native";

const paiement = () => {
    
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
                    <Text className="font-syne-bold  text-3xl">Paiement</Text>
                </View>

                <View className=" flex-col gap-5 p-3">
                    <Text>Total prix</Text>
                    <Text className="text-4xl font-bold">500000AR</Text>
                    <Text>Paiement par Stripe</Text>
                    
                    <View >
                        <Text>Numéro carte</Text>
                        <TextInput
                            value={numberCard}
                            onChangeText={newText => setNumberCard(newText)}
                            placeholder="Entrer votre numero de carte"
                            className=" border border-black w-full py-4 rounded-xl"
                        />
                    </View>
                    <Text>Date expiration</Text>
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
                        <Text>Nom titulaire</Text>
                        <TextInput
                            value={nomTitulaire}
                            onChangeText={newText => setNomTitulaire(newText)}
                            placeholder="Titulaire de la carte "
                            className=" border border-black py-4 rounded-xl"
                        />
                    </View>
                </View>
            </View>
           <Text>Adresse livraison</Text>
           <Text> Madagascar</Text>

            <TouchableOpacity className="bg-vert py-3 rounded-xl">
                <Text className=" text-center text-xl font-syne-bold">Payer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default paiement;