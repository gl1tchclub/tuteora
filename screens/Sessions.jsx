import { View, Text, Button } from "react-native";
import { useContext } from "react";
import SessionsComponent from "../components/Sessions";
import { UserContext } from "../contexts/UserContext";

const SessionsScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <SessionsComponent navigation={props.navigation}/>
    </View>
  );
};

export default SessionsScreen;