import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const HomeScreen = () => {
  const { profile, logout, user } = useContext(UserContext);

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
        <Text className="text-lg bg-neutral-200 rounded-lg p-2 my-4">
          Name: {profile.firstName} {profile.lastName}
        </Text>
        <Text className="text-lg bg-neutral-200 rounded-lg p-2 my-4">
          Email: {profile.email}
        </Text>
        <Text className="text-lg bg-neutral-200 rounded-lg p-2 my-4">
          Account: {profile.accountType}
        </Text>
        <Button
          onPress={handleLogout}
          title="Log Out"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
