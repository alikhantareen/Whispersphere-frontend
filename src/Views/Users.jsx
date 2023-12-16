import React from "react";
import Usersection from "../Components/Usersection";
import Navbar from "../Components/Navbar";

const Users = () => {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <Usersection />
      </section>
    </main>
  );
};

export default Users;
