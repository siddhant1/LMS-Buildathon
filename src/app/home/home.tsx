import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/scribble">scribble</Link>
      <Link to="/screenrec">screen rec</Link>
      <Link to="/webcam">webcam</Link>
    </>
  );
};

export default Home;
