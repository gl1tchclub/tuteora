import {
  View,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { RequestsContext } from "../contexts/RequestsContext";
import { TutorContext } from "../contexts/TutorsContext";
import SessionWidget from "./SessionWidget";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SessionContext } from "../contexts/SessionsContext";
import { StudentContext } from "../contexts/StudentsContext";

const RequestsList = () => {
  const { profile } = useContext(UserContext);
  const { requests, deleteRequest } = useContext(RequestsContext);
  const { createSession } = useContext(SessionContext);
  const { tutors, updateTutor } = useContext(TutorContext);
  const { students, updateStudent } = useContext(StudentContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

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

  const handleDeleteRequest = async (id) => {
    try {
      setIsLoading(true);
      await deleteRequest(id);
    } catch (error) {
      console.error("Request deletion error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptStudent = async (req) => {
    try {
      // console.log(students.find((student) => student.id === req.creator.id));
      const student = students.find((student) => student.id === req.creator.id);
      student.tutor = {
        id: profile.id,
        name: profile.firstName + " " + profile.lastName,
        // availability: profile.availability,
        // topics: profile.topics,
        isAvailable: profile.isAvailable,
      };
      profile.students.push({
        id: student.id,
        name: student.firstName + " " + student.lastName,
      });
      console.log("New Student: ", student);
      console.log("New Tutor: ", profile);
      await updateStudent(student);
      await updateTutor(profile);
      handleDeleteRequest(req.id);
    } catch (error) {
      console.error("Student acceptance error: ", error.message);
    }
  };

  const handleAcceptSession = (session) => {
    // create session and delete request
    // setRequests(
    //   requests.map((req) =>
    //     req.id === id ? { ...req, isAccepted: true } : req
    //   )
    // );
    // handleDeleteRequest(id);
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
    <View className="bg-white p-4 my-2 rounded-xl w-11/12 self-center">
      {item.type == "student" && (
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">{item.student}</Text>
          <Text className="font-bold text-lg">{item.subject}</Text>
          <View className="flex-row">
            {item.receiver.id === profile.id ? (
              <View className="w-full flex-row justify-between">
                <Text className="font-semibold text-lg ">
                  {item.creator.name}
                </Text>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => handleAcceptStudent(item)}
                    className="bg-green-500 rounded w-fit-content self-center mr-2"
                  >
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteRequest(item.id)}
                    className="bg-red-500 rounded w-fit-content self-center"
                  >
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text className="font-bold text-lg">Pending...</Text>
            )}
          </View>
        </View>
      )}
      {item.type === "session" && (
        <View className="flex-row justify-between">
          <SessionWidget {...item} accountType={profile.accountType} />
          <View className="self-center">
            <TouchableOpacity
              onPress={() => handleAcceptSession(item)}
              className="bg-green-500 rounded w-fit-content self-center mb-4"
            >
              <MaterialCommunityIcons name="check" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteRequest(item.id)}
              className="bg-red-500 rounded w-fit-content self-center"
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

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
