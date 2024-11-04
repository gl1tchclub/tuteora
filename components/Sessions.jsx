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
      student: "Janadsde Doe",
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

  useEffect(() => { 
    sessions.forEach((session, i) => {
      console.log("\n", session);
    });
  }, [sessions]);

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

  const handleDeleteSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
    
  };

  const SessionWidget = (sesh) => (
    <View className="bg-green-100 p-3 my-2 rounded-xl">
      <View className="flex-row mb-2">
        <Text className="font-bold mx-2">Student:</Text>
        <Text>{sesh.student}</Text>
        <Text className="font-bold ml-4 mr-2">Location:</Text>
        <Text>{sesh.location}</Text>
      </View>
      <View className="flex-row space-x-4">
        <Text className="font-bold ml-2">Date:</Text>
        <Text>{sesh.date}</Text>
        <Text className="font-bold pl-9">Time:</Text>
        <Text>{sesh.time}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle="pt-5" className="w-full m-4 px-4">
      <View className="bg-white p-4 my-2 rounded-xl w-full self-center">
        <Text className="text-lg mb-2 font-bold">Next Session:</Text>
        <SessionWidget {...earliestSession} />
      </View>
      <View className="bg-white p-4 my-2 rounded-xl w-full self-center">
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
