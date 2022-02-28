import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtQl0gVkLRGLQrCht7XA7K1YGPunwkn1s",
  authDomain: "react-whatsapp-clone-88503.firebaseapp.com",
  databaseURL: "https://react-whatsapp-clone-88503-default-rtdb.firebaseio.com",
  projectId: "react-whatsapp-clone-88503",
  storageBucket: "react-whatsapp-clone-88503.appspot.com",
  messagingSenderId: "62000747729",
  appId: "1:62000747729:web:04d3712235ce8071f4a1f0",
  measurementId: "G-DQFWWN1TS1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

// bottom three line are for google authentication only
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };

export default db;

// export {db};
