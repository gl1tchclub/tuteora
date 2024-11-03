import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";

const SessionsComponent = ({ navigation }) => {
  const [sessions, setSessions] = useState([
    {
      tutor: "John Doe",
      student: "Jane Doe",
      topic: "Math",
      date: "11/9/2024",
      time: "12:00:00 PM",
      location: "Online",
    },
    {
      tutor: "Terry Smith",
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
    },
  ]);

  //const that holds the session with the earliest date/time
  // Function to parse date and time into a Date object
  const parseDateTime = (date, time) => {
    return new Date(`${date} ${time}`);
  };

  // Find the session with the earliest date and time
  const earliestSession = sessions.reduce((earliest, current) => {
    const earliestDateTime = parseDateTime(earliest.date, earliest.time);
    const currentDateTime = parseDateTime(current.date, current.time);
    return currentDateTime < earliestDateTime ? current : earliest;
  }, sessions[0]);

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
