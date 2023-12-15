import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router";
import { Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import Form from "../Components/Form";
import axios from "axios";

const AddBlog = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function formSubmission(values) {
    try {
      const file = values.image;
      const formData = new FormData();
      formData.append("image", file);
      const image_upload = await axios.post(
        "http://localhost:5050/api/blogs/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (image_upload.data.success) {
        const form_data = {
          title: values.title,
          description: values.description,
          category: values.category,
          read_time: values.read_time,
          author: Cookies.get("user"),
          image: image_upload.data.filename,
        };

        const form_upload = await axios.post(
          "http://localhost:5050/api/blogs",
          form_data,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        navigate(`/single-blog/${form_upload.data._id}`);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
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
              className="self-center md:self-start text-[#6c9d98] underline mb-4 text-4xl md:text-6xl"
              variant="h1"
            >
              Create a blog
            </Typography>
            {error ? (
              <Typography className="text-red-500 text-center">
                {error} 
              </Typography>
            ) : (
              ""
            )}
            <Form
              title=""
              readtime=""
              image={undefined}
              category=""
              description=""
              submitFunction={formSubmission}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default AddBlog;
