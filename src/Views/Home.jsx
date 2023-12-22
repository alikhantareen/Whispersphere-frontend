import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import axios from "axios";

const Home = () => {
  //query hook for caching the api's data
  const { isFetching, data } = useQuery({
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
          <Typography
            variant="h1"
            color="white"
            className="underline p-2 text-[#6c9d98] text-2xl md:text-6xl"
          >
            All Blogs
          </Typography>
          {isFetching ? (
            <Loader />
          ) : data.length === 0 ? (
            <Typography className="p-2" variant="paragraph" color="gray">
              No blogs to show
            </Typography>
          ) : (
            data.map((elem, index) => {
              return (
                <Link className="p-2" key={index} to={`/single-blog/${elem._id}`}>
                  <Card
                    title={elem.title}
                    read_time={elem.read_time}
                    views={elem.views.length}
                  />
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
