// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// required libraries for firebase Auth
import {
  getAuth,

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
  query,
  deleteDoc,
  where,
  increment,


  collectionGroup,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
  // eslint-disable-next-line no-unused-vars
  const userId = user.uid;
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
    // eslint-disable-next-line no-unused-vars
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

async function addUserToDataBase(uid, username, name, userPhoto, aboutMe) {
  // adds user to the database and set's up tweets collection
  // doesn't check for already existing usernames
  // existing usernames should checked before calling this function
  try {
    // eslint-disable-next-line no-unused-vars
    const Doc = await addDoc(
      collection(db, "userCollection", uid, "tweetCollection"),
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
        userPhotoUrl: userPhoto
          ? userPhoto
          : "https://firebasestorage.googleapis.com/v0/b/twitter-clone-a252d.appspot.com/o/userphotos%2Fdefault-userphoto.png?alt=media&token=06b9727b-0b33-4a35-93a3-d7277565b93e",
        timestamp: serverTimestamp(),
        uid: uid,
        followerCount: 0,
        followingCount: 0,
        tweetCount: 0,
        aboutMe: aboutMe,
      },
      { merge: true }
    );


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

async function uploadTweetPhoto(userphoto, username) {
  try {
    console.log(userphoto);
    // a file to be uploaded
    // constructs a filename
    // uploads to firebase storage
    // returns upload's url

    // *for a commercial product 'Resize Images' extension can be used for resizing images on server side

    // construct a filename from username+millisecondsSinceEpoch
    const filename =
      `${username}-${new Date().getTime()}.${userphoto.name.substring(
        userphoto.name.indexOf(".") + 1
      )}`.toLowerCase(); // construct a filename
    const path = `/tweetPhotos/${filename}`;
    //upload to /tweetPhotos folder
    const storageRef = ref(storage, path);
    const uploadSnapshot = await uploadBytes(storageRef, userphoto);
    const url = await getDownloadURL(uploadSnapshot.ref);

    return { url: url, path: path };
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
  // adds an entry to targetUser's followerCollection
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

}

async function removeFollower(currentUserId, targetUserId) {
  // removes targetUser's entry to from currentUser's followerCollection
  try {
    if (currentUserId === targetUserId) {
      return;
    }
    await deleteDoc(
      doc(
        db,
        "userCollection",
        currentUserId,
        "followerCollection",
        targetUserId
      )
    );
    console.log("Follower removed");
  } catch (e) {
    console.log("error removing a follower" + e);
  }
}

async function addFollowing(targetUserId, userToFollowId) {
  // adds an entry to targetUser's followerCollection
  // returns true if executes without errors
  // returns false if  encounters an error
  try {
    if (targetUserId === userToFollowId || !targetUserId || !userToFollowId) {
      return false;
    }
    await setDoc(
      doc(
        db,
        "userCollection",
        targetUserId,
        "followCollection",
        userToFollowId
      ),
      {
        timestamp: serverTimestamp(),
        uid: userToFollowId,
      }
    );

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function removeFollowing(currentUserId, targetUserId) {
  // removes targetUser's entry in currentUser's following collecion
  // removes targetUser's entry to from currentUser's followerCollection
  try {
    if (currentUserId === targetUserId) {
      return;
    }
    await deleteDoc(
      doc(db, "userCollection", currentUserId, "followCollection", targetUserId)
    );

  } catch (e) {
    console.log("error removing a follower" + e);
  }
}

async function incrementFollowerCount(userId) {
  try {
    const userRef = doc(db, "userCollection", userId);
    await setDoc(userRef, { followerCount: increment(1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function incrementTweetCount(userId) {
  try {
    const userRef = doc(db, "userCollection", userId);
    await setDoc(userRef, { tweetCount: increment(1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function decrementFollowerCount(userId) {
  try {
    const userRef = doc(db, "userCollection", userId);
    await setDoc(userRef, { followerCount: increment(-1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function incrementFollowingCount(userId) {
  try {
    const userRef = doc(db, "userCollection", userId);
    await setDoc(userRef, { followingCount: increment(1) }, { merge: true });
  } catch (e) {
    console.log(e);
  }
}

async function decrementFollowingCount(userId) {
  try {
    const userRef = doc(db, "userCollection", userId);
    await setDoc(userRef, { followingCount: increment(-1) }, { merge: true });
  } catch (e) {
    console.log(e);
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

    await incrementFollowerCount(userToBeFollowed);
    await incrementFollowingCount(currentUser);
    return true;
  } catch (e) {
    console.log(`Error in followUser: ${e}`);
    return true;
  }
}

async function unfollowUser(currentUserId, userToBeUnfollowedId) {
  // unfollow a user and remove corresponding entries from the both users
  try {
    await removeFollowing(currentUserId, userToBeUnfollowedId);
    await removeFollower(userToBeUnfollowedId, currentUserId);
    await decrementFollowingCount(currentUserId);
    await decrementFollowerCount(userToBeUnfollowedId);
  } catch (e) {
    console.log("Error unfollowing a user" + e);
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
const makeChunksOf10 = (array) => {
  // helper function
  // takes an array
  // returns an array containing the original array divided into array's of size <=10
  const chunkSize = 10;
  const resultArr = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    resultArr.push(chunk);
  }
  return resultArr;
};

async function getUserInfoFromIdArray(idArray) {
  // recieves an array of userId strings
  // if idArray.length is bigger than 10 divides it in 10 element chunks
  // because of Firestore chunk query limitations
  // constructs and returns an array of userInfo

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

async function isFollowing(currentUserId, targetUserId) {
  // returns if currentUser follows targetUser
  const docRef = doc(
    db,
    "userCollection",
    currentUserId,
    "followCollection",
    targetUserId
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

async function publishTweet(
  userInfo,
  bodyText,
  isRetweet,
  imageUrl,
  imageStoragePath
) {
  try {
    // gets userId, tweet bodyText, and an optioanl image
    // if image is present uploads it to firebase storage and gets result url
    // adds an entry to userId/tweetCollection

    const newTweetRef = doc(
      collection(db, "userCollection", userInfo.uid, "tweetCollection")
    );
    const tweet = {
      authorId: userInfo.uid,
      displayName: userInfo.displayName,
      username: userInfo.username,
      userPhotoUrl: userInfo.userPhotoUrl,
      bodyText: bodyText,
      timestamp: serverTimestamp(),
      imageUrl: imageUrl ? imageUrl : "",
      imageStoragePath: imageStoragePath ? imageStoragePath : "",
      retweetCount: 0,
      likeCount: 0,
      replyCount: 0,
      retweetedBy: [],
      likedBy: [],
      isRetweet: isRetweet,
      isReply: false,
      tweetId: newTweetRef.id,
    };

    await setDoc(newTweetRef, tweet);
    incrementTweetCount(userInfo.uid);
  } catch (e) {
    console.log(e);
  }
}

async function getAllTweets(userId) {
  // queries Firestore database
  // returns an array of tweetObjs in descending order
  try {
    const resultArr = [];

    const tweetsRef = collectionGroup(db, "tweetCollection");
    // get Tweets
    let q = query(tweetsRef, where("authorId", "==", userId));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push(doc.data());
    });

    // get Retweets
    q = query(tweetsRef, where("retweeterUserId", "==", userId));
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push(doc.data());
    });

    await Promise.all(
      // look for retweets and get the source tweet
      resultArr.map(async (tweetData) => {
        if (tweetData.isRetweet === true) {
          const sourceTweet = await getTweetDataById(tweetData.originalTweetId);
          const timestamp = tweetData.timestamp;
          Object.assign(tweetData, sourceTweet); // merge to objects
          tweetData.isRetweet = true;
          tweetData.timestamp = timestamp;
        }
      })
    );

    await Promise.all(
      // look for replies and get the source tweet
      resultArr.map(async (tweetData) => {
        if (tweetData.isReply === true) {
          if (tweetData.isRetweet === true) {
            tweetData.isReply = false;
          } else {
            const sourceTweet = await getTweetDataById(tweetData.parentTweetId);
            sourceTweet.isReply = false;
            tweetData.sourceTweetData = sourceTweet;
          }
        }
      })
    );

    resultArr.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // sort tweets

    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

async function getFollowedTweets(userId) {
  // takes a userId
  // gets userId's followers
  // contructs an array of followed user's userIds
  // chunk it into size <= 10 arrays
  // make a group collection query and gets the tweets
  // sorts and returns the tweets

  const tweetArray = []; // array containing all the tweets
  let followListArray = []; // array containing all the followed user's userIds

  const followCollectionDocs = await getDocs(
    // get all the followed user entries
    collection(db, "userCollection", userId, "followCollection")
  );
  followCollectionDocs.forEach((doc) => {
    // construct an array only containing userIds
    if (doc.data().skip !== true) {
      followListArray.push(doc.data().uid);
    }
  });
  followListArray.push(userId); // also add current user's own userId

  followListArray = makeChunksOf10(followListArray);

  await Promise.all(
    // fire multiple queries at the same time and wait for all of them to finish
    followListArray.map(async (arrElement) => {
      const tweetsRef = collectionGroup(db, "tweetCollection");

      // get Tweets
      let q = query(tweetsRef, where("authorId", "in", arrElement));
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tweetArray.push(doc.data());
      });

      // get Retweets
      q = query(tweetsRef, where("retweeterUserId", "in", arrElement));
      querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tweetArray.push(doc.data());
      });

      await Promise.all(
        // look for retweets and get the source tweet
        tweetArray.map(async (tweetData) => {
          if (tweetData.isRetweet === true) {
            const sourceTweet = await getTweetDataById(
              tweetData.originalTweetId
            );
            const timestamp = tweetData.timestamp;
            Object.assign(tweetData, sourceTweet); // merge to objects
            tweetData.isRetweet = true;
            tweetData.timestamp = timestamp;
          }
        })
      );

      await Promise.all(
        // look for replies and get the source tweet
        tweetArray.map(async (tweetData) => {
          if (tweetData.isReply === true) {
            if (tweetData.isRetweet === true) {
              tweetData.isReply = false;
            } else {
              const sourceTweet = await getTweetDataById(
                tweetData.parentTweetId
              );
              sourceTweet.isReply = false;
              tweetData.sourceTweetData = sourceTweet;
            }
          }
        })
      );
    })
  );

  tweetArray.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
  return tweetArray;
}

async function getTweetRefById(tweetId) {
  // finds a tweet with a give tweedId using collectionGroup query
  // returns a *reference* to that tweet
  // returns undefined if no tweet with a given tweetId exists
  let resultTweetRef = undefined;
  const tweetsRef = collectionGroup(db, "tweetCollection");
  const q = query(tweetsRef, where("tweetId", "==", tweetId));
  const tweetSnap = await getDocs(q);
  tweetSnap.forEach((doc) => {
    resultTweetRef = doc.ref;
  });
  return resultTweetRef;
}

async function getTweetDataById(tweetId) {
  // finds a tweet with a give tweedId using collectionGroup query
  // returns a data object to that tweet
  // returns undefined if no tweet with a given tweetId exists
  let resultTweetRef = undefined;
  const tweetsRef = collectionGroup(db, "tweetCollection");
  const q = query(tweetsRef, where("tweetId", "==", tweetId));
  const tweetSnap = await getDocs(q);
  tweetSnap.forEach((doc) => {
    resultTweetRef = doc.data();
  });
  return resultTweetRef;
}

async function updateRetweetDataOnTargetTweet(tweetId, userId) {
  try {
    // takes target tweet's tweedId, userId of the user who did retweet action
    // gets reference to the target tweet and updates data
    const targetTweetRef = await getTweetRefById(tweetId);

    await updateDoc(targetTweetRef, {
      retweetedBy: arrayUnion(userId),
      retweetCount: increment(1),
    });
  } catch (e) {
    console.log(e);
  }
}

async function addRetweetToCollection(userInfo, tweetInfo) {
  try {
    // takes targetUser's uid
    // ready-to-publish retweet as a tweetInfo
    // adds the retweet to the tweetCollection after manipulating some data
    const newRetweetRef = doc(
      collection(db, "userCollection", userInfo.uid, "tweetCollection")
    );

    // add the current user as a retweeter
    tweetInfo.retweetedBy.push(userInfo.uid);

    const retweetInfo = {
      retweeterDislayName: userInfo.displayName,
      retweeterUserId: userInfo.uid,
      isRetweet: true,
      originalTweetId: tweetInfo.tweetId,
      timestamp: serverTimestamp(),
    };

    await setDoc(newRetweetRef, retweetInfo);
  } catch (e) {}
}

async function publishRetweet(userInfo, tweetInfo) {
  try {
    await Promise.all([
      updateRetweetDataOnTargetTweet(tweetInfo.tweetId, userInfo.uid),
      addRetweetToCollection(userInfo, tweetInfo),
      incrementTweetCount(userInfo.uid),
    ]);

  } catch (e) {
    console.log(e);
  }
}

async function incrementReplyCount(tweetId) {
  try {
    // takes target tweet's tweedId and increments the reply counter
    const targetTweetRef = await getTweetRefById(tweetId);

    await updateDoc(targetTweetRef, {
      replyCount: increment(1),
    });
  } catch (e) {

  }
}

async function publishReply(userInfo, tweetInfo, sourceTweet) {
  try {
    const sourceTweetRef = await getTweetRefById(sourceTweet.tweetId);
    await incrementReplyCount(sourceTweetRef.id);

    await addReplyToCollection(userInfo, sourceTweetRef, tweetInfo);

    await incrementTweetCount(userInfo.uid);
  } catch (e) {
    console.log(e);
  }
}

async function addReplyToCollection(userInfo, sourceTweetRef, tweetInfo) {
  const newTweetRef = doc(collection(sourceTweetRef, "replyCollection"));
  try {
    const tweet = {
      authorId: userInfo.uid,
      displayName: userInfo.displayName,
      username: userInfo.username,
      userPhotoUrl: userInfo.userPhotoUrl,
      bodyText: tweetInfo.bodyText,
      timestamp: serverTimestamp(),
      imageUrl: tweetInfo.imageUrl ? tweetInfo.imageUrl : "",
      imageStoragePath: tweetInfo.imageStoragePath
        ? tweetInfo.imageStoragePath
        : "",
      retweetCount: 0,
      likeCount: 0,
      replyCount: 0,
      retweetedBy: [],
      likedBy: [],
      isRetweet: false,
      isReply: true,
      parentTweetId: sourceTweetRef.id,
      tweetId: newTweetRef.id,
    };
    const docRef = doc(sourceTweetRef, "tweetCollection", newTweetRef.id);
    await setDoc(docRef, tweet);

  } catch (e) {
    console.log(e);
  }
}

async function getReplies(tweetId) {
  // get tweets from firestore where sourceTweet == tweetId
  try {
    const tweetArray = [];

    const tweetsRef = collectionGroup(db, "tweetCollection");

    // get Tweets
    let q = query(tweetsRef, where("parentTweetId", "==", tweetId));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tweetData = doc.data();
      tweetData.isRetweet = false;
      tweetData.isReply = false;
      tweetArray.push(tweetData);
    });
    tweetArray.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // sort tweets
    return tweetArray;
  } catch (e) {
    console.log(e);
  }
}

async function likeTweet(tweetId, userId) {
  // get's tweetRef using tweedId
  // increments targetTweets' likeCount
  // adds likerUserId to targetTweet's like by
  try {
    const targetTweetRef = await getTweetRefById(tweetId);
    await updateDoc(targetTweetRef, {
      likedBy: arrayUnion(userId),
      likeCount: increment(1),
    });

  } catch (e) {
    console.log(e);
  }
}

async function removeLike(tweetId, userId) {
  // get's tweetRef using tweedId
  // increments targetTweets' likeCount
  // adds likerUserId to targetTweet's like by
  try {
    const targetTweetRef = await getTweetRefById(tweetId);
    await updateDoc(targetTweetRef, {
      likedBy: arrayRemove(userId),
      likeCount: increment(-1),
    });

  } catch (e) {
    console.log(e);
  }
}

window.likeTweet = likeTweet;
window.removeLike = removeLike;
window.updateRetweetDataOnTargetTweet = updateRetweetDataOnTargetTweet;
window.getFollowedTweets = getFollowedTweets;
window.getAllOwnTweets = getAllTweets;

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
  followUser,
  unfollowUser,
  storage,
  isFollowing,
  publishTweet,
  uploadTweetPhoto,
  getAllTweets,
  getFollowedTweets,
  publishRetweet,
  getTweetDataById,
  publishReply,
  getReplies,
  removeLike,
  likeTweet,
};
