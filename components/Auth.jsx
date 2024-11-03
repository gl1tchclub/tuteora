import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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
  const [open, setOpen] = useState(false);
  const [study, setStudy] = useState(null);
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
  console.log("\nAuth User:", user);
  console.log("\nAuth Profile:", profile);

  const handleAuthentication = async () => {
    try {
      // if (user != null) {
      //   console.log("\nSigned in. Welcome!");
      // } else {
      setLoading(true);
      if (isLogin) {
        await login(email, password, `${accountType.toLowerCase()}s`);
      } else {
        await register({
          email,
          password,
          accountType,
          firstName,
          lastName,
          study,
        });
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
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
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
                <Picker.Item label="Staff" value="Staff" />
                <Picker.Item label="Admin" value="Admin" />
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

      <View style={styles.bottomContainer}>
        <Text className="text-[#46ab61] self-center" onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Auth;
