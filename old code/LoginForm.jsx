import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../services/firebase";

const AuthForm = () => {
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

<<<<<<<< HEAD:newest tuteora/components/AuthForm.jsx
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

========
>>>>>>>> d09b1dc6870640074b3dfc35b31b3ed828216ce7:old code/LoginForm.jsx
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
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <Button title="Login" onPress={login} />
              <Button title="Create Account" onPress={register} />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthForm;
