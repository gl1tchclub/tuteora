import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [uid, setUid] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const { register, login, user } = useContext(UserContext);

  const handleAuthentication = () => {
    try {
      if (user) navigation.navigate("Home");
      else {
        if (isLogin) {
          login(email, password);
          console.log("User signed in successfully!");
        } else {
          register({
            email,
            password,
            accountType,
            firstName,
            lastName,
          });
          console.log("User created successfully!");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
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
          <Text>Selected: {accountType}</Text>
        </>
      )}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleAuthentication}
          color="#3498db"
        />
      </View>

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

export default AuthScreen;
