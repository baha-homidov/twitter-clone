// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// required libraries for firebase Auth
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
import { upload } from "@testing-library/user-event/dist/upload";

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
const storage = getStorage(app);

async function sigInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  console.log(userId);
}

async function singUpWithLoginPassword(login, password, username, name) {
  // this function imitates login-password authentication by using firebase's email-password auth service
  // in real world application only real email addresses should be used
  // returns userId
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      getAuth(),
      login + "@twitter-clone.com",
      password
    );
    return userCredentials.user.uid;
  } catch (error) {
    console.log("error making creating a user with login-password: " + error);
  }
}

async function signInWithUsernamePassword(login, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      login + "@twitter-clone.com",
      password
    );
    return true;
  } catch (error) {
    console.log("wrong credentials");
    return false;
  }
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
  // asynchronously checks the userCollection in firestore if user with a given username already exists
  username = username.toLowerCase();
  const docRef = query(
    collection(db, "userCollection"),
    where("lowercaseUsername", "==", username)
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
    const Doc = await addDoc(collection(db, "userCollection", uid, "tweets"), {
      skip: true,
    });

    const userRef = doc(db, "userCollection", uid);
    await setDoc(
      userRef,
      {
        username: username,
        lowercaseUsername: username.toLowerCase(),
        displayName: name,
        lowercaseDisplayName: name.toLowerCase(),
        userPhotoUrl: userPhoto,
        timestamp: serverTimestamp(),
        uid: uid,
      },
      { merge: true }
    );

    console.log("Document written with ID: ", Doc.id);
  } catch (error) {
    console.log("Error adding a user: " + error);
  }
}

async function uploadUserPhoto(userphoto, username) {
  try {
    // recieves upload photo and username
    // constructs filename for upload
    // uploads to firebase storage
    // returns upload's url

    // *for a commercial product 'Resize Images' extension can be used for resizing images on server side

    const filename = `${username}.${userphoto.name.substring(
      userphoto.name.indexOf(".") + 1
    )}`.toLowerCase(); // construct a filename

    const storageRef = ref(storage, `/userphotos/${filename}`);
    const uploadSnapshot = await uploadBytes(storageRef, userphoto);
    const url = await getDownloadURL(uploadSnapshot.ref);
    return url;
  } catch (e) {
    console.log(`Error uploading file to storage: ${e}`);
  }
}

async function isNewUser(userId) {
  // recieves uid
  // checks if user exists by querying firestore database
  const docRef = doc(db, "userCollection", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return false;
  } else {
    return true;
  }
}

async function getUserInfo(uid) {
  // asynchronously returns userInfo from firestore firebase
  try {
    const docRef = doc(db, "userCollection", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(`Error getting info from firestore ${error}`);
  }
}

async function searchUsersByUsername(searchValue) {
  // asynchronously searches database for users with similar 'username'
  // returns an array containing userInfo
  searchValue = searchValue.toLowerCase(); // set string to lowercase for search
  const resultArr = [];

  const usersRef = await collection(db, "userCollection");
  const docRef = query(
    usersRef,
    where("lowercaseUsername", ">=", searchValue),
    where("lowercaseUsername", "<=", searchValue + "\uf8ff")
  );
  const querySnapshot = await getDocs(docRef);

  querySnapshot.forEach((element) => {
    resultArr.push(element.data());
  });

  return resultArr;
}

async function searchUsersByDisplayName(searchValue) {
  // asynchronously searches database for users with similar 'displayName'
  // returns an array containing userInfo
  searchValue = searchValue.toLowerCase(); // set string to lowercase for search
  const resultArr = [];

  const usersRef = await collection(db, "userCollection");
  const docRef = query(
    usersRef,
    where("lowercaseDisplayName", ">=", searchValue),
    where("lowercaseDisplayName", "<=", searchValue + "\uf8ff")
  );
  const querySnapshot = await getDocs(docRef);

  querySnapshot.forEach((element) => {
    resultArr.push(element.data());
  });

  return resultArr;
}

async function searchUsers(searchValue) {
  // asynchronously searches database for users with similar 'username' or 'displayName'
  // returns an array containing userInfo
  const usernameResult = await searchUsersByUsername(searchValue);
  const displayNameResult = await searchUsersByDisplayName(searchValue);

  let resultArr = usernameResult.concat(displayNameResult);
  // delete the duplicates
  resultArr = resultArr.reduce((unique, o) => {
    if (!unique.some((obj) => obj.lowercaseUsername === o.lowercaseUsername)) {
      unique.push(o);
    }
    return unique;
  }, []);

  return resultArr;
}

window.searchUsers = searchUsers;
window.searchUsersByUsername = searchUsersByUsername;
window.searchUsersByDisplayName = searchUsersByDisplayName;

export {
  sigInWithGoogle,
  signOutUser,
  getUserPhotoUrl,
  getUserAuth,
  addUserToDataBase,
  isUsernameTaken,
  singUpWithLoginPassword,
  signInWithUsernamePassword,
  uploadUserPhoto,
  isNewUser,
  getUserInfo,
  searchUsers,
  storage,
};
