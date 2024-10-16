import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

const signUp = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((err) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
};

const login = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const getUserInfo = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      // ...
    } else {
      // User is signed out = no user
      // ...
    }
  });
};
