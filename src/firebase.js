// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_11_x-_MJc2jTJDPl4kMEVE9j1AD5nH4",
  authDomain: "to-do-f68eb.firebaseapp.com",
  databaseURL: "https://to-do-f68eb-default-rtdb.firebaseio.com/",
  projectId: "to-do-f68eb",
  storageBucket: "to-do-f68eb.appspot.com",
  messagingSenderId: "842402979630",
  appId: "1:842402979630:web:44add6aae6168f12c764bf",
  measurementId: "G-5H0Q06257P",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, userData) => {
  const userRef = database.ref(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists()) {
    const { email, displayName, password } = userData;
    userRef
      .set({
        displayName,
        password,
        email,
      })
      .then((user) => {
        /*@todo: move the user to the next page*/
        console.log(user);
      })
      .catch((error) => {
        console.error("Error creating user document", error);
      });
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await database.ref(`users/${uid}`).get();
    return {
      uid,
      ...userDocument,
    };
  } catch (error) {
    console.log("Error fetching user", error);
  }
};
