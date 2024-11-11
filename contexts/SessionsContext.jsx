import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const [sessions, setSessions] = useState(null);
  const user = auth.currentUser;

  const loadSessions = () => {
    if (!user) {
      setSessions(null);
      return;
    }
    const sessionsRef = doc(db, `sessions`);
    const unsubscribe = onSnapshot(sessionsRef, (sessionsSnapshot) => {
      if (sessionsSnapshot.exists()) {
        const sessionList = sessionsSnapshot.docs.map((doc) => doc.data());
        setSessions(sessionList);
        console.log("\nSessions found: ", sessionList);
      } else {
        setSessions(null);
        console.log("\nNo sessions found.");
      }
    }, (error) => {
      console.error("Session loading error: ", error.message);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = loadSessions();
    return () => unsubscribe && unsubscribe();
  }, [user]);

  const createSession = async (newSession) => {
    try {
      const sessionRef = doc(collection(db, `sessions`));
      newSession.id = sessionRef.id;
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
