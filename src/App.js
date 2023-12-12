import { Routes, Route } from "react-router";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Home from "./Views/Home";
import SingleBlog from "./Views/SingleBlog";
import Profile from "./Views/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/single-blog/" element={<SingleBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
