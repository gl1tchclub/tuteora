import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const [session, setSession] = useState([]);
  const { user } = useContext(UserContext);

  const loadSessions = async () => {
    try {
      const sessionRef = doc(db, "sessions", user.uid);
      const sessionSnapshot = await sessionRef.get();
      const sessionList = sessionSnapshot.docs.map((doc) => doc.data());
      setSession(sessionList);
    } catch (error) {
      console.error("Session loading error: ", error.message);
    }
  };
};
