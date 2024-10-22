import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadUser = async () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
          const userProfile = {
            id: auth.currentUser.uid,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            accountType: newUser.accountType,
          };
          setProfile(userProfile);
        //   await AsyncStorage.setItem("user", JSON.stringify(profile)); // not sure if need this
        }
      });

      console.log(user);

      return () => unsubscribe();
    } catch (error) {
      console.error("User loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, [auth]);

  const register = async (newUser) => {
    try {
      if (
        !(
          newUser.accountType &&
          newUser.email &&
          newUser.password &&
          newUser.username &&
          newUser.firstName &&
          newUser.lastName
        )
      ) {
        throw new Error("Please fill in all fields");
      } else if (newUser.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      } else if (newUser.username.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        );
      }
    } catch (error) {
      console.error("Registration error: ", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error: ", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error: ", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, register, profile, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};
