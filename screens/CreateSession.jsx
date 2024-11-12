/**
 * @fileoverview Screen component for displaying a create session form.
 * This screen renders the CreateSession component, passing down navigation properties.
 * Uses React Native's View component for layout structure.
 */

import { View } from "react-native";
import CreateSession from "../components/CreateSession";

const CreateSessionScreen = (props) => {
  return (
    <View className="flex-1 justify-center items-center">
       <CreateSession navigation={props.navigation}/>
    </View>
  );
};

export default CreateSessionScreen;