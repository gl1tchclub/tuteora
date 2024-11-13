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
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useContext(UserContext);

  useEffect(() => {
    console.log("Sessions:", sessions);
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
  };

  const handleCompleteSession = async (sessionId) => {
    try {
      setIsLoading(true);
      await completeSession(sessionId);
    } catch (error) {
      console.error("Session completion error: ", error.message);
    } finally {
      console.log("\nSession completed successfully!");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <ScrollView className="flex-1 w-full bg-white">
      {profile.tutor || profile.students ? (
        <>
          <View
            className="bg-white p-4 m-4 rounded-xl w-11/12 self-center"
            style={{ elevation: 5 }}
          >
            <Text className="text-lg mb-2 font-bold">Next Session:</Text>
            {sessions.length != 0 ? (
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
            {sessions.length != 0 ? (
              sessions.map((item, index) => (
                <View key={index}>
                  {!item.isCompleted && (
                    <SessionWidget {...item} accountType={profile.accountType}>
                      <View className="flex-row justify-center space-x-2 mt-2">
                        <TouchableOpacity
                          onPress={() => handleDeleteSession(item.id)}
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
                          onPress={() => handleCompleteSession(item.id)}
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
              ))
            ) : (
              <Text>No sessions scheduled</Text>
            )}
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
