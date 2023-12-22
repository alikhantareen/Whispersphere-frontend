import React, { useState, lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
const CommentSection = lazy(() => import("../Components/CommentSection"));
const LikeSection = lazy(() => import("../Components/LikeSection"));

const SingleBlog = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [alreadyLiked, setAlreadyLiked] = useState(null);

  //query hook for caching the api's data
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getSingleBlog(id),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  async function addComment(data) {
    const isCommentAdded = await axios.post(
      `http://localhost:5050/api/blogs/comment/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (isCommentAdded.status === 201) {
      refetch();
    }
  }

  async function incrementLikes(user_id) {
    try {
      const data = {
        userID: user_id,
      };
      const isIncremented = await axios.post(
        `http://localhost:5050/api/blogs/like/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (isIncremented.status === 201) {
        refetch();
      }
    } catch (error) {
      setAlreadyLiked(error.response.data.message);
    }
  }

  async function getViews(id) {
    try {
      const data = {
        userID: Cookies.get("user"),
      };
      await axios.post(
        `http://localhost:5050/api/blogs/views/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return;
    } catch (error) {
      console.warn(error);
    }
  }

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

  useEffect(() => {
    getViews(id);
  }, []);

  return (
    <main>
      <Navbar />
      {isFetching ? (
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
                {data.views.length}
              </Typography>
            </div>
          </section>
          {Cookies.get("user") && (
            <>
              <Suspense fallback={<Loader />}>
                <LikeSection
                  totalLikes={data.likes}
                  increment_likes={incrementLikes}
                  error={alreadyLiked}
                />
              </Suspense>
              <Suspense fallback={<Loader />}>
                <CommentSection
                  comments={data.comments}
                  add_comment={addComment}
                />
              </Suspense>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default SingleBlog;
