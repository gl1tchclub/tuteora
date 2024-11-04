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

const CreateRequest = ({ navigation }) => {
    const { profile } = useContext(UserContext);
    const [request, setRequest] = useState(null);
return (
    <Text>Hello</Text>
);
    
}

export default CreateRequest;