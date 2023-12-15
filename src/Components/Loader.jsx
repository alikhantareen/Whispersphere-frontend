import React from "react";

const Loader = () => {
  return (
    <main className="flex flex-col gap-4 p-4 justify-center items-center">
      <div className="spinner-wave">
        <div className="spinner-wave-dot spinner-success"></div>
        <div className="spinner-wave-dot spinner-success"></div>
        <div className="spinner-wave-dot spinner-success"></div>
        <div className="spinner-wave-dot spinner-success"></div>
      </div>
    </main>
  );
};

export default Loader;
