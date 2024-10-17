// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useEffect, useState } from "react";
// import { FIREBASE_AUTH } from "../services/firebase";
// import { getAuth } from "@react-native-firebase/auth";

// // Components
// import RegisterForm from "../old code/RegisterForm";
// import LoginForm from "../old code/LoginForm";

// const AuthScreen = ({ navigation }) => {
//   const [initializing, setInitializing] = useState(true);
//   const [selectedContent, setSelectedContent] = useState("login");
//   const [user, setUser] = useState(null);

//   const onAuthStateChanged = (user) => {
//     console.log("onAuthStateChanged", user);
//     setUser(user);
//     if (initializing) setInitializing(false);
//   };
//   useEffect(() => {
//     const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   if (initializing)
//     return (
//       <View className="items-center justify-center flex-1">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   if (!initializing && user) {
//     navigation.navigate("Home");
//   } else
//     return (
//       <View className="items-center justify-center flex-1">
//         <Button title="Login" onPress={() => setSelectedContent("login")} />
//         <Button
//           title="Register"
//           onPress={() => setSelectedContent("register")}
//         />
//         <View style={{ marginTop: 20 }}>
//           {selectedContent === "login" ? <LoginForm /> : <RegisterForm />}
//         </View>
//       </View>
//     );
// };

// export default AuthScreen;
