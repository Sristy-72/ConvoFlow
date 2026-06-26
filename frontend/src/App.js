import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import backgroundImage from "./background.png";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
