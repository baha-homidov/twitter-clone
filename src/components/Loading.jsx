import "../assets/css/Loading.css";

export default function Loading(props) {

  return (
    <div
      className="loading-container"
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
