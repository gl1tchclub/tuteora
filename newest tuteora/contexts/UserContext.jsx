import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { db, app, auth } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadUser = async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
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
        const userProfile = {
          id: auth.currentUser.uid,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          accountType: newUser.accountType,
        };
        setProfile(userProfile);
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, register, profile, login }}>
      {props.children}
    </UserContext.Provider>
  );
};
