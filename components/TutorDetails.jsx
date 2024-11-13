/**
 * TutorDetails component displays detailed information about a tutor.
 * It allows a user to send a request to the tutor and view the tutor's profile, including their bio, study, topics, and availability.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.tutor - The tutor object containing tutor details.
 *
 * @returns {JSX.Element} The rendered component.
 */

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";
import { RequestsContext } from "../contexts/RequestsContext";

const TutorDetails = (props) => {
  const { profile } = useContext(UserContext);
  const { createRequest } = useContext(RequestsContext);
  const [msg, setMsg] = useState("Request Tutor");
  const [icon, setIcon] = useState("account-check");
  const [loading, setLoading] = useState(false);
  const tutor = props.tutor.tutor;
  const [randomColor, setRandomColor] = useState("");

  const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  useEffect(() => {
    setRandomColor(`#${getRandomColor()}`);
  }, []);

  const handleRequestTutor = async (tutor) => {
    try {
      setLoading(true);
      setIcon("check");
      setMsg("Sent!");
      const req = {
        creator: {
          id: profile.id,
          name: `${profile.firstName} ${profile.lastName}`,
        },
        receiver: {
          id: tutor.id,
          name: `${tutor.firstName} ${tutor.lastName}`,
        },
        type: "student",
        study: profile.study,
        requestDate: new Date().toLocaleDateString(),
      };
      await createRequest(req);
    } catch (error) {
      console.error("Request creation error: ", error.message);
      Alert.alert("Request Failed:", error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        props.navigation.navigate("Dashboard");
      }, 500);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white w-full h-full">
      <View className="relative w-full h-48 mb-3">
        <View
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundColor: randomColor, opacity: 0.6 }}
        />
        <View className="absolute bottom-0 left-0 flex-row justify-between w-full">
          <View
            className="rounded-lg m-6 border border-neutral-400/[0.1]"
            style={{
              backgroundColor: randomColor,
              shadowColor: "#00000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text className="text-2xl font-bold text-white px-2 py-1">
              {tutor.firstName} {tutor.lastName}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex-1 justify-center">
        {!loading ? (
          <TouchableOpacity
            onPress={() => handleRequestTutor(tutor)}
            className="bg-white rounded-2xl p-1 w-fit-content self-center m-2 flex-row items-center border border-neutral-400/[0.1]"
            style={{
              shadowColor: "#000000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color="black"
              style={{ paddingHorizontal: 4, paddingVertical: 2 }}
            />
            <Text className="text-black px-2 text-lg">{msg}</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        <View className="border-b-neutral-400 border-b m-4">
          <Text className="text-xl mb-3 font-semibold">About Me</Text>
          <Text className="text-base mb-8">{tutor.bio || "No Bio"}</Text>
        </View>
        <View className="border-b-neutral-400 border-b mx-4 py-2">
          <View className="flex-row">
            <Text className="text-lg mb-3 font-semibold">Studying: </Text>
            <Text className="text-lg mb-3 ml-4">{tutor.study}</Text>
          </View>
          <View className="flex-row my-2 text-wrap">
            <Text className="text-lg font-semibold self-center mb-2">
              Topics:
            </Text>
            {tutor.topics.length !== 0 ? (
              tutor.topics.map((topic, idx) => (
                <Text
                  key={idx}
                  className="mb-1 ml-2 bg-neutral-200 rounded-2xl p-2"
                >
                  {topic}
                </Text>
              ))
            ) : (
              <Text className="mb-1 bg-neutral-200 rounded-2xl p-2 ml-3">
                None
              </Text>
            )}
          </View>
        </View>
        <View className="border-b-neutral-400 border-b mx-4 py-3 mb-4">
          <View className="flex-row">
            <Text className="text-xl font-semibold self-center">
              Availability:
            </Text>
            <View className="flex-row my-2 text-wrap">
              {tutor.availability.length !== 0 ? (
                tutor.availability.map((day, idx) => (
                  <Text
                    key={idx}
                    className="ml-2 bg-neutral-200 rounded-2xl p-2"
                  >
                    {day}
                  </Text>
                ))
              ) : (
                <Text className="bg-neutral-200 rounded-2xl p-2 ml-3">
                  No Schedule Set
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TutorDetails;
