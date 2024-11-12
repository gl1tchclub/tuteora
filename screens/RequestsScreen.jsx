/**
 * @fileoverview Screen component for displaying requests.
 * This screen renders the RequestsList component.
 * Uses React Native's View component for layout structure.
 */

import { View } from "react-native";
import RequestsList from "../components/Requests";

const RequestsScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <RequestsList />
    </View>
  );
};

export default RequestsScreen;
