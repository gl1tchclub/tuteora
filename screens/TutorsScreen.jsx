/**
 * @fileoverview Screen component for displaying tutors.
 * This screen renders the TutorList component, passing down navigation properties.
 * Uses React Native's View component for layout structure.
 */

import { View } from "react-native";
import TutorList from "../components/TutorList";

const TutorListScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
       <TutorList navigation={props.navigation}/>
    </View>
  );
};

export default TutorListScreen;