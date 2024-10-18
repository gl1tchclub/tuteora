import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

// Initialize Firebase Authentication and get a reference to the service
export const FIREBASE_APP = initializeApp(firebaseConfig);; // Init Firebase
export const FIREBASE_DB = getFirestore(); // Get a Firestore instance (DB)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);