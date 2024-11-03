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
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";

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
      tutor: "John Doe",
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
    },
  ]);

  const { profile } = useContext(UserContext);

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

  const handleDeleteSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const NextSessionHeader = () => (
    <View className="bg-white p-4 my-2 rounded-xl w-4/5 self-center">
      <Text className="text-lg mb-2">Next Session:</Text>
      <Text className="text-md mb-2">
        <Text className="font-bold">Tutor:</Text> {earliestSession.tutor}
        {"\n"}
        <Text className="font-bold">Student:</Text> {earliestSession.student}
        {"\n"}
        <Text className="font-bold">Date:</Text> {earliestSession.date}
        {"\n"}
        <Text className="font-bold">Time:</Text> {earliestSession.time}
        {"\n"}
        <Text className="font-bold">Location:</Text> {earliestSession.location}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle="pt-5">
      <NextSessionHeader />
      <View className="bg-white p-4 my-2 rounded-xl w-4/5 self-center">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Schedule</Text>
          <Button
            title="Create Session"
            onPress={handleCreateSession}
            color="#46ab61"
          />
        </View>
        {sessions.map((item, index) => (
          <View key={index} className="bg-green-100 p-4 my-2 rounded-xl">
            <Text className="text-md mb-2">
              <Text className="font-bold">Tutor:</Text> {item.tutor}
              {"\n"}
              <Text className="font-bold">Student:</Text> {item.student}
              {"\n"}
              <Text className="font-bold">Date:</Text> {item.date}
              {"\n"}
              <Text className="font-bold">Time:</Text> {item.time}
              {"\n"}
              <Text className="font-bold">Location:</Text> {item.location}
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteSession(index)}
              className="bg-red-500 p-2 rounded"
            >
              <Text className="text-white text-center">Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SessionsComponent;
