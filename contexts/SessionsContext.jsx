import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const [sessions, setSessions] = useState(null);
  const user = auth.currentUser;

  const loadSessions = async () => {
    try {
      if (!user) {
        setSessions(null);
        return;
      }
      const sessionsRef = doc(db, `sessions/${user.uid}`); //get sessions for current user
      const sessionsSnapshot = await getDoc(sessionsRef); //get the snapshot of the sessions
      if (sessionsSnapshot.exists()) {
        const sessionList = sessionsSnapshot.docs.map((doc) => doc.data()); //convert
        setSessions(sessionList); //set
        console.log("\nSessions found: ", sessionList);
      } else {
        setSessions(null);
        console.log("\nNo sessions found.");
      }
    } catch (error) {
      console.error("Session loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [sessions]);

  const createSession = async (newSession, accountType) => {
    try {
      const sessionRef = "";
      if (accountType === "tutor") {
        sessionRef = doc(db, `sessions/${user.uid}`, newSession.studentId);
      } else {
        sessionRef = doc(db, `sessions/${user.uid}`, newSession.tutorId);
      };
      await setDoc(sessionRef, newSession);
    } catch (error) {
      console.error("Session creation error: ", error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const sessionRef = doc(db, `sessions/${user.uid}`, sessionId);
      await deleteDoc(sessionRef);
      console.log("\nSession cancelled successfully!");
    } catch (error) {
      console.error("Session cancellation error: ", error.message);
    }
  };

  return (
    <SessionContext.Provider value={{ sessions, createSession, cancelSession }}>
      {props.children}
    </SessionContext.Provider>
  );
};
