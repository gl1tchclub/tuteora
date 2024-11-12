/**
 * @fileoverview Screen component for displaying sessions.
 * This screen renders the SessionsComponent component, passing down navigation properties.
 * Uses React Native's View component for layout structure.
 */

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