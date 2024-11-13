/**
 * CreateSession component allows the user to create a new session request.
 * It includes inputs for selecting a student, specifying session details (topic, date, time, and location),
 * and sending the request for session creation.
 * The component also manages loading states, error handling, and navigation after a successful request.
 *
 * @param {Object} navigation - The navigation prop for navigating to other screens.
 * @returns {JSX.Element} The CreateSession screen for requesting a new session.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { RequestsContext } from "../contexts/RequestsContext";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SessionContext } from "../contexts/SessionsContext";

const CreateSession = ({ navigation }) => {
  const { sessions } = useContext(SessionContext);
  const { createRequest, requests } = useContext(RequestsContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [topic, setTopic] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    if (profile?.tutor) {
      setReceiver(profile.tutor);
    }
    console.log(receiver);
    console.log("requests:", requests);
  }, [requests]);

  const handleCreateSessionRequest = async () => {
    let localErrorMsg = null;
    setErrorMsg(localErrorMsg);

    try {
      setLoading(true);
      const newSession = {
        creator: {
          id: profile.id,
          name: `${profile.firstName} ${profile.lastName}`,
        },
        receiver: {
          id: receiver.id,
          name: receiver.name,
        },
        topic,
        date,
        time,
        type: "session",
        location: location != null ? location : "TBD",
      };

      const requiredFields = ["creator", "receiver", "topic", "date", "time"];
      const missingFields = requiredFields.filter(
        (field) => !newSession[field]
      );

      if (missingFields.length > 0) {
        localErrorMsg = "Please fill in all fields";
        setErrorMsg(localErrorMsg);
        setLoading(false);
        return;
      }

      const existingRequest = requests.find(
        (req) =>
          req.creator.id === newSession.creator.id &&
          req.receiver.id === newSession.receiver.id &&
          req.type === newSession.type
      );

      const existingSession = sessions.find(
        (sesh) =>
          sesh.creator.id === newSession.creator.id &&
          sesh.receiver.id === newSession.receiver.id &&
          sesh.date === newSession.date &&
          sesh.isCompleted === false
      );

      if (!existingRequest && !existingSession) {
        console.log("\nCreating...");
        setErrorMsg(null);
        await createRequest(newSession);
      } else {
        localErrorMsg = "Session is already requested or exists!";
        setErrorMsg(localErrorMsg);
      }
    } catch (err) {
      console.error("Create session error:", err.message);
      Alert.alert("Error creating session", err.message);
      localErrorMsg = err.message;
      setErrorMsg(localErrorMsg);
    } finally {
      setLoading(false);
      if (!localErrorMsg) {
        console.log("\nSuccess", topic);
        Alert.alert(
          "Session Requested!",
          `\nRequest to: ${receiver.name}
          \nTopic: ${topic}
          \nDate: ${date}
          \nTime: ${time}
          \nLocation: ${location}`
        );
        setErrorMsg(null);
        navigation.navigate("Requests");
      } else {
        Alert.alert("Error:", localErrorMsg);
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
    <ScrollView className="flex-1 w-full h-full bg-white">
      <View
        className="flex-1 w-11/12 m-12 rounded-lg bg-white p-6 self-center"
        style={{ elevation: 5 }}
      >
        <Text className="font-bold text-2xl self-center mb-6">
          <MaterialCommunityIcons
            name="file-document-edit"
            size={40}
            color="black"
          />
          New Session
        </Text>
        {profile.students && (
          <View className="w-full flex-row pb-2 space-x-10">
            <Text className="font-semibold text-lg self-center pb-2">
              Student:
            </Text>
            {profile.students.length > 0 ? (
              <View className="h-10 w-8/12 justify-center bg-[#46ab61]/[.6] rounded-lg">
                <Picker
                  selectedValue={receiver}
                  onValueChange={(studentId) => setReceiver(studentId)}
                  style={{ color: "white" }}
                >
                  <Picker.Item label="Select Student" value={null} />
                  {profile.students.map((student) => (
                    <Picker.Item
                      label={student.name}
                      value={student}
                      key={student.id}
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
        {profile.accountType === "Student" &&
          (profile.tutor ? (
            <Text className="font-semibold text-lg self-center pb-2">
              Session with{" "}
              <Text className="italic" numberOfLines={1} ellipsizeMode="tail">
                {profile.tutor.name}
              </Text>
            </Text>
          ) : (
            <Text className="font-semibold text-lg self-center pb-2">
              No Tutor Available
            </Text>
          ))}
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
        {errorMsg && <Text className="text-red-500 mt-6">{errorMsg}</Text>}
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View className="mt-6 self-center">
            <Button
              title="Create Session"
              onPress={handleCreateSessionRequest}
              color="#46ab61"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CreateSession;
