import { View } from "react-native";
import Auth from "../components/Auth";

const AuthScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Auth navigation={props.navigation} />
    </View>
  );
};

export default AuthScreen;