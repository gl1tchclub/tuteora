/**
 * SessionContext module to manage sessions between tutors and students.
 * Provides functionality to load, create, complete, and cancel sessions.
 * It listens for real-time updates on sessions where the current user is either a tutor or a student.
 * Sessions are fetched from Firestore and updated based on changes to the session data.
 *
 * @module SessionContext
 */

import { db, auth } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  query,
  where,
  or,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const [sessions, setSessions] = useState([]);
  const user = auth.currentUser;

  const loadSessions = () => {
    try {
      if (user) {
        const sessionsQuery = query(
          collection(db, "sessions"),
          or(
            where("tutor.id", "==", user.uid),
            where("student.id", "==", user.uid)
          )
        );
        const unsubscribe = onSnapshot(
          sessionsQuery,
          (snapshot) => {
            const sessionsData = snapshot.docs.map((doc) => doc.data());
            setSessions(sessionsData);
          },
          (error) => {
            console.error("Session loading error: ", error.message);
          }
        );
        return () => unsubscribe();
      }
      console.log("Sessions: ", sessions);
    } catch (error) {
      console.error("Session loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const createSession = async (newSession) => {
    try {
      if (sessions.includes(newSession)) {
        return;
      } else {
        const newSessionRef = doc(collection(db, "sessions"));
        newSession.id = newSessionRef.id;
        await setDoc(newSessionRef, newSession);
      }
      loadSessions();
    } catch (error) {
      console.error("Session creation error: ", error.message);
      throw new Error("Session creation error: ", error.message);
    }
  };

  const completeSession = async (sessionId) => {
    try {
      const sessionRef = doc(db, "sessions", sessionId);
      const sessionDoc = await getDoc(sessionRef);
      if (sessionDoc.exists()) {
        await setDoc(sessionRef, { isCompleted: true }, { merge: true });
        console.log("\nSession completed successfully!");
        loadSessions();
      } else {
        console.error("Session not found!");
      }
    } catch (error) {
      console.error("Session completion error: ", error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const sessionRef = doc(db, "sessions", sessionId);
      await deleteDoc(sessionRef);
      loadSessions();
      console.log("\nSession cancelled successfully!");
    } catch (error) {
      console.error("Session cancellation error: ", error.message);
    }
  };

  return (
    <SessionContext.Provider
      value={{ sessions, createSession, cancelSession, completeSession }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
