import { db, auth } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const requestsSnapshot = await getDocs(doc(db, "requests"));
      const requestsData = requestsSnapshot
        ? requestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        : null;
      setRequests(requestsData);
    } catch (error) {
      console.error("Requests loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const createRequest = async (newRequest) => {
    try {
      const newReqRef = doc(collection(db, "requests"));
      newRequest.id = newReqRef.id;
      await setDoc(newReqRef, newRequest);
    } catch (error) {
      console.error("Request creation error: ", error.message);
    }
  };

  const deleteRequest = async (request) => {
    try {
      const q = query(collection(db, "requests"), where(doc, "==", request));
      const querySnapshot = await getDocs(q);
      await deleteDoc(q);
    } catch (error) {
      console.error("Request deletion error: ", error.message);
    }
  };

  const updateRequest = async (updatedRequest) => {
    try {
      await setDoc(doc(db, "requests", updatedRequest.id), updatedRequest);
    } catch (error) {
      console.error("Request update error: ", error.message);
    }
  };

  return (
    <RequestsContext.Provider
      value={{
        requests,
        loadRequests,
        createRequest,
        deleteRequest,
        updateRequest,
      }}
    >
      {props.children}
    </RequestsContext.Provider>
  );
};
