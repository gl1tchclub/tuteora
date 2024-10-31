import { View, Text, Button } from "react-native";

const SessionsComponent = ({ navigation }) => {
  const handleCreateSession = () => {
    navigation.navigate("CreateSession");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="bg-white p-4 w-2/3 mt-10 h-max rounded-xl">
        <Text className="text-lg p-2 my-2">Next Session:</Text>
        <Button
          title="Create Session"
          onPress={handleCreateSession}
          color="#46ab61"
        />
      </View>
    </View>
  );
};

export default SessionsComponent;
