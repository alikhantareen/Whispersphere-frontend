import React from "react";
import Navbar from "../Components/Navbar";
import Usersection from "../Components/Usersection";

const Profile = () => {

  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <Usersection />
      </section>
    </main>
  );
};

export default Profile;
