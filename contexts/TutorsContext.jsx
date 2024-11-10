import { createContext, useState, useEffect, useContext } from "react";
import { db, auth } from "../services/firebase";
import { getDocs, collection, query, where, setDoc, doc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export const TutorContext = createContext();

export const TutorProvider = (props) => {
  const [tutors, setTutors] = useState(null);
  const { profile } = useContext(UserContext);

  const loadTutors = async () => {
    try {
      const tutorsSnapshot = await getDocs(collection(db, "tutors"));
      const tutorsList = tutorsSnapshot
        ? tutorsSnapshot.docs.map((doc) => doc.data())
        : null;
      setTutors(tutorsList);
      console.log("Tutors: ", tutorsList);
    } catch (error) {
      console.error("Tutors loading error: ", error.message);
    }
  };

  useEffect(() => {
    if (profile && profile.accountType === "Student") loadTutors();
  }, [profile]);

  const updateTutor = async (tutor) => {
    try {
      await setDoc(doc(db, "tutors", tutor.id), tutor);
    } catch (error) {
      console.error("Tutor update error: ", error.message);
    }
  };

  return (
    <TutorContext.Provider value={{ tutors, updateTutor }}>
      {props.children}
    </TutorContext.Provider>
  );
};
