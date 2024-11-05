import { createContext, useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const TutorContext = createContext();

export const TutorProvider = (props) => {
  const [tutors, setTutors] = useState(null);

  const loadTutors = async () => {
    try {
      const tutorsRef = db.collection("tutors");
      const tutorsSnapshot = await tutorsRef.get();
      const tutorsList = tutorsSnapshot.docs.map((doc) => doc.data());
      setTutors(tutorsList);
    } catch (error) {
      console.error("Tutors loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadTutors();
  }, []);

  return (
    <TutorContext.Provider value={{ tutors }}>
      {props.children}
    </TutorContext.Provider>
  );
};
