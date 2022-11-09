/* eslint-disable react-hooks/exhaustive-deps */
import "../assets/css/CreateUserFromGoogle.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addUserToDataBase,
  isNewUser,
  isUsernameTaken,
} from "../FirebaseBackend";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";

export default function CreateUserFromGoogle() {
  const navigate = useNavigate();
  const [validPattern, setValidPattern] = useState(true); // state to track if username corresponds to a valid pattern
  const [username, setUsername] = useState(""); // userName value in the input form
  const [formClassname, setFormClassname] = useState(""); // track if user tried to submit the form
  const [showLoading, setShowLoading] = useState(false); // control showing and hiding of the loading component
  const [user, setUser] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameLoader, setUsernameLoader] = useState(false);
  const [aboutMe, setAboutMe] = useState("");

  function handleAboutMe(event) {
    setAboutMe(event.target.value);
  }

  useEffect(() => {
    // get userId when component is mounted
    // onAuthStateChanged retrieves userID asynchronously
    setShowLoading(true);
    onAuthStateChanged(getAuth(), async (user) => {
      setShowLoading(true);
      if (user) {
        console.log("user" + user.uid);
        setUser(user);
        const newUserCheck = await isNewUser(user.uid); // check if user already exists
        if (newUserCheck === false) {
          // redirect to home
          navigate("/home");
        }
      } else {
        navigate("/welcome");
      }
      setShowLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("two");
  }, []);

  function validateUserName(username) {
    const regExp = /^@?(\w){1,15}$/;
    setValidPattern(Boolean(username.match(regExp)));
  }

  async function checkUsernameTaken(username) {
    setUsernameLoader(true);
    const isTaken = await isUsernameTaken(username);
    setUsernameLoader(false);
    setUsernameTaken(isTaken);
  }

  function handleUsername(event) {
    validateUserName(event.target.value);
    checkUsernameTaken(event.target.value);
    setUsername(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (validPattern) {
      setShowLoading(true);

      const isTaken = await isUsernameTaken(username);
      if (isTaken !== true) {
        await addUserToDataBase(
          user.uid,
          username,
          user.displayName,
          user.photoURL,
          aboutMe
        );
      }
      navigate("/home");
    }
    setShowLoading(false);
  }

  function updateForm() {
    setFormClassname("submitted");
  }

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className="create-user-from-google-container">
      {showLoading && <Loading show={showLoading} />}
      <div className="content">
        <div className="top-bar">
          <div className="top-bar">
            <button onClick={navigateBack} className="back">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <h1>Please choose a username</h1>
        <form className={formClassname} onSubmit={handleSubmit}>
          <div className="username-container">
            <input
              pattern="^@?(\w){1,15}$"
              type="text"
              className="name"
              value={username}
              onChange={handleUsername}
              required
              placeholder=" "
              maxLength="15"
            />
            <span className="label">Username</span>
          </div>
          {usernameLoader && validPattern && (
            <div className="loader-container">
              <div className="loader">
                <div className="loaderBar"></div>
              </div>
            </div>
          )}
          {validPattern &&
            usernameTaken &&
            username.length !== 0 &&
            !usernameLoader && (
              <div className="username-exists">
                This username is already taken
              </div>
            )}
          {validPattern &&
            !usernameTaken &&
            username.length !== 0 &&
            !usernameLoader && (
              <div className="valid-username">You can use this username</div>
            )}

          <div className="wrong-pattern">
            A username can only contain alphanumeric characters (letters A-Z,
            numbers 0-9) with the exception of underscores
          </div>

          <div className="about-me-container">
            <textarea
              onChange={handleAboutMe}
              className="about-me"
              cols="30"
              rows="10"
              maxLength="160"
              placeholder=" "
            ></textarea>
            <span className="label">About me</span>
          </div>

          <button onClick={updateForm} type="submit" className="submit">
            Start using Barker
          </button>
        </form>
      </div>
    </div>
  );
}
