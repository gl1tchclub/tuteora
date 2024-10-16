import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  validatePassword,
  deleteUser,
} from "firebase/auth";

const auth = getAuth();
const currentUser = auth.currentUser;

const signUp = async () => {
  const status = await validatePassword(getAuth(), passwordFromUser);
  if (!status.isValid) {
    // Password could not be validated. Use the status to show what
    // requirements are met and which are missing.

    // If a criterion is undefined, it is not required by policy. If the
    // criterion is defined but false, it is required but not fulfilled by
    // the given password. For example:
    const needsLowerCase = status.containsLowercaseLetter !== true;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
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

const signOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

const getUserInfo = () => {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      currentUser = auth.currentUser;
      // ...
    } else {
      // User is signed out = no user
      // ...
    }
  });
};

const removeUser = () => {
  deleteUser(user)
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
};
