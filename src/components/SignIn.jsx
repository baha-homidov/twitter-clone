import { useState } from "react";
import "../assets/css/SignIn.css";
import { useNavigate, Link } from "react-router-dom";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formClassName, setFormClassName] = useState("");
  const navigate = useNavigate();

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    alert(username + password);
    navigate("/home");
    event.preventDefault();
  }

  function updateForm() {
    setFormClassName("submitted");
  }

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div onClick={navigateBack} className="sign-in-component">
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="sign-in-container"
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
          <h1 className="title">Welcome back!</h1>

          <form className={formClassName} onSubmit={handleSubmit}>
            <div className="username-container">
              <input
                type="text"
                className="username"
                value={username}
                onChange={handleUsername}
                required
                placeholder=" "
              />
              <span className="label">Username</span>
            </div>
            <div className="password-container">
              <input
                type="password"
                className="name"
                value={password}
                onChange={handlePassword}
                required
                placeholder=" "
              />
              <span className="label">Password</span>
            </div>

            <button onClick={updateForm} type="submit" className="submit">
              Sign up
            </button>
            <div className="no-account-container">
              Don't have an account? <Link to="/welcome/sign-up" className="link">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
