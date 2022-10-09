import notFoundImg from "../assets/img/404.webp";
import "../assets/css/NotFound.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="content">
        <img className="error" src={notFoundImg} alt="" />

        <div className="text">
          Hmm...this page doesn’t exist. Try searching for something else.
        </div>

        <Link to="/home">
          <button className="go-home">Go home </button>
        </Link>
      </div>
    </div>
  );
}
