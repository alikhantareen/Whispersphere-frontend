import React from "react";
import Navbar from "../Components/Navbar";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import BlogsSection from "../Components/Blogs-section";

const Profile = () => {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <section className="flex justify-start items-center gap-4 w-full md:max-w-[68rem]">
          <img src={avatar} width={80} alt="avatar" loading="lazy" />
          <Typography variant="h1" color="white">
            Ali Khan
          </Typography>
        </section>
        <section className="flex justify-between items-center gap-4 w-full md:max-w-[68rem]">
          <span className="flex gap-4 items-center">
            <Typography variant="small">Followers: 13</Typography>
            <Link to={"/"}>
              <Typography className="link" variant="small">
                Following: 5
              </Typography>
            </Link>
          </span>
          <Link>
            <button className="btn btn-solid-primary">Create a blog</button>
          </Link>
        </section>
        <section className="flex justify-start items-center gap-4 w-full md:max-w-[68rem]">
          <BlogsSection title="My Blogs" />
        </section>
      </section>
    </main>
  );
};

export default Profile;
