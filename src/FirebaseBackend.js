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
    const Doc = await addDoc(
      collection(db, "userCollection", uid, "tweetsCollection"),
      {
        skip: true,
      }
    ); // add tweets collection for future use
    await addDoc(collection(db, "userCollection", uid, "followCollection"), {
      skip: true,
    }); // add follow collection for future use

    await addDoc(collection(db, "userCollection", uid, "followerCollection"), {
      skip: true,
    }); // add follower collection for future use

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

async function addFollower(targetUser, newFollower) {
  // adds an entry to userToBeFolled's followerCollection
  // returns true if executes without errors
  // returns false if  encounters an error
  if (targetUser === newFollower || !targetUser || !newFollower) {
    return false;
  }
  await setDoc(
    doc(db, "userCollection", targetUser, "followerCollection", newFollower),
    {
      timestamp: serverTimestamp(),
      uid: newFollower,
    }
  );
  console.log(`Follower added with id ${newFollower}`);
}

async function addFollowing(targetUser, userToFollow) {
  // adds an entry to userToBeFolled's followerCollection
  // returns true if executes without errors
  // returns false if  encounters an error
  try {
    if (targetUser === userToFollow || !targetUser || !userToFollow) {
      return false;
    }
    await setDoc(
      doc(db, "userCollection", targetUser, "followCollection", userToFollow),
      {
        timestamp: serverTimestamp(),
        uid: userToFollow,
      }
    );
    console.log(`Followed user added with id ${userToFollow}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function followUser(currentUser, userToBeFollowed) {
  // follow a user and add corresponding entries to both users
  // returns true if executes withour errors
  // returns false otherwise
  try {
    const addFollowingResult = await addFollowing(
      currentUser,
      userToBeFollowed
    );

    const addFollowerResult = await addFollower(userToBeFollowed, currentUser);
    if (addFollowingResult === false || addFollowerResult === false) {
      return false;
    }
    console.log("Sucess adding a follower");
    return true;
  } catch (e) {
    console.log(`Error in followUser: ${e}`);
    return true;
  }
}

async function getFollowers(userId) {
  try {
    // returns an array with followers userIds

    const resultArr = [];

    const querySnapshot = await getDocs(
      collection(db, "userCollection", userId, "followerCollection")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().skip !== true) {
        resultArr.push(doc.data().uid);
      }
    });
    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

async function getFollowing(userId) {
  try {
    // returns an array with the followerd users' userIds

    const resultArr = [];

    const querySnapshot = await getDocs(
      collection(db, "userCollection", userId, "followCollection")
    );
    querySnapshot.forEach((doc) => {
      if (doc.data().skip !== true) {
        resultArr.push(doc.data().uid);
      }
    });
    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

async function getUserInfoFromIdArray(idArray) {
  // recieves an array of userId strings
  // if idArray.length is bigger than 10 divides it in 10 element chunks
  // because of Firestore chunk query limitations
  // constructs and returns an array of userInfo

  const makeChunksOf10 = (array) => {
    // helper function
    const chunkSize = 10;
    const resultArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      resultArr.push(chunk);
    }
    return resultArr;
  };

  const resultArr = [];

  idArray = makeChunksOf10(idArray); // make chunks of length<=10 arrays to accomodate firestore limitations

  await Promise.all(
    // fire multiple queries at the same time and wait for all of them to finish
    idArray.map(async (arrElement) => {
      const usersRef = collection(db, "userCollection");
      const q = query(usersRef, where("uid", "in", arrElement));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resultArr.push(doc.data());
      });
    })
  );

  return resultArr;
}

async function getFollowListUserInfo(userId) {
  // constructs and returns userInfo array of followers
  //                                          user followed
  const followersIdArray = await getFollowers(userId);
  const followingIdArray = await getFollowing(userId);

  const followersUserInfoArray = await getUserInfoFromIdArray(followersIdArray);
  const followingUserInfoArray = await getUserInfoFromIdArray(followingIdArray);

  return { followersUserInfoArray, followingUserInfoArray };
}

window.followUser = followUser;
window.addFollower = addFollower;
window.getFollowers = getFollowers;
window.getFollowing = getFollowing;
window.getFollowListUserInfo = getFollowListUserInfo;
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
  getFollowers,
  getFollowing,
  getFollowListUserInfo,
  storage,
};
