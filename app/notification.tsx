import { View,Image,Text,ScrollView,StyleSheet,Pressable } from "react-native";
import { useRouter } from 'expo-router';


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

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return(
        <View className="w-full h-full p-[20] bg-white flex flex-col justify-start gap-[10]">
            <View className="w-full h-[50] flex flex-row justify-between items-center">
                <Pressable onPress={handleGoBack} className="w-[10%] flex justify-center">
                    <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
                </Pressable>
                <Text className="w-[90%] pr-8 text-4xl text-center text-blackPrimary font-syne-bold">Notifications</Text>
            </View>

            <ScrollView className="w-full h-[82%]" showsVerticalScrollIndicator={false}>
                <View className="w-full min-h-[80] max-h-[120] flex-row items-center justify-between gap-3 py-[14] px-[16] rounded-xl mt-[10]" style={styles.backGroundotif}>
                    <View className="h-full w-[85%] flex flex-col justify-center items-start gap-[4]">
                        <Text className="font-lato-bold text-xl">La commande N°124 a été expédiée avec succées </Text>
                        <View className="flex flex-row gap-[10]">
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Nom vendeur</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Aujourd'hui 08:24 AM</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >08:24 AM</Text>
                        </View>
                    </View>
                    <View className="w-[15%] h-full flex justify-center items-center">
                        <Image source={require("./assets/icons/Shipped.png")} className="w-[30] h-[30]"/>
                    </View>
                </View>
                <View className="w-full min-h-[80] max-h-[120] flex-row items-center justify-between gap-3 py-[14] px-[16] rounded-xl mt-[10]" style={styles.backGroundotif}>
                    <View className="h-full w-[85%] flex flex-col justify-center items-start gap-[4]">
                        <Text className="font-lato-bold text-xl">La commande N°124 que vous avez fait a été confirmé</Text>
                        <View className="flex flex-row gap-[10]">
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Nom vendeur</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Aujourd'hui 08:24 AM</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >08:24 AM</Text>
                        </View>
                    </View>
                    <View className="w-[15%] h-full flex justify-center items-center">
                        <Image source={require("./assets/icons/Paid.png")} className="w-[30] h-[30]"/>
                    </View>
                </View>
                <View className="w-full min-h-[80] max-h-[120] flex-row items-center justify-between gap-3 py-[14] px-[16] rounded-xl mt-[10]" style={styles.backGroundotif}>
                    <View className="h-full w-[85%] flex flex-col justify-center items-start gap-[4]">
                        <Text className="font-lato-bold text-xl">Des nouveaux catalogues que vous aimez sont disponibles</Text>
                        <View className="flex flex-row gap-[10]">
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Nom vendeur</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Aujourd'hui 08:24 AM</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >08:24 AM</Text>
                        </View>
                    </View>
                    <View className="w-[15%] h-full flex justify-center items-center">
                        <Image source={require("./assets/icons/NotificationYellow.png")} className="w-[30] h-[30]"/>
                    </View>
                </View>
                <View className="w-full min-h-[80] max-h-[120] flex-row items-center justify-between gap-3 py-[14] px-[16] rounded-xl mt-[10]" style={styles.backGroundotif}>
                    <View className="h-full w-[85%] flex flex-col justify-center items-start gap-[4]">
                        <Text className="font-lato-bold text-xl">Paiement de la commande N°123 a été fait avec succès</Text>
                        <View className="flex flex-row gap-[10]">
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Nom vendeur</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >Aujourd'hui 08:24 AM</Text>
                            <Text style={styles.dateDisplay} className="font-lato-regular text-sm" >08:24 AM</Text>
                        </View>
                    </View>
                    <View className="w-[15%] h-full flex justify-center items-center">
                        <Image source={require("./assets/icons/CashGreen.png")} className="w-[30] h-[30]"/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Notifications