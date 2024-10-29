import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
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
  const [accountType, setAccountType] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, login, user, profile } = useContext(UserContext);
  console.log("\nAuth User:", user);
  console.log("\nAuth Profile:", profile);

  const handleAuthentication = async () => {
    try {
      if (user != null) {
        console.log("\nSigned in. Welcome!");
        // navigation.navigate("Home");
      } else {
        setLoading(true);
        if (isLogin) {
          await login(email, password);
          // console.log("\nUser signed in successfully!");
        } else {
          await register({
            email,
            password,
            accountType,
            firstName,
            lastName,
          });
          // console.log("\nUser created successfully!");
        }
      }
      setError(null);
    } catch (error) {
      console.error("Authentication error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      if (user && profile) {
        console.log("\nUser signed in successfully!");
        // navigation.navigate("Home");
      };
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
         <Picker
            selectedValue={accountType}
            onValueChange={(itemValue) => setAccountType(itemValue)}
          >
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Tutor" value="Tutor" />
            <Picker.Item label="Staff" value="Staff" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker> 
      </>
       )} 
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title={isLogin ? "Sign In" : "Sign Up"}
            onPress={handleAuthentication}
            color="#3498db"
          />
        </View>
      )}

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
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
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
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
