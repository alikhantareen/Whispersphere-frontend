import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Card from "./Card";
import avatar from "../assets/avatar.png";
import axios from "axios";
import Cookies from "js-cookie";

const UserSection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRandom, setRandom] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open)
  };
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
        <div className="flex flex-col gap-4 w-full">
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
                <div className="flex gap-4">
                  <Link
                    className="flex-1"
                    key={index}
                    to={`/single-blog/${elem._id}`}
                  >
                    <Card
                      title={elem.title}
                      read_time={elem.read_time}
                      views={elem.views}
                    />
                  </Link>
                  {!isRandom && (
                    <div className="popover">
                      <label
                        className="popover-trigger my-2 cursor-pointer link underline"
                        tabIndex="0"
                      >
                        Options
                      </label>
                      <div className="popover-content" tabIndex="0">
                        <div className="popover-arrow"></div>
                        <div className="p-4 text-sm flex flex-col gap-4">
                          <Link to={`/editblog/${elem._id}`}>Edit</Link>
                          <Link onClick={handleOpen}>Delete</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Alert!</DialogHeader>
        <DialogBody>Do you want to delete the blog?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UserSection;
