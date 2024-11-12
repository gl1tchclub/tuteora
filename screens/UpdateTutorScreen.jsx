/**
 * @fileoverview Screen component for updating tutor information.
 * This screen renders the UpdateTutor component, passing down navigation properties.
 * Uses React Native's View component for layout structure.
 */

import { View } from "react-native";
import UpdateTutor from "../components/UpdateTutor";

const UpdateTutorScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <UpdateTutor navigation={props.navigation}/>
    </View>
  );
};

export default UpdateTutorScreen;
