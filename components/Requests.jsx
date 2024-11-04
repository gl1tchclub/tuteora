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
  ]

  const studentSections = [
    {
      title: "Session Requests",
      data: sessionRequests,
    },
  ]

  const renderSectionHeader = ({ section }) => (
    <Text className="p-4 font-bold bg-slate-300">{section.title}</Text>
  );

  const renderItem = ({ item }) => {
    {profile.accountType === "Tutor" && 
      

    }
  };

  return (
    <View>
    <SectionList 
    className="flex-1 justify-center items-center"
    sections={profile.accountType === "Tutor" ? sections : studentSections}
    renderSectionHeader={renderSectionHeader}
    keyExtractor={(item) => item.id}
    >
    </SectionList>
    </View>
  );
};

export default RequestsList;