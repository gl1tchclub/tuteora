import { createContext, useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const TutorContext = createContext();

export const TutorProvider = (props) => {
  const [tutors, setTutors] = useState(null);

  const loadTutors = async () => {
    try {
      const tutorsQuery = query(collection(db, "tutors"), where("isAvailable", "==", true));
      const tutorsSnapshot = await getDocs(tutorsQuery);       
      const tutorsList = tutorsSnapshot.docs.map((doc) => doc.data());
      setTutors(tutorsList);
      console.log("Tutors: ", tutorsList);
    } catch (error) {
      console.error("Tutors loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadTutors();
  }, [auth]);

  return (
    <TutorContext.Provider value={{ tutors }}>
      {props.children}
    </TutorContext.Provider>
  );
};
