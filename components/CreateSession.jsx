import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const CreateSession = ({ navigation }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <View className="flex-1 w-full p-4">
      <MaterialCommunityIcons
        name="file-document-edit"
        size={40}
        color="black"
      />
      <form>
        <input  />
      </form>
      <Text>Create Screen</Text>
    </View>
  );
};

export default CreateSession;
