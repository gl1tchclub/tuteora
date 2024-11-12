import { useEffect, useState, useContext } from "react";
import { TutorContext } from "../contexts/TutorsContext";
import { UserContext } from "../contexts/UserContext";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from "@react-native-community/checkbox";
// import { CheckBoxComponent } from "@react-native-community/checkbox";

const UpdateTutor = ({ navigation }) => {
  const { tutors, updateTutor } = useContext(TutorContext);
  const { profile } = useContext(UserContext);
  const [bio, setBio] = useState(profile.bio);
  const [availability, setAvailability] = useState(profile.availability);
  const [isAvailable, setIsAvailable] = useState(profile.isAvailable);
  let availabilityArr = [availability];

  const handleUpdate = async (tutor) => {
    try {
      await updateTutor(profile.id, { students: profile.students });
    } catch (error) {
      console.error("Tutor update error: ", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 w-full h-full bg-white">
      <View
        className="flex-1 w-11/12 m-12 rounded-lg bg-white p-6 self-center"
        style={{ elevation: 5 }}
      >
        <View className="w-full flex-row pb-2 space-x-10">
          <TextInput
            className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
            value={bio}
            onChangeText={setBio}
            placeholder={profile.bio}
          />
          <CheckBox
            selectedValue={availability}
            onValueChange={(option) => availabilityArr.push(option)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateTutor;
