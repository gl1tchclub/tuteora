import { useState } from "react";
import { Text, View, TextInput, Button} from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

// Components
import ScrollPick from "./Picker";

const RegisterForm = ({ navigation }) => {
  const accountTypes = [
    {
      label: "Student",
      value: "STUDENT",
    },
    {
      label: "Tutor",
      value: "TUTOR",
    },
    {
      label: "Staff",
      value: "STAFF",
    },
  ];
  const labelStyle = "mt-20 w-80 h-10 px-2.5 rounded-lg bg-lime-400";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("/login"); // From props
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <View className="flex-1 bg-lime-700 items-center justify-center">
      <Text> Test Register Form </Text>
      <View>
        <TextInput placeholder="First name" className={labelStyle} />
        <TextInput placeholder="Last name" className={labelStyle} />
        <TextInput placeholder="Email" className={labelStyle} />
        <TextInput placeholder="Username" className={labelStyle} />
        <TextInput secureTextEntry={true} placeholder="Password" className={labelStyle} />
        <ScrollPick options={accountTypes} />
        <Button title="Register" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default RegisterForm;