/**
 * @fileoverview Screen component for displaying sign in and register forms.
 * This screen renders the Auth component.
 * Uses React Native's View component for layout structure.
 */

import { View } from "react-native";
import Auth from "../components/Auth";

const AuthScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Auth />
    </View>
  );
};

export default AuthScreen;