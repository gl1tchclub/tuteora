import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthForm = () => {
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
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Success!");
    } catch (error) {
      alert("Registration Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert("Success!");
    } catch (error) {
      alert("Login Failed: " + error.message);
    } finally {
      setLoggedIn(true);
      await AsyncStorage.setItem("login_status", "true");
      setLoading(false);
    }
  };

  const loginComponent = () => {
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <KeyboardAvoidingView behavior="padding">
        <Text> Test Login Form </Text>
        <View>
          <TextInput
            placeholder="Username"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="none"
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
    </View>;
  };

  const registerComponent = () => {
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
    </View>;
  };

  return (
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <Button onPress={registerComponent} title="Register" />
      <Button onPress={loginComponent} title="Login" />
    </View>
  );
};

export default RegisterForm;
