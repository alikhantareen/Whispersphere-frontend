import React from "react";
import Navbar from "../Components/Navbar";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import Card from "../Components/Card";

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
            <Card />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Profile;
