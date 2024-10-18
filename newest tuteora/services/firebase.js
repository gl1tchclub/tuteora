import Constants from "expo-constants";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

// Initialize Firebase app
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

// Initialize Firebase Authentication with persistence
let firebaseAuth;
try {
  firebaseAuth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === 'auth/duplicate-app') {
    firebaseAuth = getAuth(firebaseApp);
  } else {
    throw error;
  }
}

// Get a Firestore instance (DB)
const firebaseDb = getFirestore(firebaseApp);

export { firebaseApp as FIREBASE_APP, firebaseAuth as FIREBASE_AUTH, firebaseDb as FIREBASE_DB };

// export const FIREBASE_APP = initializeApp(firebaseConfig); // Init Firebase

// const auth = getAuth(FIREBASE_APP);
// setPersistence(auth, browserLocalPersistence).then(() => {
//   // Existing and future Auth State Persistence now set to local
//   // New sign-in will be persisted with session persistence.
//   // Local storage is now the default Auth state persistence.
// }).catch((error) => {
//   // Handle errors
//   console.error("Error setting persistence: ",error);
// });

// Initialize Firebase Authentication with persistence
// const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // Set persistence
// setPersistence(FIREBASE_AUTH, getReactNativePersistence(AsyncStorage))
//   .then(() => {
//     console.log("Persistence set successfully");
//     // Additional code to run after persistence is set
//     // For example, you can initialize user sessions or redirect the user
//   })
//   .catch((error) => {
//     console.error("Error setting persistence: ", error);
//   });

// export default FIREBASE_AUTH;

// export const FIREBASE_DB = getFirestore(FIREBASE_APP); // Get a Firestore instance
