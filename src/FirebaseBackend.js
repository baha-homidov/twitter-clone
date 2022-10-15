// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// required libraries for firebase Auth
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// required libraries for firestore
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  orderBy,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";

// My web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpxdkN-Q1UH6Av7GeUYzEF86Qsc-2OipA",
  authDomain: "twitter-clone-a252d.firebaseapp.com",
  projectId: "twitter-clone-a252d",
  storageBucket: "twitter-clone-a252d.appspot.com",
  messagingSenderId: "162098044301",
  appId: "1:162098044301:web:2d18f06d77e37634d6b1c4",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let userId = ""; // user id for communicating with firebase

async function sigInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  const auth = getAuth();
  const user = auth.currentUser;
  userId = user.uid;
  console.log(userId);
}

function getUserPhotoUrl() {
  return getAuth().currentUser.getUserPhotoUrl;
}

function getUserAuth() {
  const user = getAuth();
  return user;
}

function signOutUser() {
  console.log("signout");
  signOut(getAuth());
}

async function isUsernameTaken(username) {
  const docRef = query(
    collection(db, "userCollection"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(docRef);
  if (querySnapshot.size > 0) {
    return true;
  }
  return false;
}

async function addUserToDataBase(uid, username, name, userPhoto) {
  // adds user to the database and set's up tweets collection
  // doesn't check for already existing usernames
  // existing usernames should checked before calling this function
  try {
    const Doc = await addDoc(
      collection(db, "userCollection", uid, "tweets"),
      {
        skip: true,
      }
    );

    const userRef = doc(db, "userCollection", uid);
    await setDoc(userRef, {
      username: username,
      displayName: name,
      userPhotoUrl: userPhoto,
    }, { merge: true });

    console.log("Document written with ID: ", Doc.id);
  } catch (error) {
    console.log("Error adding a user: " + error);
  }
}

export {
  sigInWithGoogle,
  signOutUser,
  getUserPhotoUrl,
  getUserAuth,
  addUserToDataBase,
  isUsernameTaken,
};
