import { db, auth } from "../services/firebase";
import {
  doc,
  setDoc,
  where,
  deleteDoc,
  getDocs,
  collection,
  query,
  or,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);
  const user = auth.currentUser;

  const loadRequests = async () => {
    try {
      const requestQuery = query(
        collection(db, "requests"),
        or(
          where("creator.id", "==", user.uid),
          where("receiver.id", "==", user.uid)
        )
      );
      const requestsSnapshot = await getDocs(requestQuery);
      const requestsData = requestsSnapshot
        ? requestsSnapshot.docs.map((doc) => doc.data())
        : null;
      setRequests(requestsData);
      console.log("Requests: ", requests);
      if (requests)
        requests.forEach((req) => console.log("Requests Loaded: ", req));
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
      console.log("ID: ", newRequest.id);
      await setDoc(newReqRef, newRequest);
      loadRequests();
    } catch (error) {
      console.error("Request creation error: ", error.message);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
    } catch (error) {
      console.error("Request deletion error: ", error.message);
    }
  };

  return (
    <RequestsContext.Provider
      value={{
        requests,
        loadRequests,
        createRequest,
        deleteRequest,
        setRequests,
      }}
    >
      {props.children}
    </RequestsContext.Provider>
  );
};
