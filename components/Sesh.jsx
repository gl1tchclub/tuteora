import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";

const CreateSession = ({ navigation }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [subject, setSubject] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { profile } = useContext(UserContext);
  const associates = profile.associates;

  useEffect(() => {
    if (profile.accountType === "Tutor") {
      setTutor(profile.id);
    } else {
      setStudent(profile.id);
    }
  }, []);

  return (
    <View className="flex-1 w-full p-4">
      <Text className="font-md mb-4 align-center">New Session</Text>

      <MaterialCommunityIcons
        name="file-document-edit"
        size={40}
        color="black"
      />
      <Text>Create Screen</Text>
    </View>
  );
};

export default CreateSession;
