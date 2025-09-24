import { Text,View,Image } from "react-native";
import MapView,{Marker,UrlTile} from "react-native-maps"
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

const OrderTracking = () => {
    const initialRegion = {
        latitude: -18.87,
        longitude: 47.507,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    return(
        <View>
            <View className=" flex-row justify-around items-center ">
                <Image source={require("./assets/icons/Back.png")}/>
                <Text className="text-2xl font-bold">Suivi de commande</Text>
            </View>
            <View className=" flex-row justify-between items-center m-2">
                <View className=" p-4">
                    <Text className=" font-semibold text-lg">Numéro</Text>
                    <Text className=" text-2xl font-bold">256548</Text>
                </View>
                <View className=" flex flex-col justify-center items-center">
                    <Text className=" font-semibold text-lg">Date de commande</Text>
                    <Text className=" text-center text-2xl font-bold">10 Juillet 2025,07:30 AM</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text>Carte de suvie</Text>
                <MapView style={styles.map}
                        initialRegion={initialRegion}
                >
                    
                </MapView>
            </View>
        
        </View>
    )
}

export default OrderTracking