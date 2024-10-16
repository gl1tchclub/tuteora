import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const SignUp = () => {
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

const Login = () => {
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

const 