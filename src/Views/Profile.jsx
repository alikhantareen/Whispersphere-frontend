import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Typography, Button } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Components/Loader";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loadUser, setLoadUser] = useState(true);
  //query hook for caching the api's data
  const { isPending, data } = useQuery({
    queryKey: ["user_blogs"],
    queryFn: () => getUserBlogs(id),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  //the following function will fetch the data for the user's blog
  async function getUserBlogs(id) {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/blogs/user-profile/${id}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  //the following function will get the user's data
  async function getUserData(id) {
    try {
      const response = await axios.get(
        `http://localhost:5050/auth/get-user/${id}`
      );
      const { data } = response;
      setUser({ ...data });
      setLoadUser(false);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
    getUserData(id);
  }, []);

  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <section className="flex justify-start items-center gap-4 w-full md:max-w-[68rem]">
          <img src={avatar} width={80} alt="avatar" loading="lazy" />
          <Typography variant="h1" color="white">
            {loadUser ? <span>...</span> : user.name.toUpperCase()}
          </Typography>
        </section>
        <section className="flex justify-between items-center gap-4 w-full md:max-w-[68rem]">
          <span className="flex gap-4 items-center">
            <Typography variant="small">
              Followers: {loadUser ? <span>...</span> : user.followers.length}
            </Typography>
            <Link to={"/"}>
              <Typography className="link" variant="small">
                Following: {loadUser ? <span>...</span> : user.following.length}
              </Typography>
            </Link>
          </span>
          <Link to={"/addblog"}>
            <Button color="teal" variant="gradient">
              Create a blog
            </Button>
          </Link>
        </section>
        <section className="flex justify-start items-center gap-4 w-full md:max-w-[68rem]">
          <div className="flex flex-col gap-4">
            <Typography variant="h1" color="white" className="underline">
              My Blogs
            </Typography>
            {isPending ? (
              <Loader />
            ) : data.length === 0 ? (
              <Typography variant="paragraph" color="gray">
                No blogs to show.
              </Typography>
            ) : (
              data.map((elem, index) => {
                return (
                  <Link key={index} to={`/single-blog/${elem._id}`}>
                    <Card title={elem.title} description={elem.description} />
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Profile;
