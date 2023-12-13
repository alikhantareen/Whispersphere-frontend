import React from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { Typography } from "@material-tailwind/react";

const Home = () => {
  return (
    <main>
      <Navbar />
      <section className="flex justify-center">
        <section className="flex flex-col gap-4 w-full md:max-w-[68rem]">
          <Typography variant="h1" color="white" className="underline p-2">
            All Blogs
          </Typography>
          <Card />
        </section>
      </section>
    </main>
  );
};

export default Home;
