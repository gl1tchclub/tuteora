import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

const TutorDetails = (props) => {
  const { profile, updateProfile } = useContext(UserContext);
  const [request, setRequest] = useState(null);
  const [topic, setTopic] = useState(null);
  const tutor = props.tutor.tutor;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  const handleRequestTutor = (tutorId) => {};

  return (
    <ScrollView className="flex-1 bg-white w-full">
      <View className="relative w-full h-48 mb-3">
        <View
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundColor: randomColor, opacity: 0.6 }}
        />
        <View className="absolute bottom-0 left-0 flex-row justify-between w-full">
          <View
            className="rounded-lg mb-4 ml-4 border border-neutral-400/[0.1]"
            style={{
              backgroundColor: randomColor,
              shadowColor: "#00000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text className="text-2xl font-bold text-white p-3">
              {tutor.firstName} {tutor.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleRequestTutor(tutor.id)}
            className="bg-green-500 rounded-lg w-fit-content self-center mx-4 flex-row items-center border border-neutral-400/[0.1]"
            style={{
              shadowColor: "#000000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <MaterialCommunityIcons
              name="account-arrow-right"
              size={24}
              color="white"
              style={{ paddingHorizontal: 4, paddingVertical: 2 }}
            />
            <Text className="text-white px-2 text-lg">Request Tutoring</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex-1 justify-center">
        <View className="w-full p-4 bg-green-200">
          <Text className="text-xl mb-3 font-bold">About Me</Text>
          <Text className="text-base mb-8">{tutor.bio || "No Bio"}</Text>
        </View>
        <View className="w-full flex-grow">
          <Text className="text-lg mb-3">Studying: {tutor.study}</Text>
          <Text className="text-xl font-bold mb-2">Topics:</Text>
          {tutor.topics &&
            tutor.topics.map((topic, idx) => (
              <Text key={idx} className="text-base mb-1">
                - {topic}
              </Text>
            ))}
        </View>
        <Text className="text-xl font-bold mb-2">Availability:</Text>
        <Text className="text-base mb-8">
          {tutor.availability || "No Schedule Set"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default TutorDetails;
