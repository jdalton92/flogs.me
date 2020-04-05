import React from "react";
import unhappy from "../styles/images/unhappy-stick-figure.png";
import happy from "../styles/images/happy-stick-figure.png";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="w100 h100 home-section">
      <div className="h100 home-content-wrapper">
        <div className="w50 h100 home-content-left">
          <h2>you before flogs...</h2>
          <img alt="unhappy" src={unhappy} className="home-img-unhappy" />
        </div>
        <div className="w50 h100 home-content-right">
          <h2>you after flogs...</h2>
          <img alt="unhappy" src={happy} className="home-img-happy" />
        </div>
      </div>
      <div className="flex-row-center w100 home-caption">
        <h2 className="w100">flog on</h2>
      </div>
    </section>
  );
};

export default Home;
