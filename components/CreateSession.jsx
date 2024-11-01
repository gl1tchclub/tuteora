import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";

const CreateSession = ({ navigation }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [subject, setSubject] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  // const { createSession, sessions } = useContext(SessionContext);

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      // Create session
      const session = await createSession({
        student,
        tutor,
        subject,
        date,
        time,
      });
      setError(null);
    } catch (error) {
      console.error("Create session error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      if (session) {
        console.log("\nSession created successfully!");
      }
    }
  };

  return (
    <View className="flex-1 w-full p-4">
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
