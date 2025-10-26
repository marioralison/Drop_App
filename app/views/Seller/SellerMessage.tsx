import { View,Text,TouchableOpacity,Image } from "react-native";
import SellerNaviagtion from "./SellerNavigation";
import { useRouter } from "expo-router";

const SellerMessage = () => {
    const router = useRouter()
    return(
        <View className=" flex items-center justify-center h-screen">
            <TouchableOpacity className=" absolute top-0 left-0 size-8"
                onPress={() => {router.back() as any}}
            >
                <Image source={require("../../assets/icons/Back.png")} 
                    className="size-8"
                />
            </TouchableOpacity>
            <Text className=" text-3xl font-syne-semiBold">Page de messagerie </Text>
            <SellerNaviagtion></SellerNaviagtion>
        </View>
    )
}

export default SellerMessage