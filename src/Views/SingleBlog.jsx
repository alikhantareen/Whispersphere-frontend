import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Typography, Button, Tooltip } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Components/Loader";
import { useParams } from "react-router";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  //query hook for caching the api's data
  const { isPending, data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getSingleBlog(id),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  //the following function will fetch the data from api/blogs endpoint
  async function getSingleBlog(id) {
    try {
      const blog_data = await axios.get(
        `http://localhost:5050/api/blogs/${id}`
      );
      const { data } = blog_data;
      const image_getter = await axios.get(
        `http://localhost:5050/api/blogs/image/${data.image}`
      );
      const user_data = await axios.get(
        `http://localhost:5050/auth/get-user/${data.author}`
      );
      data.image_path = image_getter.config.url;
      data.author = user_data.data.name;
      data.authorProfile = user_data.data._id;
      return data;
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  return (
    <main>
      <Navbar />
      {isPending ? (
        <Loader />
      ) : error ? (
        <Typography className="text-red-500 text-center">{error}</Typography>
      ) : (
        <section className="flex flex-col gap-4 p-4 justify-center items-center">
          <img
            className="rounded-lg"
            src={data.image_path}
            width={1080}
            alt="banner"
            loading="lazy"
          />
          <section className="p-2 w-full flex flex-col gap-4 justify-center rounded-lg max-w-[68rem]">
            <Typography className="text-[#6c9d98]" variant="h1">
              {data.title}
            </Typography>
            <Typography id="descriptionContainer" variant="paragraph">
              {parse(data.description)}
              <Typography>
                Written by:{" "}
                <Link
                  to={`/user/${data.authorProfile}`}
                  className="text-slate-500 italic link"
                >
                  {data.author}
                </Link>
              </Typography>
            </Typography>
            <div className="flex justify-start gap-4 w-full items-center">
              <Typography variant="small">
                Read time: {data.read_time}
              </Typography>
              <Typography variant="small">Category: {data.category}</Typography>
              <Typography
                variant="small"
                className="text-white flex gap-2 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.views}
              </Typography>
            </div>
          </section>
          <section className="w-full md:max-w-[68rem] p-2">
            <Tooltip content="Like this post">
              <Button
                variant="text"
                className="text-white flex gap-2 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {data.likes}
              </Button>
            </Tooltip>
          </section>
          <section className="w-full md:max-w-[68rem] p-2">
            <Typography variant="paragraph">Comments here</Typography>
          </section>
          <section className="w-full md:max-w-[68rem] p-2">
            <textarea
              className="textarea-block textarea"
              rows={5}
              placeholder="Type your comment here"
            />
            <Button color="teal" variant="gradient">
              Comment
            </Button>
          </section>
        </section>
      )}
    </main>
  );
};

export default SingleBlog;
