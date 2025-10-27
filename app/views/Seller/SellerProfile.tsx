import { View,Text,Image,TouchableOpacity,StyleSheet } from "react-native";
import { useRouter } from "expo-router"; 

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

const SellerProfile = () => {
    const router = useRouter()
    return(
        <View className=" flex-col items-center h-full gap-8 p-2 pt-4 m-3 relative">
             <TouchableOpacity 
                onPress={() => {router.back() as any}}
                className="absolute top-4 left-4"
             >
                <Image source={require("../../assets/icons/Back.png")} 
                    className="size-8"/>
             </TouchableOpacity>
             <View className=" flex-col justify-center items-center p-3">
                <Image source={require("../../assets/icons/user.png")}/>
                 <Text className=" font-syne-bold text-xl ">GUERRA Iannis</Text>
                 <Text className=" font-syne-bold text-md">guerraiannis@gmail.com</Text>
             </View>

             <View className="w-full">
                 <Text className=" font-syne-bold text-base pb-2">Profile Vendeur</Text>
                 <View className=" flex-col gap-2">
                     <TouchableOpacity  style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between p-2">
                             <View>
                                 <Text className="font-bold text-lg">Nom</Text>
                                 <Text style={styles.userdetails} className="text-sm font-syne-semiBold">GUERRA</Text>
                             </View>
                             <TouchableOpacity>
                                 <Image source={require("../../assets/icons/Right.png")} className="size-7"/>
                             </TouchableOpacity>
                        </View>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.grayBG}>
                         <View className=" flex-row items-center justify-between p-2">
                             <View>
                                 <Text className="font-bold text-lg">Email</Text>
                                 <Text style={styles.userdetails} className="text-sm font-syne-semiBold bg-[#e4e4e4]">guerraiannis@gmail.com</Text>
                             </View>
                             <TouchableOpacity>
                                 <Image source={require("../../assets/icons/Right.png")} className="size-7"/>
                             </TouchableOpacity>
                         </View>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.grayBG}>
                        <View className=" flex-row items-center justify-between p-2 ">
                             <View>
                                 <Text className="font-bold text-lg">Numéro</Text>
                                 <Text style={styles.userdetails} className="text-sm font-syne-semiBold">+261 34 27 112 20</Text>
                             </View>
                             <TouchableOpacity>
                                 <Image source={require("../../assets/icons/Right.png")} className="size-7"/>
                             </TouchableOpacity>
                        </View>
                     </TouchableOpacity>
                    
                     <TouchableOpacity style={styles.grayBG}>
                         <View className=" flex-row items-center justify-between p-2">
                             <View>
                                 <Text className="font-bold text-lg">Adresse</Text>
                                 <Text style={styles.userdetails} className="text-sm font-syne-semiBold">Antsobolo Antananarivo</Text>
                             </View>
                             <TouchableOpacity>
                                 <Image source={require("../../assets/icons/Right.png")} className="size-7"/>
                             </TouchableOpacity>
                         </View>
                     </TouchableOpacity>
                 </View>
             </View>

             <View className="w-full">
                 <Text className=" font-syne-bold text-base pb-2">Paramètres</Text>
                 <View>
                     <TouchableOpacity  style={styles.grayBG}>
                         <View className="flex-row items-center justify-between p-3">
                             <View>
                                 <Text className="font-bold text-lg">Changer de mot de passe</Text>
                             </View>
                             <TouchableOpacity>
                                 <Image source={require("../../assets/icons/Right.png")} className="size-7"/>
                             </TouchableOpacity>
                         </View>
                     </TouchableOpacity>
                 </View>
             </View>
             <TouchableOpacity className=" bg-blackPrimary w-full p-5 rounded-xl"
                onPress={() => {router.push("/") as any}}
             >
                 <Text className="text-white font-syne-semiBold text-center ">Déconexion</Text>
             </TouchableOpacity>
        </View>
    );
}

export default SellerProfile;