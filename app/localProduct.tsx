import { View,Image,Text,StyleSheet } from "react-native";

const styles= StyleSheet.create({
    sizeImage: {
        width: 150,
        height: 150
    },
    frameLeft: {
        height: 220
    }
})

const LocalProducts = () => {
    return(
        <View>
            <View className=" flex-row w-3/5 justify-between items-center">
                <Image source={require("./assets/icons/Back.png")} className="size-7"/>
                <Text className=" font-syne-bold  text-2xl">Produits locaux</Text>
            </View>
            <View className=" flex-row gap-2 p-3 justify-center">
                <View className="flex-col  p-3 gap-4 ">
                    <View style={styles.frameLeft} className=" bg-gradient-to-r rounded-xl flex-col justify-between p-2 bg-[#d4ebb0aa]">
                        <View className=" flex-row items-center gap-3">
                            <Image source={require("./assets/icons/avatar.png")} className="size-5"/>
                            <Text className="font-syne-semiBold">Lionel Myree</Text>
                        </View>
                            <Image style={styles.sizeImage} source={require("./assets/images/agraffeuse.png")}/>
                        <View className=" flex-row justify-between">
                            <Text>Agraffeuse</Text>
                            <Text className=" font-syne-bold">$15.23</Text>
                        </View>
                    </View>
                    <View style={styles.frameLeft} className="flex-col rounded-xl justify-between p-2 bg-[#d4ebb0aa]">
                        <View className=" flex-row items-center gap-3">
                            <Image  source={require("./assets/icons/avatar.png")} className="size-5"/>
                            <Text className="font-syne-semiBold">Lionel Myree</Text>
                        </View>
                        <Image style={styles.sizeImage} source={require("./assets/images/shoes.png")}/>
                        <View className=" flex-row justify-between">
                            <Text>Shoes</Text>
                            <Text className="font-syne-bold">$15.23</Text>
                        </View>
                    </View>
                    <View style={styles.frameLeft} className="flex-col rounded-xl justify-between p-2 bg-[#d4ebb0aa]">
                        <View className=" flex-row items-center gap-3">
                            <Image source={require("./assets/icons/avatar.png")} className="size-5"/>
                            <Text className="font-syne-semiBold">Lionel Myree</Text>
                        </View>
                        <Image style={styles.sizeImage} source={require("./assets/images/agraffeuse.png")}/>
                        <View className=" flex-row justify-between">
                            <Text>Agraffeuse</Text>
                            <Text className="font-syne-bold">$15.23</Text>
                        </View>
                    </View>
                </View>
                <View className=" flex-col p-3 gap-4">
                    <View className="flex-col justify-between rounded-xl p-2 bg-[#d4ebb0aa]">
                            <View className=" flex-row gap-3">
                                <Image source={require("./assets/icons/avatar.png")} className="size-5"/>
                                <Text className="font-syne-semiBold">Lionel Myree</Text>
                            </View>
                            <Image style={styles.sizeImage} source={require("./assets/images/agraffeuse.png")}/>
                            <View className=" flex-row justify-between">
                                <Text>Agraffeuse</Text>
                                <Text className="font-syne-bold">$15.23</Text>
                            </View>
                    </View>
                    <View className="flex-col justify-between rounded-xl p-2 bg-[#d4ebb0aa]">
                            <View className=" flex-row gap-3">
                                <Image source={require("./assets/icons/avatar.png")} className="size-5"/>
                                <Text className="font-syne-semiBold">Lionel Myree</Text>
                            </View>
                            <Image style={styles.sizeImage} source={require("./assets/images/agraffeuse.png")}/>
                            <View className=" flex-row justify-between">
                                <Text>Agraffeuse</Text>
                                <Text className="font-syne-bold">$15.23</Text>
                            </View>
                    </View>
                    <View className="flex-col justify-between p-2 rounded-xl bg-[#d4ebb0aa] ">
                            <View className=" flex-row gap-3">
                                <Image source={require("./assets/icons/avatar.png")} className="size-5"/>
                                <Text className="font-syne-semiBold">Lionel Myree</Text>
                            </View>
                            <Image style={styles.sizeImage} source={require("./assets/images/agraffeuse.png")}/>s
                            <View className="flex-row justify-between">
                                <Text>Agraffeuse</Text>
                                <Text className=" font-syne-bold">$15.23</Text>
                            </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LocalProducts