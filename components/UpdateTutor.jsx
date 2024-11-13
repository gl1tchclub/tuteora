/**
 * UpdateTutor component allows a tutor to update their profile details, including bio, availability, topics, and availability for new students.
 *
 * @param {object} props - Component properties.
 * @param {object} props.navigation - React Navigation object used for navigating to different screens.
 *
 * @returns {JSX.Element} - Rendered component displaying form elements for updating tutor details.
 */

import { useEffect, useState, useContext, useMemo } from "react";
import { TutorContext } from "../contexts/TutorsContext";
import { UserContext } from "../contexts/UserContext";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { RadioGroup } from "react-native-radio-buttons-group";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "0",
      label: "Yes",
      value: true,
    },
    {
      id: "1",
      label: "No",
      value: false,
    },
  ]);

  const handleUpdate = async () => {
    try {
      setErrorMsg(null);
      const newProfile = {
        id: profile.id,
        accountType: profile.accountType,
        email: profile.email,
        study: profile.study,
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio,
        availability,
        isAvailable,
        students: profile.students,
      };

      const newTopics = topics.map((topic) => topic.toLowerCase());
      const currentTopics = profile.topics.map((topic) => topic.toLowerCase());

      if (newTopics == currentTopics) {
      }

      // profile.bio = bio;
      // availability.length == 0
      //   ? (profile.availability = availability)
      //   : profile.availability.splice(0, 0, ...availability);
      // profile.isAvailable = isAvailable;
      // topics.length == 0
      //   ? (profile.topics = topics)
      //   : profile.topics.splice(0, 0, ...topics);
      // await updateTutor(profile, true);
    } catch (error) {
      console.error("Tutor update error: ", error.message);
      setErrorMsg(error.message);
    } finally {
      if (errorMsg) {
        Alert.alert("Error", errorMsg);
        setErrorMsg(null);
      } else {
        setErrorMsg(null);
        // Alert.alert(
        //   "Success",
        //   `Availability: ${availability}\nTopics: ${topics}\nIs Available: ${isAvailable}`
        // );
        // navigation.navigate("Dashboard");
      }
    }
  };

  const handleAvailability = (option) => {
    const updatedAvailability = new Set(availability);
    const lastAvailability = new Set(profile.availability);
    if (updatedAvailability.has(option)) {
      updatedAvailability.delete(option);
    } else {
      updatedAvailability.add(option);
    }

    const areSetsEqual = (setA, setB) => {
      if (setA.size !== setB.size) return false; // Check if sizes are different
      for (let elem of setA) {
        if (!setB.has(elem)) {
          return false;
        }
      }
      return true;
    };

    const isSame = areSetsEqual(lastAvailability, updatedAvailability);

    // console.log("Old: ", lastAvailability);
    // console.log("New: ", updatedAvailability);

    setIsDisabled(isSame);

    setAvailability([...updatedAvailability]);
  };

  const handleTopics = () => {
    if (currentTopic) {
      setErrorMsg(null);
      const newTopics = topics.map((topic) => topic.toLowerCase());
      if (!newTopics.includes(currentTopic.toLowerCase())) {
        setIsDisabled(false);
        setTopics([...topics, currentTopic]);
        setCurrentTopic("");
      } else {
        setErrorMsg("Topic already exists");
      }
    }
  };

  const deleteTopic = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
    setIsDisabled(false);
  };

  const handleRadioButtons = (selectedButton) => {
    setSelectedButtonId(selectedButton);
    setIsAvailable(radioButtons[selectedButton].value);
    // console.log(isAvailable, radioButtons[selectedButton].label);
  };

  useEffect(() => {
    setSelectedButtonId(isAvailable && availability.length > 0 ? "0" : "1");
  }, [availability]);

  return (
    <ScrollView className="flex-1 w-full h-full bg-white">
      <View
        className="flex-1 w-11/12 my-5 rounded-lg bg-white p-6 self-center"
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
            onChangeText={(bio) => {
              setBio(bio);
              profile.bio != bio ? setIsDisabled(false) : setIsDisabled(true);
            }}
            autoCapitalize="sentences"
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
              autoCapitalize="words"
            />
            <Text className="text-neutral-500">
              Press enter after entering a topic
            </Text>
            <View className="flex-row flex-wrap">
              {topics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    deleteTopic(topic);
                  }}
                  className="space-x-2"
                >
                  <Text
                    key={index}
                    className="ml-2 mt-2 bg-neutral-200 rounded-2xl p-2"
                  >
                    {topic}
                    <MaterialCommunityIcons
                      name="close"
                      size={10}
                      color="black"
                    />
                  </Text>
                </TouchableOpacity>
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
          {errorMsg && <Text className="text-red-500 mb-2">{errorMsg}</Text>}
          <Button
            title="Update"
            onPress={handleUpdate}
            color="#46ab61"
            disabled={isDisabled}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateTutor;
