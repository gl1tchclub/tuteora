/**
 * TutorList component displays a list of available tutors that a student can select.
 * It filters the list of tutors based on availability and checks for existing requests or students already assigned to the tutor.
 *
 * @param {object} props - Component properties.
 * @param {object} props.navigation - React Navigation object used for navigating to different screens.
 *
 * @returns {JSX.Element} - Rendered component displaying a list of available tutors.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { TutorContext } from "../contexts/TutorsContext";
import { RequestsContext } from "../contexts/RequestsContext";

const TutorList = ({ navigation }) => {
  const { profile } = useContext(UserContext);
  const { tutors } = useContext(TutorContext);
  const { requests } = useContext(RequestsContext);
  const [availableTutors, setAvailableTutors] = useState([]);

  useEffect(() => {
    setAvailableTutors(
      tutors.filter(
        (tutor) =>
          tutor.isAvailable &&
          (!profile.tutor || `${tutor.firstName} ${tutor.lastName}` != profile.tutor.name) &&
          !requests.includes(
            (req) =>
              req.receiver.id === tutor.id &&
              req.creator.id === profile.id &&
              req.type === "student"
          )
      )
    );
    console.log("Tutors: ", availableTutors);
  }, [tutors]);

  const handlePress = (tutor) => {
    navigation.navigate("TutorInfo", { tutor });
  };

  const RenderTutor = (tutor) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(tutor)}
        className="flex-row justify-between items-center p-4 border-b border-[#46ab61]/[0.5]"
      >
        <View className="space-x-6 flex-row">
          <Text className="font-bold text-lg text-black">
            {tutor.firstName}
          </Text>
          <Text className="font-bold text-lg text-black">{tutor.lastName}</Text>
        </View>
        <View className="">
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#46ab61"
          />
        </View>
      </TouchableOpacity>
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
      <View className="flex-1 p-6 bg-white shadow-lg rounded-lg shadow-black m-6">
        {availableTutors.length !== 0 ? (
          availableTutors.map((tutor, idx) => (
            <View key={idx}>
              <RenderTutor {...tutor} />
            </View>
          ))
        ) : (
          <Text className="text-lg text-center text-neutral-600">
            No available tutors at the moment. Please check back later.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TutorList;
