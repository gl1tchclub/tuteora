import {
  View,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import SessionWidget from "./SessionWidget";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RequestsList = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "student",
      student: "John Doe",
      subject: "Math",
      requestDate: "11/4/2024",
      isAccepted: false,
    },
    {
      id: 2,
      type: "student",
      student: "Jane Doe",
      subject: "Programming",
      requestDate: "11/4/2024",
      isAccepted: false,
    },
    {
      id: 3,
      type: "session",
      student: "Janadsde Doe",
      topic: "Math",
      date: "11/9/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: false,
    },
    {
      id: 4,
      type: "session",
      student: "Joseph Dunn",
      topic: "IT",
      date: "11/13/2024",
      time: "12:00:00 PM",
      location: "Online",
      isAccepted: false,
    },
  ]);

  const sections = [
    {
      title: "Student Requests",
      data:
        profile.accountType === "Tutor"
          ? requests.filter((req) => req.type === "student")
          : [],
    },
    {
      title: "Session Requests",
      data: requests.filter((req) => req.type === "session"),
    },
  ];

  const handleDeleteRequest = (index) => {
    setRequests(requests.filter((_, i) => i !== index));
  };

  const handleAcceptRequest = (index) => {
    setRequests(
      requests.map((req, i) =>
        i === index ? { ...req, isAccepted: true } : req
      )
    );
    // handleDeleteRequest(index);
    // if type "student", delete request and getDoc for student profile and add to tutor associates
  };

  const renderSectionHeader = ({ section }) => {
    if (
      profile.accountType === "Tutor" ||
      section.title === "Session Requests"
    ) {
      return (
        <Text className="p-4 font-bold bg-slate-300 w-full text-lg">
          {section.title}
        </Text>
      );
    }
    return null;
  };

  const renderItem = ({ item }) => (
    // return (
    <View className="bg-white p-4 my-2 rounded-xl w-11/12 self-center">
      {item.type == "student" && (
        <View className="flex-row justify-between">
          {item.isAccepted == false ? (
            <>
              <Text className="font-bold text-lg">{item.student}</Text>
              <Text className="font-bold text-lg">{item.subject}</Text>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => handleAcceptRequest(item.id - 1)}
                  className="bg-green-500 rounded w-fit-content self-center mr-2"
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteRequest(item.id - 1)}
                  className="bg-red-500 rounded w-fit-content self-center"
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View className="items-center w-full">
              <Text className="font-bold text-lg text-lime-600">Accepted!</Text>
            </View>
          )}
        </View>
      )}
      {item.type === "session" && (
        <View className="flex-row justify-between">
          {item.isAccepted == false ? (
            <>
              <SessionWidget {...item} accountType={profile.accountType} />
              <View className="self-center">
                <TouchableOpacity
                  onPress={() => handleAcceptRequest(item.id - 1)}
                  className="bg-green-500 rounded w-fit-content self-center mb-4"
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteRequest(item.id - 1)}
                  className="bg-red-500 rounded w-fit-content self-center"
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View className="items-center w-full">
              <Text className="font-bold text-lg text-lime-600">Accepted!</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
  // };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      className="w-full"
    />
  );
};

export default RequestsList;
