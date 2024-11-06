import { createContext, useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const StudentContext = createContext();

export const StudentProvider = (props) => {
  const [students, setStudents] = useState(null);

  const loadStudents = async () => {
    try {
      const studentsSnapshot = await getDocs(collection(db, "students"));     
      const studentsList = studentsSnapshot ? studentsSnapshot.docs.map((doc) => doc.data()) : null;
      setStudents(studentsList);
      console.log("Students: ", studentsList);
    } catch (error) {
      console.error("Students loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

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
