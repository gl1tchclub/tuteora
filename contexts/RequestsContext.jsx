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
  onSnapshot,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);
  const [isRequested, setIsRequested] = useState(false);
  const user = auth.currentUser;

  const loadRequests = async () => {
    try {
      if (user) {
        const requestQuery = query(
          collection(db, "requests"),
          or(
            where("creator.id", "==", user.uid),
            where("receiver.id", "==", user.uid)
          )
        );
        const unsubscribe = onSnapshot(requestQuery, (snapshot) => {
          const requestsData = snapshot.docs.map((doc) => doc.data());
          setRequests(requestsData);
        });
        return () => unsubscribe();
      } else {
        setRequests([]);
      }
      console.log("Requests: ", requests);
    } catch (error) {
      console.error("Requests loading error: ", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = () => loadRequests();
    return () => unsubscribe && unsubscribe();
  }, [user]);

  const createRequest = async (newRequest) => {
    try {
      if (requests.includes(newRequest)) {
        setIsRequested(true);
        return null;
      } else {
        setIsRequested(false);
        const newReqRef = doc(collection(db, "requests"));
        newRequest.id = newReqRef.id;
        await setDoc(newReqRef, newRequest);
        loadRequests();
      }
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
        isRequested,
      }}
    >
      {props.children}
    </RequestsContext.Provider>
  );
};
