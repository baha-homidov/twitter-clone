import "../assets/css/WhoToFollow.css";
import userIcon from "../assets/img/icons/user.svg";
function WhoToFollow(props) {
  const userArray = [
    {
      name: "Baha Homidov",
      username: "@bahahomidov",
    },
    {
      name: "Taco Doggo",
      username: "@tacothedog",
    },
  ];
  return (
    <div className="who-to-follow-container">
      <div className="title">
        <h3>Who to follow</h3>
      </div>
      <div className="user-container">
        {userArray.map((element, index) => {
          return (
            <button key={index} className="user-entry">
              <img src={userIcon} alt="" className="user-photo" />
              <div className="name">{element.name}</div>
              <div className=" username">{element.username}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WhoToFollow;
