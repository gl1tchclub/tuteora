import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SessionWidget from "./SessionWidget";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";

const SessionsComponent = ({ navigation }) => {
  const { cancelSession } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([
    {
      tutor: "John Doe",
      student: "Janadsde Doe",
      topic: "Math",
      date: "11/9/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: true,
      isCompleted: false,
    },
    {
      tutor: "John Doe",
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: true,
      isCompleted: false,
    },
  ]);

  const { profile } = useContext(UserContext);

  // useEffect(() => {
  //   sessions.forEach((session, i) => {
  //     console.log("\n", session);
  //   });
  // }, [sessions]);

  const parseDateTime = (date, time) => {
    return new Date(`${date} ${time}`);
  };

  const earliestSession = sessions.reduce((earliest, current) => {
    const earliestDateTime = parseDateTime(earliest.date, earliest.time);
    const currentDateTime = parseDateTime(current.date, current.time);
    return currentDateTime < earliestDateTime ? current : earliest;
  }, sessions[0]);

  const handleCreateSession = () => {
    navigation.navigate("CreateSession");
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      setIsLoading(true);
      await cancelSession(sessionId);
    } catch (error) {
      console.error("Session deletion error: ", error.message);
    } finally {
      console.log("\nSession deleted successfully!");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    // setSessions(sessions.filter((_, i) => i !== index));
  };

  return (
    <ScrollView className="flex-1 w-full bg-white">
        <View className="bg-white p-4 m-4 rounded-xl w-11/12 self-center" style={{ elevation: 5 }}>
          <Text className="text-lg mb-2 font-bold">Next Session:</Text>
          <SessionWidget
            {...earliestSession}
            accountType={profile.accountType}
          />
        </View>
        <View className="bg-white p-4 m-4 rounded-xl w-11/12 self-center" style={{ elevation: 5 }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Schedule</Text>
            <Button
              title="Create Session"
              onPress={handleCreateSession}
              color="#46ab61"
            />
          </View>
          {sessions.map((item, index) => (
            <View key={index}>
              {!item.isCompleted && (
                <SessionWidget {...item} accountType={profile.accountType}>
                  <View className="flex-row justify-center space-x-2 mt-2">
                    <TouchableOpacity
                      onPress={() => handleDeleteSession(index)}
                      className="bg-red-500 p-2 rounded w-fit-content self-center flex-row space-x-2"
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color="white"
                      />
                      <Text className="text-white">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteSession(index)}
                      className="bg-green-500 p-2 rounded w-fit-content self-center flex-row space-x-2"
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={20}
                        color="white"
                      />
                      <Text className="text-white">Complete</Text>
                    </TouchableOpacity>
                  </View>
                </SessionWidget>
              )}
            </View>
          ))}
        </View>
    </ScrollView>
  );
};

export default SessionsComponent;
