import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* TODO: center the navbar and feed when width is smaller than 1000px */}
      <div className="main-content">
        <Navbar />
        <Feed />
      </div>
      <aside className="right-bar">
        Right bar
      </aside>
    </div>
  );
}

export default App;
