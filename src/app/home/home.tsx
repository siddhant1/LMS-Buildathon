import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <img src="../../../assets/images/Capture.PNG" style={{width: '200vh', height:70}} alt=""/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 270
        }}
      >
        <Link to="/scribble" style={{ width: 100, height: 100, padding: 20 }}>
          <img
            src="../../../assets/images/Artboard – 2.png"
            alt=""
            style={{ width: 100, height: 100 }}
          />
        </Link>
        <Link to="/webcam" style={{ width: 100, height: 100, padding: 20 }}>
          <img
            src="../../../assets/images/Artboard – 1.png"
            alt=""
            style={{ width: 100, height: 100 }}
          />
        </Link>
        <Link to="/screenrec" style={{ width: 100, height: 100, padding: 20 }}>
          <img
            src="../../../assets/images/Artboard – 3.png"
            alt=""
            style={{ width: 100, height: 100 }}
          />
        </Link>
        <Link to="/scribble" style={{ width: 100, height: 100, padding: 20 }}>
          <img
            src="../../../assets/images/Artboard – 4.png"
            alt=""
            style={{ width: 100, height: 100 }}
          />
        </Link>
        <Link to="/scribble" style={{ width: 100, height: 100, padding: 20 }}>
          <img
            src="../../../assets/images/Artboard – 5.png"
            alt=""
            style={{ width: 100, height: 100 }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
