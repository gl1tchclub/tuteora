import { View, Text } from "react-native";
import AuthForm from "../components/AuthForm";

const AuthScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Auth Screen</Text>
      <AuthForm />
    </View>
  );
};

export default AuthScreen;