import { View, Text, Button, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { RequestsContext } from "../contexts/RequestsContext";

const HomeScreen = (props) => {
  const { profile, logout, user } = useContext(UserContext);
  const { requests } = useContext(RequestsContext);
  const [isRequested, setIsRequested] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("");
  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    console.log(requests);
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

  const handleLogout = async () => {
    try {
      await logout();
      if (user == null) navigation.navigate("Auth");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle="pt-5">
      <View className="flex-1 h-full bg-white items-center">
        <Text className="text-3xl py-6">Welcome, {profile.firstName}</Text>
        <View className="bg-white p-4 w-2/3 mt-10 h-max rounded-xl shadow-md shadow-black">
          <Text className="text-lg bg-neutral-100 rounded-lg p-2 my-4">
            Name: {profile.firstName} {profile.lastName}
          </Text>
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
              {profile.students.map((student, index) => (
                <Text key={index} className="text-lg">
                  {student.name}
                  {index < profile.students.length - 1 ? ", " : ""}
                </Text>
              ))}
            </View>
          )}
          <Button onPress={handleLogout} title="Log Out" color="#2b69ba" />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
