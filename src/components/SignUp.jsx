import { useState } from "react";
import "../assets/css/SignUp.css";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleName(event) {
    setName(event.target.value);
  }
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    alert(name + username + password + confirmPassword);
    event.preventDefault();
  }

  return (
    <div className="sign-up-container">
      <div className="top-bar">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back"
        >
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

        <form onSubmit={handleSubmit}>
          <div className="name-container">
            <input
              type="text"
              className="name"
              value={name}
              onChange={handleName}
              required
            />
            <span className="label">Text</span>
          </div>
          <div className="username-container">
            <input
              type="text"
              className="username"
              value={username}
              onChange={handleUsername}
              required
            />
            <span className="label">Text</span>
          </div>
          <div className="password-container">
            <input
              type="password"
              className="name"
              value={password}
              onChange={handlePassword}
              required
            />
            <span className="label">Text</span>
          </div>
          <div className="confirm-password-container">
            <input
              type="password"
              className="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
              placeholder=""
            />
            <span className="label">Text</span>
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
