import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionsContext";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const CreateSession = ({ navigation }) => {
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

  return (
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
      <Text>
        Time:
      </Text>
      <ScrollPicker
        dataSource={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]}
        selectedIndex={1}
        renderItem={(data, index, isSelected) => {
          //
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperWidth={150}
        wrapperBackground={"#FFFFFF"}
        itemHeight={60}
        highlightColor={"#d8d8d8"}
        highlightBorderWidth={2}
      />
      <Text>Create Screen</Text>
    </View>
  );
};

export default CreateSession;
