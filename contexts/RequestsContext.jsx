import { db } from "../services/firebase";
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
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(UserContext);

  const loadRequests = async () => {
    try {
      const requestQuery = query(
        collection(db, "requests"),
        or(
          where("creatorId", "==", user.uid),
          where("receiverId", "==", user.uid)
        )
      );
      const requestsSnapshot = await getDocs(requestQuery);
      const requestsData = requestsSnapshot
        ? requestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        : null;
      setRequests(requestsData);
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
      await setDoc(newReqRef, newRequest);
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
