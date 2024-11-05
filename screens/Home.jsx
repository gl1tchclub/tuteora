import { View, Text, Button } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const HomeScreen = (props) => {
  const { profile, logout, user } = useContext(UserContext);
  const [buttonMessage, setButtonMessage] = useState("");
  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    if (profile.tutor) {
      setButtonMessage("Change Tutor");
    } else {
      setButtonMessage("Request A Tutor");
    }
  }, [profile]);

  const handleLogout = async () => {
    try {
      await logout();
      if (user == null) navigation.navigate("Auth");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <View className="flex-1 items-center h-full bg-neutral-100">
      <Text className="text-3xl py-6">Welcome, {profile.firstName}</Text>
      <View className="bg-white p-4 w-2/3 mt-10 h-max rounded-xl">
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
            <Button
              color="#46ab61"
              title={buttonMessage}
              onPress={() => props.navigation.navigate("Tutors")}
            />
          </View>
        )}
        <Button onPress={handleLogout} title="Log Out" color="#2b69ba" />
      </View>
    </View>
  );
};

export default HomeScreen;
