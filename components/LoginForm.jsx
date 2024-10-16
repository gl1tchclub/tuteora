import { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { auth } from "../services/firebase";

const LoginForm = ({ onSubmit }) => {
  return (
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <Text> Login </Text>
      <View className="mb-5">
        <TextInput
          placeholder="Enter Email"
          className="mt-20 w-80 h-10 px-2.5 rounded-lg bg-lime-400"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          className="mt-20 w-80 h-10 px-2.5 rounded-lg bg-lime-400"
        />
        <Button title="Login" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default LoginForm;
