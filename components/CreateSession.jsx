import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "react-native-modal-datetime-picker";

const CreateSession = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  // const [student, setStudent] = useState(null);
  // const [tutor, setTutor] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [topic, setTopic] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const { profile } = useContext(UserContext);
  const { createSession, sessions } = useContext(SessionContext);
  const associates = profile.accountType == "Tutor" ? profile.students : profile.tutor;
  const creatorId = profile.id;

  // useEffect(() => {
  //   if (profile.accountType === "Tutor") {
  //     setTutor(profile.id);
  //   } else {
  //     setStudent(profile.id);
  //   }
  // }, []);

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      if (tutor && topic && date && time) {
        // session = await createSession(
        //   {
        //     student,
        //     tutor,
        //     topic,
        //     date,
        //     time,
        //     location,
        //   },
        //   profile.accountType
        // );
        setSession({
          // student,
          tutor,
          topic,
          date,
          time,
          location,
        });
      }
      setError(null);
    } catch (error) {
      console.error("Create session error:", error.message);
      Alert.alert("Error creating session", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      if (session) {
        Alert.alert(
          "Session Created!",
          `\nTutor: Jeff
          \nStudent: Jane
          \nTopic: ${topic}
          \nDate: ${date}
          \nTime: ${time}
          \nLocation: ${location}`
        );
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTime) => {
    console.log("A date has been picked: ", dateTime);
    setDateTime(dateTime);
    setTime(dateTime.toLocaleTimeString());
    setDate(dateTime.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <ScrollView className="flex-1 w-11/12 m-12 rounded-lg bg-white p-6">
      <Text className="font-bold text-2xl self-center mb-6">
        <MaterialCommunityIcons
          name="file-document-edit"
          size={40}
          color="black"
        />
        New Session
      </Text>
      {tutor && (
        <View className="w-full flex-row pb-2 space-x-10">
          <Text className="font-semibold text-lg self-center pb-2">
            Student:
          </Text>
          {associates || !associates.length == 0 ? (
            <View className="h-10 w-8/12 justify-center bg-[#46ab61]/[.6] rounded-lg">
              <Picker
                selectedValue={receiverId}
                onValueChange={(itemValue) => setStudent(itemValue)}
                style={{ color: "white" }}
              >
                {associates.map((student) => (
                  <Picker.Item
                    label={student.firstName + " " + student.lastName}
                    value={student.uid}
                    key={student.uid}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <Text className="font-semibold text-lg pb-2 italic">
              No students found
            </Text>
          )}
        </View>
      )}
      {student && (
        <Text className="font-semibold text-lg self-center pb-2">
          Session with <Text className="italic">{associates.firstName} {associates.lastName}</Text>
        </Text>
      )}
      <TextInput
        className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
        value={topic}
        onChangeText={setTopic}
        placeholder="Topic"
      />
      <Text className="text-slate-500 py-2">
        Put 'General' if non-specific.
      </Text>
      <View className="w-full flex-row py-2 space-x-6">
        <Text className="text-black font-semibold text-lg self-center py-2">
          Date/Time:
        </Text>
        <Pressable
          onPress={showDatePicker}
          className="rounded-lg border-2 border-[#46ab61] h-fit self-center items-center flex-row p-2 pr-4"
        >
          <MaterialCommunityIcons
            name="calendar-clock"
            size={15}
            color="black"
          />
          <Text className="ml-1">
            {dateTime
              ? dateTime.toLocaleDateString() +
                "     " +
                dateTime.toLocaleTimeString()
              : "Select Date & Time"}
          </Text>
        </Pressable>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        value={dateTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="spinner"
        is24Hour={false}
        negativeButton={{ label: "Cancel", textColor: "red" }}
        positiveButton={{ label: "Confirm", textColor: "green" }}
        minuteInterval={15}
      />
      <TextInput
        className="h-10 rounded-lg border-2 border-[#46ab61] px-4 text-lg mt-4"
        value={location}
        onChangeText={setLocation}
        placeholder="Location (optional)"
      />
      {error && <Text className="text-red-500 my-6">{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="mt-10 self-center">
          <Button
            title="Create Session"
            onPress={handleCreateSession}
            color="#46ab61"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default CreateSession;
