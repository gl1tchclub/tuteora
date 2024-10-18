import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "@react-native-firebase/auth";
import { FIREBASE_AUTH } from "../services/firebase";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Student");
  const [loading, setLoading] = useState(false);
  const accountTypes = ["Student", "Tutor", "Staff"];
  const labelStyle = "mt-20 w-80 h-10 px-2.5 rounded-lg bg-lime-400";

  const register = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert("Success!");
    } catch (error) {
      alert("Registration Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <KeyboardAvoidingView behavior="padding">
        <Text> Test Register Form </Text>
        <View>
          <TextInput
            placeholder="Username"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="none"
            className={labelStyle}
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            className={labelStyle}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className={labelStyle}
          />

          <Picker
            selectedValue={type}
            onValueChange={(currentOption) => setType(currentOption)}
          >
            {accountTypes.map((accountType) => {
              <Picker.Item
                key={accountType}
                label={accountType}
                value={accountType}
              />;
            })}
          </Picker>
          <Text>Selected: {option}</Text>

          <Button title="Register" onPress={register} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterForm;
