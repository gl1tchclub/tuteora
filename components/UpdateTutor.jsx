import { useEffect, useState, useContext } from "react";
import { TutorContext } from "../contexts/TutorsContext";
import { UserContext } from "../contexts/UserContext";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
// import CheckBox from '@react-native-community/checkbox';
// import CheckBox from "@react-native-community/checkbox";
import Checkbox from "expo-checkbox";
// import { CheckBoxComponent } from "@react-native-community/checkbox";

const UpdateTutor = ({ navigation }) => {
  const { tutors, updateTutor } = useContext(TutorContext);
  const { profile } = useContext(UserContext);
  const [bio, setBio] = useState(profile.bio || "");
  const [isAvailable, setIsAvailable] = useState(profile.isAvailable);
  const [availability, setAvailability] = useState(profile.availability || []);
  const [topics, setTopics] = useState(profile.topics || []);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleUpdate = async (tutor) => {
    try {
      await updateTutor(profile.id, { students: profile.students });
    } catch (error) {
      console.error("Tutor update error: ", error.message);
    }
  };

  const handleAvailability = (option) => {
    let updatedAvailability = [...availability];
    if (updatedAvailability.includes(option)) {
      updatedAvailability = updatedAvailability.filter((day) => day !== option);
    } else {
      updatedAvailability.push(option);
    }
    setAvailability(updatedAvailability);
  };

  return (
    <ScrollView className="flex-1 w-full h-full bg-white">
      <View
        className="flex-1 w-11/12 m-12 rounded-lg bg-white p-6 self-center"
        style={{ elevation: 5 }}
      >
        <Text className="text-2xl font-bold self-center">Tutor Details</Text>
        <Text className="text-neutral-500 self-center mb-2">
          This is what potential students will see
        </Text>
        <View className="w-full flex-1 pb-2">
          <TextInput
            className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
            value={bio}
            onChangeText={setBio}
            placeholder={profile.bio || "Bio (200 characters)"}
            maxLength={200}
          />
          <View className="border-b-neutral-300 border-b mt-6 w-full self-center" />
          <Text className="mt-6 self-center text-lg">Availability</Text>
          <View className="flex-row space-x-4 flex-wrap mt-4 w-full">
            {days.map((day, index) => (
              <View key={index} className="flex-row space-x-2">
                <Text>{day}</Text>
                <Checkbox
                  value={availability.includes(day)}
                  onValueChange={() => handleAvailability(day)}
                />
              </View>
            ))}
          </View>
          <View className="border-b-neutral-300 border-b mt-6 w-full self-center" />
          <View>
            <Text className="mt-6 self-center text-lg">Topics</Text>
          </View>
          <View className="border-b-neutral-300 border-b mt-6 w-full self-center" />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateTutor;
