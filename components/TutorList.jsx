import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { TutorContext } from "../contexts/TutorsContext";

const TutorList = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  const { tutors } = useContext(TutorContext);
  console.log("Tutors: ", tutors);

  const availableTutors = tutors.filter((tutor) => tutor.isAvailable);

  const handlePress = (tutor) => {
    navigation.navigate("TutorDetails", { tutor });
  };

  const RenderTutor = (tutor) => {
    return (
      <View>
        <TouchableOpacity className="flex-row space-x-6 p-4">
          <Text className="font-bold text-lg text-black">
            {tutor.firstName}
          </Text>
          <Text className="font-bold text-lg text-black">{tutor.lastName}</Text>
        </TouchableOpacity>
        <View className="border-b w-full border-[#46ab61]/[0.5] rounded-lg" />
      </View>
    );
  };

  return (
    <ScrollView className="bg-white w-full h-full">
      <View className="p-6">
        <Text className="font-semibold text-3xl">Select A Tutor</Text>
        <Text className="text-md text-slate-500">
          View any tutor profile from the following available {profile.study}{" "}
          tutors.
        </Text>
      </View>
      <View className="bg-white shadow-lg rounded-lg shadow-black m-6">
        <View className="flex-1 p-6">
          {availableTutors.map((tutor, idx) => (
            <View key={idx}>
              <RenderTutor {...tutor} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TutorList;
