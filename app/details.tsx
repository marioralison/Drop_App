import { View,Text,TouchableOpacity,Image,StyleSheet } from "react-native";

const styles = StyleSheet.create({
    photoDetails: {
        backgroundColor: '#ececec',
        height: '45%'
    },
    colorDetails: {
        width: 85,
        height: 75,
    },
    greyBg: {
        backgroundColor: '#ececec',
        padding: 1
    },
    touchablePay: {
        width: '85%'
    },
    touchableBasket: {
        backgroundColor: 'gray'
    },
})

const Details = () => {
     return (
        <View className=" flex-col   w-full  h-full">
            <View className=" flex-row items-center justify-between p-3  m-2">
                <TouchableOpacity>
                    <Image source={require("./assets/icons/Back.png")} className="size-7"/>
                </TouchableOpacity>
                <Text className="font-syne-bold text-2xl">Details</Text>
                <Image source={require("./assets/icons/ChatBubble.png")} className="size-7"/>
            </View>
            <View className="  p-3 m-2 flex justify-center items-center rounded-xl " style={styles.photoDetails}>
                <Image source={require("./assets/images/agraffeuse.png")}/>
            </View>
            <View className=" flex-row  justify-between m-2 p-3">
                <View>
                    <Text className="font-syne-bold text-3xl">Agraffeuse</Text>
                </View>
                <View className=" flex-row items-center">
                    <Image source={require("./assets/icons/Star.png")} className="size-5"/>
                    <Text className=" font-bold">4.5</Text>
                </View>
            </View>
            <View className=" m-1 p-3 ">
                <Text className="font-syne-bold text-lg">Couleurs</Text>
                <View className=" flex-row  gap-3 py-2">
                    <View style={styles.greyBg} className="border rounded-xl">
                        <Image source={require("./assets/images/agraffeuse.png")} style={styles.colorDetails}/>
                    </View>
                    <View style={styles.greyBg} className="rounded-xl">
                        <Image source={require("./assets/images/agraffeuse.png")} style={styles.colorDetails}/>
                    </View>
                    <View style={styles.greyBg} className="rounded-xl">
                        <Image source={require("./assets/images/agraffeuse.png")} style={styles.colorDetails}/>
                    </View>
                    <View style={styles.greyBg} className="rounded-xl">
                        <Image source={require("./assets/images/agraffeuse.png")} style={styles.colorDetails}/>
                    </View>
                </View>
            </View>

            <View className=" m-2 ">
                <Text className=" font-syne-bold text-lg">Taille</Text>
                <View className=" flex-row gap-3 m-2 items-center">
                    <View><Text className="font-syne-semiBold rounded-xl bg-black text-white p-3">37cm</Text></View>
                    <View><Text className="font-syne-semiBold rounded-xl border p-3">38cm</Text></View>
                    <View><Text className="font-syne-semiBold rounded-xl border p-3">39cm</Text></View>
                </View>
            </View>
            <View className=" flex-row justify-center gap-2 items-center m-2 ">
                <TouchableOpacity className="bg-vert p-3 rounded-xl" style={styles.touchablePay}>
                    <Text className=" text-center font-syne-bold ">$86.92</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" flex justify-center rounded-xl items-center flex-1 p-3" style={styles.touchableBasket}>
                    <Image source={require("./assets/icons/ShoppingBasket.png")} className="size-7"/>
                </TouchableOpacity>
            </View>
        </View>
     )
}

export default Details