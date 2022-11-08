import { useEffect, useRef, useState } from "react";
import "../assets/css/SignUp.css";
import { useNavigate } from "react-router-dom";
import {
  singUpWithLoginPassword,
  isUsernameTaken,
  addUserToDataBase,
  uploadUserPhoto,
  storage,
} from "../FirebaseBackend";
import Loading from "./Loading";
import userPhotoPlaceholder from "../assets/img/icons/placeholder-userphoto.png";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [validUsernamePattern, setValidUsernamePattern] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef(null);
  const [formClassName, setFormClassName] = useState("");
  const [usernameLoader, setUsernameLoader] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [showLoadingComponent, setShowLoadingComponent] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [UserPhotoPreview, setUserPhotoPreview] = useState(null); // state to preview to-be uploaded usernam
  const [aboutMe, setAboutMe] = useState("");

  function handleAboutMe(event) {
    setAboutMe(event.target.value);
  }

  useEffect(() => {
    // listen to userPhoto changes and update userPhotoPreview
    if (!userPhoto) {
      setUserPhotoPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(userPhoto);
    setUserPhotoPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [userPhoto]);

  const navigate = useNavigate();

  function handleUserphoto(event) {
    if (event.target.files && event.target.files[0]) {
      setUserPhoto(event.target.files[0]);
    }
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPassword(event) {
    confirmPasswordRef.current.setCustomValidity("");
    setConfirmPassword(event.target.value);
  }

  function handleUsername(event) {
    validateUserNamePattern(event.target.value);
    checkUsernameTaken(event.target.value);
    setUsername(event.target.value);
  }

  function validateUserNamePattern(username) {
    const regExp = /^@?(\w){1,15}$/;
    setValidUsernamePattern(Boolean(username.match(regExp)));
  }

  async function checkUsernameTaken(username) {
    setUsernameLoader(true);
    const isTaken = await isUsernameTaken(username);
    setUsernameLoader(false);
    setUsernameTaken(isTaken);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      // check if passwords confirmatin
      // if false cancel submit
      confirmPasswordRef.current.setCustomValidity(
        "Passwords are not matching"
      );
      return;
    }

    if (password.includes(" ") || confirmPassword.includes(" ")) {
      confirmPasswordRef.current.setCustomValidity(
        "Whitespaces are not allowed"
      );
      return;
    }

    if (validUsernamePattern) {
      // if username pattern is corrent
      // proceed with uploading
      setShowLoadingComponent(true);

      const isTaken = await isUsernameTaken(username);
      if (isTaken !== true) {
        const userId = await singUpWithLoginPassword(username, password);
        let userPhotoUrl = "";

        if (userPhoto) {
          console.log(userPhoto);
          userPhotoUrl = await uploadUserPhoto(userPhoto, username);
        }

        await addUserToDataBase(userId, username, name, userPhotoUrl);

        navigate("/home");

        setShowLoadingComponent(false);
        return;
      }
    }
    setShowLoadingComponent(false);
    console.log("success signup");
  }

  function updateForm() {
    setFormClassName("submitted");
  }

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div onClick={navigateBack} className="sign-up-component">
      {showLoadingComponent && <Loading />}
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="sign-up-container"
      >
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

        <div className="content">
          <h1 className="title">Create your account</h1>

          <form className={formClassName} onSubmit={handleSubmit}>
            <div className="profile-photo-container">
              <img
                src={UserPhotoPreview ? UserPhotoPreview : userPhotoPlaceholder}
                className="userphoto"
                alt="userphoto"
              />
              <label className="userphoto-picker">
                Pick a user photo
                <input
                  onChange={handleUserphoto}
                  type="file"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="name-container">
              <input
                type="text"
                className="name"
                value={name}
                onChange={handleName}
                required
                placeholder=" "
              />
              <span className="label">Name</span>
            </div>
            <div className="username-container">
              <input
                type="text"
                className="username"
                value={username}
                onChange={handleUsername}
                required
                placeholder=" "
                pattern="^@?(\w){1,15}$"
              />
              <span className="label">Username</span>
              {usernameLoader && validUsernamePattern && (
                <div className="loader-container">
                  <div className="loader">
                    <div className="loaderBar"></div>
                  </div>
                </div>
              )}
              {validUsernamePattern &&
                username.length !== 0 &&
                !usernameLoader &&
                usernameTaken && (
                  <div className="username-exists">
                    This username is already taken
                  </div>
                )}
              {!validUsernamePattern && username.length !== 0 && (
                <div className="invalid-pattern">Inavlid username format</div>
              )}
              {validUsernamePattern &&
                username.length !== 0 &&
                !usernameLoader &&
                !usernameTaken && (
                  <div className="valid-username">
                    You can use this username
                  </div>
                )}
            </div>

            <div className="username-pattern">
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
            <div className="password-container">
              <input
                type="password"
                minLength="6"
                className="name"
                value={password}
                onChange={handlePassword}
                required
                placeholder=" "
              />
              <span className="label">Password</span>
            </div>
            <div className="confirm-password-container">
              <input
                ref={confirmPasswordRef}
                type="password"
                className="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
                placeholder=" "
                minLength="6"
              />
              <span className="label">Confirm password</span>
            </div>
            <button onClick={updateForm} type="submit" className="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
