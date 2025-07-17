import { View,Image,Text,StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"


const UserProfile =  () =>{
    return(
        <View className=" flex-col justify-between items-center  h-full p-3">
            <View className=" flex-col justify-center items-center p-3">
                <Image source={require("./assets/icons/user.png")}/>
                <Text className=" font-syne-bold text-xl ">GUERRA Iannis</Text>
                <Text className=" font-syne-bold text-md">guerraiannis@gmail.com</Text>
            </View>

            <View className="m-2  w-full p-3">
                <Text className=" font-syne-bold text-base">Profile</Text>
                <View className=" flex-col gap-2  p-3">
                    <TouchableOpacity  style={styles.grayBG}>
                       <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Nom</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">GUERRA</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                       </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Email</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold bg-[#e4e4e4]">guerraiannis@gmail.com</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.grayBG}>
                       <View className=" flex-row items-center justify-between ">
                            <View>
                                <Text className="font-bold text-lg">Numéro</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">+261 34 27 112 20</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                       </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between">
                            <View>
                                <Text className="font-bold text-lg">Adresse</Text>
                                <Text style={styles.userdetails} className="text-sm font-syne-semiBold">Antsobolo Antananarivo</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="m-2  w-full p-3 ">
                <Text className=" font-syne-bold text-base">Paramètres</Text>
                <View>
                    <TouchableOpacity  style={styles.grayBG}>
                        <View className="  flex-row items-center justify-between p-3">
                            <View>
                                <Text className="font-bold text-lg">Changer de mot de passe</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("./assets/icons/Right.png")} className="size-7"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className=" bg-blackPrimary w-11/12 p-3 rounded-xl">
                <Text className="text-white font-syne-semiBold text-center ">Déconexion</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    grayBG: {
        backgroundColor: "#e4e4e4",
        borderRadius: 10,
        padding: 4
    },
    userdetails: {
        color: 'gray'
    }
})

export default UserProfile