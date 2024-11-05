import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { db, auth } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadUser = async () => {
    try {
      // await logout();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        const isUser = user ? user : null;
        setUser(isUser);
        if (user) {
          const tutor = await getDoc(doc(db, "tutors", user.uid));
          const student = await getDoc(doc(db, "students", user.uid));

          if (tutor.exists()) {
            setProfile(tutor.data());
            console.log("\nTutor Profile:", profile);
          } else if (student.exists()) {
            setProfile(student.data());
            console.log("\nStudent Profile:", profile);
          }
        } else {
          console.log("Context No user:", user);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("User loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, [auth]);

  const updateProfile = async (updatedProfile) => {
    try {
      const profileRef = doc(db, `${profile.accountType.toLowerCase()}s`, profile.id);
      await setDoc(profileRef, updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Profile update error: ", error.message);
    }
  }

  const register = async (newUser) => {
    try {
      const requiredFields = [
        "accountType",
        "email",
        "password",
        "firstName",
        "lastName",
        "study",
      ];
      const missingFields = requiredFields.filter((field) => !newUser[field]);
      if (missingFields.length > 0) {
        missingFields.forEach((field) => {
          console.log(field);
        });
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
        const userAccount =
          newUser.accountType === "Tutor"
            ? {
                id: user.uid,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                accountType: newUser.accountType,
                study: newUser.study,
                isAvailable: true,
                students: [],
                bio: "",
                topics: [],
                availability: [],
              }
            : {
                id: user.uid,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                accountType: newUser.accountType,
                study: newUser.study,
                tutor: null,
              };

        await setDoc(
          doc(db, `${newUser.accountType.toLowerCase()}s`, user.uid),
          userAccount
        );

        await login(newUser.email, newUser.password);
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
    <UserContext.Provider value={{ user, register, profile, login, logout, updateProfile }}>
      {props.children}
    </UserContext.Provider>
  );
};
