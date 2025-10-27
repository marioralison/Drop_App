import { View, Image, Text, TextInput, ScrollView, Pressable, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router';
import Toast from "react-native-toast-message";
import { loginUser } from "@/helpers/api";
import { useState } from "react";
import { IUserLogin, UserRole } from "@/helpers/data.type";

interface IRadioButtom {
    label : string,
    value : string,
    selectedValue : string,
    onSelect : (value : string) => void,
}

const RadioButton = ({ label , value, selectedValue, onSelect } : IRadioButtom) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onSelect(value)}>
      <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
        {isSelected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

interface IRadioButtonGroup {
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const RadioButtonGroup = ({ selectedValue, onSelect }: IRadioButtonGroup) => {
  return (
    <View className="flex flex-row gap-10 items-center justify-between">
      <RadioButton
        label="Vendeur"
        value="seller"
        selectedValue={selectedValue as any}
        onSelect={onSelect}
      />
      <RadioButton
        label="Acheteur"
        value="buyer"
        selectedValue={selectedValue as any}
        onSelect={onSelect}
      />
    </View>
  );
};

export default function Login() {

    const [user, setUser] = useState<IUserLogin>({email: "",password: "", role: UserRole.BUYER })
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (field: keyof IUserLogin, value: string) => {
        setUser({ ...user, [field]: value });
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleRoleSelect = (value: string) => {
        setSelectedValue(value);
        const role = value === "buyer" ? UserRole.BUYER : UserRole.SELLER;
        setUser({ ...user, role });
    };

    const handleLogin = async () => {
            if (selectedValue === "buyer") {
                const isLoged = await loginUser(user);
                router.push('/(tab)/accueil');
            } else if (selectedValue === "seller") {
                router.push('/views/Seller/sellerDashboard')
            } else {
                Alert.alert("Erreur", "Veuillez choisir votre type de compte")
        }
    };

    return(
        <View className="w-full h-full bg-white p-[25] flex gap-10">
            <Pressable onPress={handleGoBack} className="w-full h-[10%] flex justify-center">
                <Image source={require("./assets/icons/Back.png")} className="w-[30] h-[30]"/>
            </Pressable>
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>

                <View className="w-[70%]">
                    <Text className="text-5xl text-blackPrimary font-syne-bold">Se connecter à Dropshop</Text>
                    <Text className="text-xl font-lato-regular mt-3">Veuillez remplir tous les champs, en entrant des informations valides</Text>
                </View>

                <View className="flex items-center justify-center py-4 mt-4">
                    <RadioButtonGroup 
                        selectedValue={selectedValue}
                        onSelect={handleRoleSelect}
                    />
                </View>

                <View className="w-full gap-[25] pt-6 mb-[20] text-xl font-lato-regular">
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Email"
                        value={user.email}
                        onChangeText={(value: string) => handleChange('email',value)}
                    />
                    <TextInput
                        className="w-full h-[60] pl-5 border border-blackPrimary rounded-xl text-xl font-lato-regular"
                        placeholder="Mot de passe"
                        value={user.password}
                        onChangeText={(value: string) => handleChange('password',value)}
                    />

                    <Pressable 
                        onPress={handleLogin} 
                        className="w-full h-[60] flex justify-center items-center bg-vert px-6 py-5 rounded-xl">
                        <Text className="font-lato-bold text-lg">Confirmer</Text>
                    </Pressable>

                    <Pressable className="w-full h-[60] flex flex-row justify-center items-center bg-blackPrimary gap-[10] px-6 py-5 rounded-xl">
                        <Image source={require("./assets/icons/Google.png")} className="w-[30] h-[30]"/>
                        <Text className="font-lato-bold text-lg text-white">Google</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <Toast/>
        </View>
    )
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  outerCircleSelected: {
    borderColor: '#C9D856',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#C9D856',
  },
  radioLabel: {
    fontSize: 18,
  },
});