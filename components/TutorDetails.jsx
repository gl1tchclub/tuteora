import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

const TutorDetails = (props) => {
  const { profile, updateProfile } = useContext(UserContext);
  const [request, setRequest] = useState(null);
  const [topic, setTopic] = useState(null);
  const tutor = props.tutor;
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  const handleRequestTutor = (tutorId) => {};

  return (
    <ScrollView className="flex-1 bg-white w-full">
      <View className="w-full h-2/3 mb-3 bg-cover bg-center bg-no-repeat" style={{ backgroundColor: randomColor, opacity: 0.6 }} />
      <Text className="text-2xl font-bold mb-2">
        {tutor.firstName} {tutor.lastName}{" "}
        <TouchableOpacity
          onPress={() => handleRequestTutor(tutor.id)}
          className="bg-green-500 rounded w-fit-content self-center mr-2"
        >
          <MaterialCommunityIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </Text>
      <Text className="text-lg mb-3">Bio</Text>
      <Text className="text-base mb-8">{tutor.bio || "No Bio"}</Text>
      <Text className="text-lg mb-3">Studying: {tutor.study}</Text>
      <Text className="text-xl font-bold mb-2">Topics:</Text>
      {tutor.topics && tutor.topics.map((topic, idx) => (
        <Text key={idx} className="text-base mb-1">
          - {topic}
        </Text>
      ))}
      <Text className="text-xl font-bold mb-2">Availability:</Text>
      <Text className="text-base mb-8">{tutor.availability || "No Schedule Set"}</Text>
    </ScrollView>
  );
};

export default TutorDetails;
