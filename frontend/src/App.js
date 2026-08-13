import "./App.css";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import backgroundImage from "./background-optimized.jpg";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Chatpage = lazy(() => import("./Pages/Chatpage"));

function App() {
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Suspense fallback={null}>
        <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={Chatpage} />
      </Suspense>
    </div>
  );
}

export default App;
