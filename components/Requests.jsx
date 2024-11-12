import {
  View,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
  Alert,
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
  const { createSession, sessions } = useContext(SessionContext);
  const { tutors, updateTutor } = useContext(TutorContext);
  const { students, updateStudent } = useContext(StudentContext);

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
      await deleteRequest(id);
    } catch (error) {
      console.error("Request deletion error: ", error.message);
    } 
  };

  const handleAcceptStudent = async (req) => {
    try {
      const student = students.find((student) => student.id === req.creator.id);
      student.tutor = {
        id: profile.id,
        name: profile.firstName + " " + profile.lastName,
      };
      profile.students.push({
        id: student.id,
        name: student.firstName + " " + student.lastName,
      });
      await updateStudent(student);
      await updateTutor(profile, false);
      handleDeleteRequest(req.id);
    } catch (error) {
      console.error("Student acceptance error: ", error.message);
    }
  };

  const handleAcceptSession = async (request) => {
    try {
      const newSession = {
        tutor:
          profile.accountType === "Tutor" ? request.receiver : request.creator,
        student:
          profile.accountType === "Tutor" ? request.creator : request.receiver,
        topic: request.topic,
        date: request.date,
        time: request.time,
        location: request.location,
        isCompleted: false,
      };

      if (
        sessions.includes((sesh) => {
          sesh.date === newSession.date &&
            sesh.tutor.id === newSession.tutor.id &&
            sesh.student.id === newSession.student.id;
        })
      ) {
        Alert.alert(
          "Cannot Accept",
          "You already have a session scheduled on this date\nPlease deny the request."
        );
        return;
      } else {
        await createSession(newSession);
        await handleDeleteRequest(request.id);
      }
    } catch (error) {
      console.error("Session acceptance error: ", error.message);
    }
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

  const renderItem = ({ item }) => {
    return (
      <View
        className="bg-white p-4 my-2 rounded-xl w-11/12 self-center"
        style={{
          elevation: 5,
        }}
      >
        {item.type == "student" && (
          <View className="flex-row justify-between" style={{ elevation: 5 }}>
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
          <View className="flex-row justify-between" style={{ elevation: 5 }}>
            {item.receiver.id === profile.id ? (
              <>
                <SessionWidget {...item} accountType={profile.accountType} />
                <View className="self-center">
                  <TouchableOpacity
                    onPress={() => handleAcceptSession(item)}
                    className="bg-green-500 rounded w-fit-content self-center mb-4"
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
              </>
            ) : (
              <View className="flex-row justify-between w-full">
                <Text className="text-base">{item.receiver.name}</Text>
                <Text className="text-base">Waiting for response...</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="w-full h-full bg-white">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

export default RequestsList;
