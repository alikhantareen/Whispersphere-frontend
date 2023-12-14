import React from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  //query hook for caching the api's data
  const { isPending, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  //the following function will fetch the data from api/blogs endpoint
  async function getBlogs() {
    try {
      const response = await axios.get("http://localhost:5050/api/blogs");
      const { data } = response;
      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <main>
      <Navbar />
      <section className="flex justify-center">
        <section className="flex flex-col gap-4 w-full md:max-w-[68rem]">
          <Typography variant="h1" color="white" className="underline p-2 text-[#6c9d98]">
            All Blogs
          </Typography>
          {isPending ? (
            <Loader />
          ) : (
            data.map((elem, index) => {
              return (
                <Link key={index} to={`/single-blog/${elem._id}`}>
                  <Card title={elem.title} description={elem.description} />
                </Link>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
};

export default Home;
