import React from "react";
import Card from "../Components/Card";
import { Typography } from "@material-tailwind/react";

const BlogsSection = (props) => {
  const title = props.title;
  return (
    <section className="flex flex-col gap-4 mt-4">
      <Typography variant="h1" color="white" className="underline p-2">
        {title}
      </Typography>
      <section className="flex justify-start w-full items-center gap-4 flex-wrap p-2">
        <Card />
      </section>
    </section>
  );
};

export default BlogsSection;
