/**
 * SessionsComponent is a React Native component that displays a list of sessions for a user.
 * It allows the user to view, create, cancel, or complete sessions.
 *
 * @param {Object} props - The component props
 * @param {Object} props.navigation - The navigation object for navigating between screens
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, Text, Button, TouchableOpacity } from "react-native";
import SessionWidget from "./SessionWidget";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";

const SessionsComponent = ({ navigation }) => {
  const { cancelSession, sessions, completeSession } =
    useContext(SessionContext);
  const [completeSessions, setCompleteSessions] = useState([]);
  const [incompleteSessions, setIncompleteSessions] = useState([]);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    console.log("Sessions:", sessions);
    setIncompleteSessions(sessions.filter((session) => !session.isCompleted));
    console.log("Incomplete Sessions:", incompleteSessions);
  }, [sessions]);

  const parseDateTime = (date, time) => {
    return new Date(`${date} ${time}`);
  };

  const earliestSession = incompleteSessions.length
    ? incompleteSessions.reduce((earliest, current) => {
        const earliestDateTime = parseDateTime(earliest.date, earliest.time);
        const currentDateTime = parseDateTime(current.date, current.time);
        return currentDateTime < earliestDateTime ? current : earliest;
      }, sessions[0])
    : null;

  const handleCreateSession = () => {
    navigation.navigate("CreateSession");
  };

  const handleDeleteSession = async (session) => {
    try {
      await cancelSession(session.id);
      setIncompleteSessions((prev) => prev.filter((s) => s.id !== session.id));
    } catch (error) {
      console.error("Session deletion error: ", error.message);
    } finally {
      console.log("\nSession deleted successfully!");
    }
  };

  const handleCompleteSession = async (session) => {
    try {
      await completeSession(session.id);
      setIncompleteSessions((prev) => prev.filter((s) => s.id !== session.id));
    } catch (error) {
      console.error("Session completion error: ", error.message);
    } finally {
      console.log("\nSession completed successfully!");
    }
  };

  return (
    <ScrollView className="flex-grow w-full bg-white">
      {profile.tutor || profile.students ? (
        <>
          <View
            className="bg-white p-4 m-4 rounded-xl w-11/12 self-center"
            style={{ elevation: 5 }}
          >
            <Text className="text-lg mb-2 font-bold">Next Session:</Text>
            {incompleteSessions.length != 0 && earliestSession ? (
              <SessionWidget
                {...earliestSession}
                accountType={profile.accountType}
              />
            ) : (
              <Text>No sessions scheduled</Text>
            )}
          </View>
          <View
            className="bg-white p-4 m-4 rounded-xl w-11/12 self-center"
            style={{ elevation: 5 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Schedule</Text>
              <Button
                title="Create Session"
                onPress={handleCreateSession}
                color="#46ab61"
              />
            </View>
            <View>
              {incompleteSessions.length != 0 ? (
                incompleteSessions.map((item, index) => (
                  <View key={index}>
                    <SessionWidget {...item} accountType={profile.accountType}>
                      <View className="flex-row justify-center space-x-2 mt-2">
                        <TouchableOpacity
                          onPress={() => handleDeleteSession(item)}
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
                          onPress={() => handleCompleteSession(item)}
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
                  </View>
                ))
              ) : (
                <Text>No sessions scheduled</Text>
              )}
            </View>
          </View>
        </>
      ) : (
        <View
          className="bg-white p-4 m-4 rounded-xl w-11/12 self-center"
          style={{ elevation: 5 }}
        >
          <Text className="font-semibold text-base self-center">
            Please request a tutor
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SessionsComponent;
