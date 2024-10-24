import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const SessionsComponent = ({ navigation }) => {
  const { logout, user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout();
      if (user == null) navigation.navigate("Auth");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sessions Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Go Home" />
      <Button onPress={handleLogout} title="Log Out" />
    </View>
  );
};

export default SessionsComponent;