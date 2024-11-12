import { useEffect, useState, useContext, useMemo } from "react";
import { TutorContext } from "../contexts/TutorsContext";
import { UserContext } from "../contexts/UserContext";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import { RadioGroup } from "react-native-radio-buttons-group";

const UpdateTutor = ({ navigation }) => {
  const { updateTutor } = useContext(TutorContext);
  const { profile } = useContext(UserContext);
  const [bio, setBio] = useState(profile.bio || "");
  const [isAvailable, setIsAvailable] = useState(profile.isAvailable);
  const [availability, setAvailability] = useState(profile.availability || []);
  const [topics, setTopics] = useState(profile.topics || []);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const [currentTopic, setCurrentTopic] = useState("");
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "0",
      label: "Yes",
      value: false,
    },
    {
      id: "1",
      label: "No",
      value: true,
    },
  ]);

  const handleUpdate = async () => {
    try {
      profile.bio = bio;
      profile.availability.push(...availability);
      profile.isAvailable = isAvailable;
      profile.topics.push(...topics);
      await updateTutor(profile);
    } catch (error) {
      console.error("Tutor update error: ", error.message);
    } finally {
      if (errorMsg) {
        Alert.alert("Error", errorMsg);
      } else {
        Alert.alert("Success", "Profile updated successfully");
        navigation.navigate("Dashboard");
      }
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

  const handleTopics = () => {
    if (currentTopic) {
      setTopics([...topics, currentTopic]);
      setCurrentTopic("");
    }
  };

  const handleRadioButtons = (selectedButton) => {
    setSelectedButtonId(selectedButton);
    setIsAvailable(radioButtons[selectedButton].value);
    console.log(isAvailable, radioButtons[selectedButton].label);
  };

  useEffect(() => {
    console.log("Topics: ", topics);
  }, [topics]);

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
            <TextInput
              className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
              value={currentTopic}
              onChangeText={setCurrentTopic}
              onSubmitEditing={handleTopics}
              placeholder="Topic"
              maxLength={20}
            />
            <Text className="text-neutral-500">
              Press enter after entering a topic
            </Text>
            <View className="flex-row flex-wrap">
              {topics.map((topic, index) => (
                <Text
                  key={index}
                  className="ml-2 mt-2 bg-neutral-200 rounded-2xl p-2"
                >
                  {topic}
                </Text>
              ))}
            </View>
          </View>
          <View className="border-b-neutral-300 border-b mt-6 w-full self-center" />
          <View>
            <Text className="mt-6 self-center text-lg mb-2">
              Are you able to take on more students?
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={(button) => handleRadioButtons(button)}
              selectedId={selectedButtonId}
              layout="row"
            />
          </View>
          <View className="border-b-neutral-300 border-b my-6 w-full self-center" />
          {errorMsg && <Text>{errorMsg}</Text>}
          <Button title="Update" onPress={handleUpdate} color="#46ab61" />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateTutor;
