import { View, Text, Button, SectionList } from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const RequestsList = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  // Tutor requests
  const [studentRequests, setStudentRequests] = useState([
    {
      id: 1,
      student: "John Doe",
      subject: "Math",
      requestDate: "11/4/2024",
      isAccepted: false,
    },
    {
      id: 2,
      student: "Jane Doe",
      subject: "Programming",
      requestDate: "11/4/2024",
      isAccepted: false,
    },
  ]);

  const [sessionRequests, setSessionRequests] = useState([
    {
      id: 1,
      student: "Janadsde Doe",
      topic: "Math",
      date: "11/9/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: false,
    },
    {
      id: 2,
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: false,
    },
  ]); // tutor and student requests

  const sections = [
    {
      title: "Student Requests",
      data: studentRequests,
    },
    {
      title: "Session Requests",
      data: sessionRequests,
    },
  ];

  const studentSections = [
    {
      title: "Session Requests",
      data: sessionRequests,
    },
  ];

  const handleDeleteRequest = (index, session, setSessions) => {
    session[index].isAccepted = false;
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const renderSectionHeader = ({ section }) => (
    <Text className="p-4 font-bold bg-slate-300">{section.title}</Text>
  );

  const renderItem = ({ item }) => {
    <View className="bg-white p-4 my-2 rounded-xl w-full self-center">
      {item.title == "Student Requests" && (
        <View className="flex-row justify-between mb-4">
          <Text className="font-bold">{item.data.student}</Text>
          <Text className="font-bold">{item.data.subject}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteRequest(index)}
            className="bg-red-500 p-2 rounded w-fit-content self-center"
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">{item.data.student}</Text>
        <Text className="font-bold">{item.data.topic}</Text>
        <Text className="font-bold">{item.data.topic}</Text>
        <TouchableOpacity
          onPress={() => handleDeleteRequest(index)}
          className="bg-red-500 p-2 rounded w-fit-content self-center"
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>;
  };

  return (
    <View>
      <SectionList
        className="flex-1 justify-center items-center"
        sections={profile.accountType === "Tutor" ? sections : studentSections}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RequestsList;
