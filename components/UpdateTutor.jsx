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
        <View className="w-full flex-1 pb-2">
          <TextInput
            className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
            value={bio}
            onChangeText={setBio}
            placeholder={profile.bio || "Bio"}
          />
          <Text className="mt-4 self-center text-lg">Availability</Text>
          <View className="flex-row space-x-4 flex-wrap mt-4 w-full">
            {days.map((day, index) => (
              <View key={index} className="flex-row space-x-2">
                <Text>{day}</Text>
                <Checkbox
                  value={availability}
                  onValueChange={(option) => handleAvailability(option)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateTutor;
