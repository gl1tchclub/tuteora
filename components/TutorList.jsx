import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const TutorList = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  const [request, setRequest] = useState(null);

  return (
    <ScrollView className="bg-white w-full h-full">
      <View className="p-6">
        <Text className="font-semibold text-3xl">Select A Tutor</Text>
      </View>
      <View className="flex-1">
        
      </View>
    </ScrollView>
  );
};

export default TutorList;
