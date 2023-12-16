import { Routes, Route } from "react-router";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Home from "./Views/Home";
import SingleBlog from "./Views/SingleBlog";
import Profile from "./Views/Profile";
import AddBlog from "./Views/AddBlog";
import Users from "./Views/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/user/:id" element={<Users />} />
        <Route path="/single-blog/:id" element={<SingleBlog />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
