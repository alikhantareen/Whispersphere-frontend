import React, { useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "js-cookie";

const AddBlog = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const input_title = useRef(null);
  const log = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };

  function editor() {
    console.log(log());
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
            <Typography variant="h1">Create a blog</Typography>
            <Input
              ref={input_title}
              className="text-white w-full md:w-[54rem]"
              id="noteTitle"
              label="Title"
              color="teal"
            />
            <input type="file" name="file" className="input-file" />
            <Editor
              apiKey="27tp408napsi18tfhf042ha3cncbzn6eb22y9e8hp1gdtld5"
              onInit={(evt, editor) => (editorRef.current = editor)}
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
            <Button
              className="self-start"
              onClick={editor}
              color="teal"
              variant="gradient"
            >
              Create
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
};

export default AddBlog;
