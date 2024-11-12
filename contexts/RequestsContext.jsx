/**
 * RequestsContext module to manage requests between users.
 * Provides functionality to load, create, and delete requests based on the current user's role.
 * It listens for real-time updates on requests where the current user is either the creator or the receiver.
 * Requests are fetched from Firestore and updated based on changes to the request data.
 *
 * @module RequestsContext
 */

import { db, auth } from "../services/firebase";
import {
  doc,
  setDoc,
  where,
  deleteDoc,
  collection,
  query,
  or,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const RequestsContext = createContext();

export const RequestsProvider = (props) => {
  const [requests, setRequests] = useState([]);
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
        const unsubscribe = onSnapshot(
          requestQuery,
          (snapshot) => {
            const requestsData = snapshot.docs.map((doc) => doc.data());
            setRequests(requestsData);
          },
          (error) => {
            console.error("Requests loading error: ", error.message);
          }
        );
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
    loadRequests();
  }, [user]);

  const createRequest = async (newRequest) => {
    try {
      if (requests.includes(newRequest)) {
        return;
      } else {
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
      loadRequests();
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
