import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { FIREBASE_AUTH } from "../services/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const labelStyle = "mt-20 w-80 h-10 px-2.5 rounded-lg bg-lime-400";

  const login = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert("Success!");
    } catch (error) {
      alert("Login Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <KeyboardAvoidingView behavior="padding">
        <Text> Test Login Form </Text>
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className={labelStyle}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className={labelStyle}
          />
          <Button title="Login" onPress={login} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginForm;
