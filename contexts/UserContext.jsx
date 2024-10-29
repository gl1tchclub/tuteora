import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadUser = async() => {
    try {
      // await signOut(auth);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        const isUser = user ? user : null;
        setUser(isUser);
        if (user) {
          console.log("\nUser: ", user);
          const id = user.uid;
          const userInfo = await getDoc(doc(db, "users", id));
          if (userInfo.exists()) {
            const info = {
              id: userInfo.data().id,
              email: userInfo.data().email,
              firstName: userInfo.data().firstName,
              lastName: userInfo.data().lastName,
              accountType: userInfo.data().accountType,
            };
            setProfile(info);
          } else {
            setProfile(null);
          }
          
          console.log("\nProfile info: ", userInfo);
        } else {
          console.log("Context No user:", user);
        };
      });


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
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          email: user.email,
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
      setProfile(null); // need this here? Already in unsubscribe
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
