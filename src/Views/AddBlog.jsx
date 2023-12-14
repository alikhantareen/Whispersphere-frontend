import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router";
import { Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import Form from "../Components/Form";

const AddBlog = () => {
  const navigate = useNavigate();

  function log(values) {
    console.log(values);
  }

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return (
    <main>
      <Navbar />
      <section className="flex justify-center">
        <div className="flex justify-center">
          <section className="flex flex-col justify-start items-start gap-4 w-full md:max-w-[68rem] mt-4">
            <Typography
              className="self-center md:self-start text-[#6c9d98] underline mb-4"
              variant="h1"
            >
              Create a blog
            </Typography>
            <Form title="" readtime="" category="" description="" submitFunction={log} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default AddBlog;
