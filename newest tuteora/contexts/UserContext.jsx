import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { db, auth } from "../services/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const usersRef = collection(db, "users");

  const loadUser = async () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        console.log(user);
        if (user) {
          const userInfo = await getDoc(
            doc(usersRef, auth.currentUser.uid)
          ).data();
          setProfile(userInfo != undefined ? userInfo : null);
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
          newUser.firstName &&
          newUser.lastName
        )
      ) {
        throw new Error("Please fill in all fields");
      } else if (newUser.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        );

        const currentUser = auth.currentUser;
        console.log(currentUser);

        await setDoc(doc(usersRef, currentUser.uid), {
          id: currentUser.uid,
          email: currentUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          accountType: newUser.accountType,
        });
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
      setProfile(null);
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
