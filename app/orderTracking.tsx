import { Text,View,Image } from "react-native";
import MapView,{Marker} from "react-native-maps"

const OrderTracking = () => {
    return(
        <View>
            <View className=" flex-row justify-around items-center ">
                <Image source={require("./assets/icons/Back.png")}/>
                <Text className="text-2xl font-bold">Suivi de commande</Text>
            </View>
            <View className=" flex-row justify-between items-center m-5">
                <View className=" p-5">
                    <Text className=" font-semibold text-lg">Numéro</Text>
                    <Text className=" text-2xl font-bold">256548</Text>
                </View>
                <View className=" flex flex-col justify-center items-center">
                    <Text className=" font-semibold text-lg">Date de commande</Text>
                    <Text className=" text-center text-2xl font-bold">10 Juillet 2025,07:30 AM</Text>
                </View>
            </View>

            <View>
                <MapView
                    style={{ flex: 1}}
                    initialRegion={{
                        latitude: 52.52,
                        longitude: 13.405,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                    
                </MapView>
            </View>
        
        </View>
    )
}

export default OrderTracking