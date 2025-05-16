import { View, Pressable, Image } from "react-native"

export default function NavigationBottom() {
    return(
        <View className="w-full h-full flex flex-row justify-around items-center bg-zinc-100 rounded-2xl">
            <Pressable className="w-fit h-full flex justify-center items-center">
                <Image source={require("../../assets/icons/HomeGreen.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <Pressable className="w-fit h-full flex justify-center items-center">
                <Image source={require("../../assets/icons/ChatBubble.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <Pressable className="w-fit h-full flex justify-center items-center">
                <Image source={require("../../assets/icons/ShoppingBasket.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <Pressable className="w-fit h-full flex justify-center items-center">
                <Image source={require("../../assets/icons/Cash.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <Pressable className="w-fit h-full flex justify-center items-center">
                <Image source={require("../../assets/icons/Delivery.png")} className="w-[30] h-[30]"/>
            </Pressable>
        </View>
    )
}