import React from "react";
import Navbar from "../Components/Navbar";
import UserSection from "../Components/UserSection";

const Profile = () => {

  return (
    <main>
      <Navbar />
      <section className="flex flex-col gap-8 p-4 justify-center items-center mt-4">
        <UserSection />
      </section>
    </main>
  );
};

export default Profile;
