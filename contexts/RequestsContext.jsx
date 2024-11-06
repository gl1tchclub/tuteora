import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc, deleteDoc, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const requestsSnapshot = await getDocs(doc(db, "requests"));
      const requestsData = requestsSnapshot.docs.map((doc) => doc.data());
      setRequests(requestsData);
    } catch (error) {
      console.error("Requests loading error: ", error.message);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [requests]);

  const createRequest = async (newRequest) => {
    try {
      await setDoc(doc(db, "requests", newRequest.id), newRequest);
      loadRequests();
    } catch (error) {
      console.error("Request creation error: ", error.message);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await deleteDoc(doc(db, "requests", id));
      loadRequests();
    } catch (error) {
      console.error("Request deletion error: ", error.message);
    }
  };

  const updateRequest = async (updatedRequest) => {
    try {
      await setDoc(doc(db, "requests", updatedRequest.id), updatedRequest);
      loadRequests();
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
