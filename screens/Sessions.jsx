import { View } from "react-native";
import SessionsComponent from "../components/Sessions";

const SessionsScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <SessionsComponent navigation={props.navigation}/>
    </View>
  );
};

export default SessionsScreen;