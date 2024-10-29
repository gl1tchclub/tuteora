import { View, Text, Button } from "react-native";

const SessionsComponent = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sessions Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Go Home" />
    </View>
  );
};

export default SessionsComponent;