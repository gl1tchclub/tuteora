import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "../services/firebase";

const SessionsScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sessions Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Go Home" />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
    </View>
  );
};

export default SessionsScreen;