import { View, Text, Button, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { RequestsContext } from "../contexts/RequestsContext";
import { SessionContext } from "../contexts/SessionsContext";
import { TutorContext } from "../contexts/TutorsContext";

const HomeScreen = (props) => {
  const { profile, logout, user } = useContext(UserContext);
  const { sessions } = useContext(SessionContext);
  const { updateTutor } = useContext(TutorContext);
  const { requests } = useContext(RequestsContext);
  const [isRequested, setIsRequested] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("");

  useEffect(() => {
    console.log("reqs:",requests);
    if (profile.accountType === "Student") {
      if (profile.tutor) {
        setButtonMessage("Change Tutor");
        setIsRequested(false);
      } else if (
        requests.length > 0 &&
        !requests.includes(
          (req) =>
            req.receiver.id === tutor.id &&
            req.creator.id === profile.id &&
            req.type === "student"
        )
      ) {
        setIsRequested(true);
      } else {
        setButtonMessage("Request A Tutor");
        setIsRequested(false);
      }
    }
  }, [requests]);

  useEffect(() => {
    console.log("sessions:",sessions);
  }, [sessions]);

  const handleNavigateUpdate = async () => {
    props.navigation.navigate("UpdateTutor");
  };

  const handleLogout = async () => {
    try {
      await logout();
      if (user == null) navigation.navigate("Auth");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
      <View className="flex-1 h-full bg-white items-center">
        <Text className="text-3xl pt-8" numberOfLines={2} ellipsizeMode="tail">
          Welcome,
        </Text>
        <Text className="text-3xl" numberOfLines={2} ellipsizeMode="tail">
          {profile.firstName}
        </Text>
        <View className="bg-white p-4 w-2/3 mt-4 h-max rounded-xl shadow-md shadow-black">
          <Text className="text-lg bg-neutral-100 rounded-lg p-2 my-4">
            Email: {profile.email}
          </Text>
          <Text className="text-lg bg-neutral-100 rounded-lg p-2 my-4">
            Account: {profile.accountType}
          </Text>
          {profile.accountType === "Student" && (
            <View className="mb-2">
              {!isRequested ? (
                <Button
                  color="#46ab61"
                  title={buttonMessage}
                  onPress={() => props.navigation.navigate("Tutors")}
                />
              ) : (
                <Text className="text-lg self-center">Tutor Pending . . .</Text>
              )}
            </View>
          )}
          {profile.accountType === "Tutor" && (
            <View className="flex-row flex-wrap bg-neutral-100 rounded-lg p-2 my-4">
              <Text className="text-lg">Students: </Text>
              {profile.students.length > 0 ? (
                profile.students.map((student, index) => (
                  <Text key={index} className="text-lg">
                    {student.name}
                    {index < profile.students.length - 1 ? ", " : ""}
                  </Text>
                ))
              ) : (
                <Text className="text-lg">None</Text>
              )}
            </View>
          )}
          {profile.accountType === "Tutor" && (
            <View className="mb-2">
              <Button
                onPress={handleNavigateUpdate}
                title="Edit Tutor Profile"
                color="#46ab61"
              />
            </View>
          )}
          <Button onPress={handleLogout} title="Log Out" color="#2b69ba" />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
