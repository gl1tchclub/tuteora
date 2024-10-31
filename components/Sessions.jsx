import { View, Text, Button } from "react-native";

const SessionsComponent = ({ navigation }) => {

  const handleCreateSession = () => {
    navigation.navigate("CreateSession");
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sessions Screen</Text>
      <View className="mt-4 rounded-xl bg-white">
        <Button title="Create Session" onPress={handleCreateSession}/>
      </View>
    </View>
  );
};

export default SessionsComponent;