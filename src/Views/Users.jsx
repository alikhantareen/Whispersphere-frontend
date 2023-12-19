import React from "react";
import UserSection from "../Components/UserSection";
import Navbar from "../Components/Navbar";

const Users = () => {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <UserSection />
      </section>
    </main>
  );
};

export default Users;
