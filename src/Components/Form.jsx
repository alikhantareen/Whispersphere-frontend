import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@material-tailwind/react";

const Form = (props) => {
  const { title, category, readtime, description, image, submitFunction, buttonContent } =
    props;
  const editorRef = useRef(null);
  const tinymcData = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  //defining a form instance
  const formik = useFormik({
    initialValues: {
      title: title,
      category: category,
      readTime: readtime,
      image: image,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title required"),
      category: Yup.string().required("Category required"),
      readTime: Yup.string().required("Read time required"),
      image: Yup.mixed().required("Image is required")
    }),
    onSubmit: (values) => {
      const data = {
        title: values.title,
        category: values.category,
        read_time: values.readTime,
        image: values.image,
        description: tinymcData(),
      };
      submitFunction(data);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="form-group w-full md:w-[50rem] flex flex-col gap-3 md:gap-4 p-2"
      encType="multipart/form-data"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-around">
        <div className="flex flex-col items-center w-full">
          <input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            type="text"
            placeholder="Type title..."
            className="text-white input"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="flex flex-col w-full items-center">
          <select
            label="Select Category"
            id="category"
            name="category"
            onChange={formik.handleChange}
            className="text-white select select-ghost-primary"
          >
            <option value="" selected disabled>
              Choose category
            </option>
            {Categories.map((elem, index) => {
              return (
                <option value={elem} key={index}>
                  {elem}
                </option>
              );
            })}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col w-full items-center">
          <input
            id="readTime"
            name="readTime"
            onChange={formik.handleChange}
            value={formik.values.readTime}
            type="text"
            placeholder="Total read time..."
            className="text-white input"
          />
          {formik.touched.readTime && formik.errors.readTime ? (
            <div className="text-red-500">{formik.errors.readTime}</div>
          ) : null}
        </div>
        <div className="flex flex-col w-full items-center">
          <input
            id="image"
            name="image"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
            type="file"
            className="input-file"
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500">{formik.errors.image}</div>
          ) : null}
        </div>
      </div>
      <div className="p-2">
        <Editor
          apiKey="27tp408napsi18tfhf042ha3cncbzn6eb22y9e8hp1gdtld5"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={description}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <Button
        className="self-start px-16"
        type="submit"
        color="teal"
        variant="gradient"
      >
        {buttonContent}
      </Button>
    </form>
  );
};

export default Form;

const Categories = [
  "Technology",
  "Environment",
  "Food",
  "Fashion",
  "Travel",
  "Health",
  "Education",
  "Business",
  "Entertainment",
  "Sports",
];
