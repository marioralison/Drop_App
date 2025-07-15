import { View,Image,Text,TouchableOpacity,StyleSheet } from "react-native";


const styles = StyleSheet.create({
    dateDisplay: {
        color: '#b4b4b4'
    },
    backGroundotif: {
        backgroundColor: '#dbf8855f',
        padding: 10
    },
    backGroundLastNotif: {
        backgroundColor: 'white',
        padding: 10
    }
})

const Notifications = () => {
    return(
        <View className=" flex-col justify-center gap-3">
            <View className=" flex-row items-center justify-around mb-2">
                <TouchableOpacity>
                    <Image source={require("./assets/icons/Back.png")}/>
                </TouchableOpacity>
                <Text className=" font-syne-bold text-3xl">Notifications</Text>
            </View>
            <View className="flex-col justify-center items-center gap-3">
                <View className="flex-row gap-3 items-center"  style={styles.backGroundotif}>
                    <View>
                        <Text className="font-bold">La commande N°124 a été expédié avec succès</Text>
                        <Text style={styles.dateDisplay} className=" font-semibold text-sm  " >Aujourd'hui 08:24 AM</Text>
                    </View>
                    <Image source={require("./assets/icons/Delivery.png")} className="size-7"/>
                </View>
                <View className="flex-row gap-3 items-center"  style={styles.backGroundLastNotif}>
                    <View>
                        <Text className="font-bold  w-3/4">La commande N°124 que vous ave fait a été confirmé</Text>
                        <Text style={styles.dateDisplay} className=" font-semibold text-sm  " >Aujourd'hui 07:14 AM</Text>
                    </View>
                    <Image source={require("./assets/icons/Notification.png")} className=" size-7"/>
                </View>
            </View>
        </View>
    )
}

export default Notifications