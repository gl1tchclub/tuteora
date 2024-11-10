import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("Student");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [study, setStudy] = useState("IT");
  const studies = [
    {
      label: "IT",
      value: "IT",
    },
    {
      label: "Nursing",
      value: "Nursing",
    },
    {
      label: "Communications",
      value: "Communications",
    },
    {
      label: "Occupational Therapy",
      value: "OT",
    },
  ];

  const { register, login, user, profile } = useContext(UserContext);

  const handleAuthentication = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await login(email, password);
        Alert.alert("Logged in successfully!");
      } else {
        await register({
          email,
          password,
          accountType,
          firstName,
          lastName,
          study,
        });
        Alert.alert("Registered successfully!");
      }
      // }
      setError(null);
    } catch (error) {
      console.error("Authentication error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      if (user && profile) {
        console.log("\nUser signed in successfully!");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="w-4/5 max-w-md bg-white p-4 rounded-lg"
      style={{
        elevation: 5,
      }}
    >
      <ScrollView className="shadow-black shadow-md">
        <Text className="mb-6 text-base self-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </Text>
        <TextInput
          className="h-10 border-gray-300 border rounded p-2 mb-4"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          className="h-10 border-gray-300 border rounded p-2 mb-4"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        {!isLogin && (
          <>
            <TextInput
              className="h-10 border-gray-300 border rounded p-2 mb-4"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              autoCapitalize="none"
            />
            <TextInput
              className="h-10 border-gray-300 border rounded p-2 mb-4"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              autoCapitalize="none"
            />
            <View className="w-full flex-row pb-2">
              <Text className="w-1/4 mx-2 self-start font-semibold">
                Field of Study:
              </Text>
              <View className="h-12 w-8/12 justify-center self-center bg-[#46ab61]/[.75] rounded-lg">
                <Picker
                  selectedValue={study}
                  onValueChange={(itemValue) => setStudy(itemValue)}
                  style={{ color: "white" }}
                >
                  {studies.map((study) => (
                    <Picker.Item
                      label={study.label}
                      value={study.value}
                      key={study.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View className="w-full flex-row pt-2 pb-4">
              <Text className="w-1/4 mx-2 self-start font-semibold">
                Account Type:
              </Text>
              <View className="h-12 w-8/12 justify-center self-center bg-[#46ab61]/[.75] rounded-lg">
                <Picker
                  selectedValue={accountType}
                  onValueChange={(itemValue) => setAccountType(itemValue)}
                  style={{ color: "white" }}
                >
                  <Picker.Item label="Student" value="Student" />
                  <Picker.Item label="Tutor" value="Tutor" />
                </Picker>
              </View>
            </View>
          </>
        )}
        {error && <Text style={{ color: "red" }}>{error}</Text>}

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title={isLogin ? "Sign In" : "Sign Up"}
            onPress={handleAuthentication}
            color="#3d8e52"
          />
        )}

        <View className="mt-4">
          <Text
            className="text-[#46ab61] self-center pb-4"
            onPress={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Sign In"}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Auth;
