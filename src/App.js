import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar />
        <Feed />
      </div>
      <aside className="right-bar">Right bar</aside>
    </div>
  );
}

export default App;
