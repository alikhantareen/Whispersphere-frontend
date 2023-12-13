import React from "react";
import Navbar from "../Components/Navbar";
import { Typography, Button } from "@material-tailwind/react";

const SingleBlog = () => {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-4 p-4 justify-center items-center">
        <img
          class="rounded-lg"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          width={1080}
          alt="banner"
          loading="lazy"
        />
        <section className="p-2 w-full flex flex-col gap-4 justify-center rounded-lg max-w-[68rem]">
          <Typography variant="h1">Where does it come from?</Typography>
          <Typography variant="paragraph">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
            <span class="text-slate-500 italic">Written by: Author</span>
          </Typography>
          <div class="flex justify-start gap-4 w-full items-center">
            <Typography variant="small">Read time: 45min</Typography>
            <Typography variant="small">Category: Tech</Typography>
            <Typography variant="small" className="text-white flex gap-2 items-center">
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
              0
            </Typography>
          </div>
        </section>
        <section className="w-full md:max-w-[68rem] p-2">
          <Typography variant="paragraph">Comments here</Typography>
        </section>
        <section className="w-full md:max-w-[68rem] p-2">
          <Button variant="text" className="text-white flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            0
          </Button>
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
    </main>
  );
};

export default SingleBlog;
