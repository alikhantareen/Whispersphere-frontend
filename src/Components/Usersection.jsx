import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import Loader from "./Loader";
import avatar from "../assets/avatar.png";
import Card from "./Card";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const UserSection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRandom, setRandom] = useState(false);

  //query hook for caching the api's data
  const { isPending, data } = useQuery({
    queryKey: ["user_blogs"],
    queryFn: () => getUserData(id),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  //the following function will fetch the data for the user's blog
  async function getUserData(id) {
    try {
      const user_blogs = await axios.get(
        `http://localhost:5050/api/blogs/user-profile/${id}`
      );
      const user_data = await axios.get(
        `http://localhost:5050/auth/get-user/${id}`
      );
      const blogs = user_blogs.data;
      const userInfo = user_data.data;
      return {
        blogs,
        userInfo,
      };
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    if (id === Cookies.get("user")) {
      navigate(`/profile/${id}`);
    } else if (window.location.href.includes("user")) {
      setRandom(true);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <section className="flex flex-col justify-start items-center gap-4 w-full md:max-w-[68rem]">
        <img src={avatar} width={80} alt="avatar" loading="lazy" />
        <Typography
          variant="h1"
          className="text-[#6c9d98] text-2xl md:text-6xl"
        >
          {isPending ? <span>...</span> : data.userInfo.name.toUpperCase()}
        </Typography>
      </section>
      <section className="flex flex-col md:flex-row justify-between items-center gap-4 w-full md:max-w-[68rem]">
        <span className="flex gap-4 items-center">
          <Typography variant="paragraph">
            Followers:{" "}
            {isPending ? <span>...</span> : data.userInfo.followers.length}
          </Typography>
          <Link to={"/"}>
            <Typography className="link" variant="paragraph">
              Following:{" "}
              {isPending ? <span>...</span> : data.userInfo.following.length}
            </Typography>
          </Link>
        </span>
        {isRandom ? (
          <Link to={""}>
            <Button color="teal" variant="gradient">
              Follow
            </Button>
          </Link>
        ) : (
          <Link to={"/addblog"}>
            <Button color="teal" variant="gradient">
              Create a blog
            </Button>
          </Link>
        )}
      </section>
      <section className="flex justify-start items-center gap-4 w-full md:max-w-[68rem]">
        <div className="flex flex-col gap-4">
          <Typography
            variant="h1"
            className="underline text-[#6c9d98] text-2xl md:text-6xl"
          >
            My Blogs
          </Typography>
          {isPending ? (
            <Loader />
          ) : data.blogs.length === 0 ? (
            <Typography variant="paragraph" color="gray">
              No blogs to show.
            </Typography>
          ) : (
            data.blogs.map((elem, index) => {
              return (
                <Link key={index} to={`/single-blog/${elem._id}`}>
                  <Card
                    title={elem.title}
                    read_time={elem.read_time}
                    views={elem.views}
                  />
                </Link>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default UserSection;
