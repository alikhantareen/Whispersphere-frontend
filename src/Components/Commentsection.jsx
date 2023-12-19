import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const CommentSection = ({ comments, add_comment }) => {
  const [showForm, setForm] = useState(false);
  //defining a form instance
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Comment required"),
    }),
    onSubmit: (values) => {
      const data = {
        user: Cookies.get("user_name"),
        content: values.comment,
      };
      add_comment(data);
    },
  });
  return (
    <>
      <section className="w-full md:max-w-[68rem] p-2 flex flex-col gap-4">
        <Typography variant="h5" color="teal">
          Comments
        </Typography>
        <Typography variant="paragraph">
          {comments.length === 0 ? (
            <Typography variant="small">No comments to show</Typography>
          ) : (
            comments.map((elem, index) => {
              return (
                <div key={index}>
                  <Typography>{elem.content}</Typography>
                  <Typography variant="small" color="gray" className="italic">
                    {" "}
                    -- {elem.user}
                  </Typography>
                </div>
              );
            })
          )}
        </Typography>
      </section>
      <section className="w-full md:max-w-[68rem] p-2">
        {showForm ? (
          <form onSubmit={formik.handleSubmit}>
            <textarea
              id="comment"
              name="comment"
              onChange={formik.handleChange}
              value={formik.values.comment}
              className="textarea-block textarea"
              rows={5}
              placeholder="Type your comment here"
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div className="text-red-500">{formik.errors.comment}</div>
            ) : null}
            <Button type="submit" color="teal" variant="gradient">
              Comment
            </Button>
          </form>
        ) : (
          <Button onClick={() => setForm(true)} color="white" variant="text">
            Add comment
          </Button>
        )}
      </section>
    </>
  );
};

export default CommentSection;
