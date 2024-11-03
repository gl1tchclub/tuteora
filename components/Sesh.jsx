import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button, TextInput, Alert, KeyboardAvoidingView } from "react-native";
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
  const [student, setStudent] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [subject, setSubject] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { profile } = useContext(UserContext);
  const associates = profile.associates;

  useEffect(() => {
    if (profile.accountType === "Tutor") {
      setTutor(profile.id);
    } else {
      setStudent(profile.id);
    }
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
        behavior="padding"
    >
    <View className="flex-1 w-11/12 m-4 rounded-lg bg-white p-6">
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
          <View className="h-10 w-8/12 justify-center bg-[#46ab61]/[.6] rounded-lg">
            <Picker
              selectedValue={student}
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
        </View>
      )}
      <TextInput
        className="h-10 rounded-lg border-2 border-gray-400 px-4 text-lg my-4"
        value={subject}
        onChangeText={setSubject}
        placeholder="Subject"
      />
      <TouchableOpacity title="Set Date & Time" onPress={showDatePicker} className="text-[#46ab61]"/>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        value={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="spinner"
        is24Hour={false}
        negativeButton={{ label: "Cancel", textColor: "red" }}
        positiveButton={{ label: "Confirm", textColor: "green" }}
        minuteInterval={15}
      />
      <Text>Selected: {date && date.toLocaleString()}</Text>
    </View>
    </KeyboardAvoidingView>
  );
};

export default CreateSession;