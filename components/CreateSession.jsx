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
  const { createRequest, requests } = useContext(RequestsContext);
  const { sessions } = useContext(SessionContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  // const [student, setStudent] = useState(null);
  // const [tutor, setTutor] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [topic, setTopic] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    if (profile.accountType === "Student" && profile.tutor) {
      setReceiver({ id: profile.tutor.id, name: profile.tutor.name });
    } else {
      setReceiver({
        id: profile.students[0].id,
        name: profile.students[0].name,
      });
    }
    console.log(receiver);
    console.log("requests:", requests);
  }, []);

  const handleCreateSessionRequest = async () => {
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
        location: location ? location : "TBD",
        isCompleted: false,
      };
      console.log("Session:", newSession);
      if (
        requests.find(
          (req) =>
            req.creator.id === newSession.creator.id &&
            req.receiver.id === newSession.receiver.id &&
            req.type === newSession.type
        )
      ) {
        await createRequest(newSession);
        setError(null);
      } else {
        setError("Session already requested!");
      }
      console.log("Requests:", requests);
    } catch (err) {
      console.error("Create session error:", err.message);
      Alert.alert("Error creating session", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      if (error) {
        Alert.alert("Error:", error);
      }
      if (!error) {
        Alert.alert(
          "Session Requested!",
          `\nRequest to: ${receiver.name}
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
        {profile.tutor && (
          <Text className="font-semibold text-lg self-center pb-2">
            Session with <Text className="italic">{profile.tutor.name}</Text>
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
