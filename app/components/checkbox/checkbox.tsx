import { View, Text } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign'

type CheckboxProps = {
    label : string,
    checked : boolean,
    onPress : () => void
}

const Checkbox: React.FC<CheckboxProps> = ({label, checked, onPress}) => {

    return(
        <View 
            onTouchEnd={onPress}
            className={`${checked ? 'bg-blackPrimary' : 'bg-transparent'} flex flex-row justify-center items-center py-[10] pr-[20] ${!checked ? 'pl-6' : 'pl-4'} border-black border rounded-xl`}
        >
            {
                checked && (
                    <View className="mr-[10]">
                        <AntDesign name="checkcircle" size={16} color="#C9D856"/>
                    </View>
                )
            }
            <Text className={`${checked ? 'color-white' : 'color-black'} text-xl`}>{label}</Text>
        </View>
    )
}

export default Checkbox;