import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Card from "./Card";
import avatar from "../assets/avatar.png";
import axios from "axios";
import Cookies from "js-cookie";

const UserSection = () => {
  const closeDialog = useRef();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [itemID, setItemId] = useState(null);
  const handleOpen = () => {
    setOpen(!open);
  };

  //query hook for caching the api's data
  const { isPending, data, refetch } = useQuery({
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

  const loggedInUserId = Cookies.get("user");
  const isRandom = loggedInUserId !== id;

  async function deleteBlog(id) {
    try {
      const isDeleted = await axios.delete(
        `http://localhost:5050/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (isDeleted.status === 200) {
        closeDialog.current.click();
        refetch();
      }
    } catch (error) {
      console.warn(error);
    }
  }

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
                      views={elem.views.length}
                    />
                  </Link>
                  {!isRandom && (
                    <div className="popover">
                      <label
                        className="popover-trigger my-2 cursor-pointer link btn btn-group-rounded btn-group-scrollable"
                        tabIndex="0"
                      >
                        Options
                      </label>
                      <div className="popover-content" tabIndex="0">
                        <div className="popover-arrow"></div>
                        <div className="p-2 text-sm flex flex-col">
                          <Link to={`/editblog/${elem._id}`}>Edit</Link>
                          <div className="divider"></div>
                          <Link
                            onClick={() => {
                              setItemId(elem._id);
                              handleOpen();
                            }}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <DialogBox
          blogID={itemID}
          state={open}
          handler={handleOpen}
          deleteFunc={deleteBlog}
          closeDialog={closeDialog}
        />
      </section>
    </>
  );
};

export default UserSection;

const DialogBox = ({ blogID, state, handler, deleteFunc, closeDialog }) => {
  return (
    <>
      <Dialog open={state} handler={handler}>
        <DialogHeader>Alert!</DialogHeader>
        <DialogBody>Do you want to delete the blog?</DialogBody>
        <DialogFooter>
          <Button
            ref={closeDialog}
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => deleteFunc(blogID)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
