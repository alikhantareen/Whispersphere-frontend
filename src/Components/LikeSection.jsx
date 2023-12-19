import React, { useEffect, useState } from "react";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";

const LikeSection = ({ totalLikes, increment_likes, error }) => {
  const [isLiked, setLikes] = useState(false);
  useEffect(() => {
    if (totalLikes.indexOf(Cookies.get("user")) !== -1) {
      setLikes(true);
    }
  }, []);

  return (
    <>
      <section className="w-full md:max-w-[68rem] p-2">
        <Typography variant="small" color="red">{error}</Typography>
        <Tooltip content="Like this post">
          <Button
            onClick={() => increment_likes(Cookies.get("user"))}
            variant="text"
            className={`${isLiked ? 'text-red-900' : 'text-white'} flex gap-2`}
            disabled={isLiked}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <Typography variant="small">{totalLikes.length}</Typography>
          </Button>
        </Tooltip>
      </section>
    </>
  );
};

export default LikeSection;
