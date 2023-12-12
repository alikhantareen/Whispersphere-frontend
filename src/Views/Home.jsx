import React from "react";
import Navbar from "../Components/Navbar";
import BlogsSection from "../Components/Blogs-section";

const Home = () => {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col justify-start items-center gap-4 w-full md:max-w-[68rem]">
        <BlogsSection title="Recent blogs" />
        <BlogsSection title="All blogs" />
      </section>
    </main>
  );
};

export default Home;
