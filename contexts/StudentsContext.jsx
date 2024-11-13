/**
 * StudentContext module to manage student data and provide functionality to load and update student profiles.
 * Provides a context for accessing the list of students and a function to update student information in Firestore.
 * Only loads students if the current user profile is of type "Tutor".
 *
 * @module StudentContext
 */

import { createContext, useState, useEffect, useContext } from "react";
import { db, auth } from "../services/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { UserContext } from "./UserContext";

export const StudentContext = createContext();

export const StudentProvider = (props) => {
  const [students, setStudents] = useState(null);
  const { profile } = useContext(UserContext);

  const loadStudents = async () => {
    try {
      const studentsSnapshot = await getDocs(collection(db, "students"));
      const studentsList = studentsSnapshot
        ? studentsSnapshot.docs.map((doc) => doc.data())
        : null;
      setStudents(studentsList);
      console.log("Students: ", studentsList);
    } catch (error) {
      console.error("Students loading error: ", error.message);
    }
  };

  useEffect(() => {
    if (profile && profile.accountType === "Tutor") loadStudents();
  }, [profile]);

  const updateStudent = async (student) => {
    try {
      await setDoc(doc(db, "students", student.id), student);
    } catch (error) {
      console.error("Student update error: ", error.message);
    }
  };

  return (
    <StudentContext.Provider value={{ students, updateStudent }}>
      {props.children}
    </StudentContext.Provider>
  );
};
