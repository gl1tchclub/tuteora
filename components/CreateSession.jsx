import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";

const CreateSession = ({ navigation }) => {

  return (
    <View className="flex-1 justify-center items-center">
      <MaterialCommunityIcons name="file-document-edit" size={40} color="black" />
      <Text>Create Screen</Text>
    </View>
  );
};

export default CreateSession;