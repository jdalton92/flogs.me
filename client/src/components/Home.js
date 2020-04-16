import React from "react";
import unhappy from "../styles/images/unhappy-stick-figure.png";
import happy from "../styles/images/happy-stick-figure.png";
import FeaturedList from "./FeaturedList.js";
import { Divider } from "../styles/StyledComponents";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="w100 h100 home-section">
      <div className="w100 home-description-wrapper">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h1>
      </div>
      <Divider width={"80%"} />
      <div className="featured-lists-wrapper">
        <FeaturedList title={"featured blogs"} />
        <FeaturedList title={"most commented blogs"} />
        <FeaturedList title={"most recent blogs"} />
      </div>
      <div className="h100 home-img-wrapper">
        <div className="h100 home-img-left">
          <h2>you before flogs.me</h2>
          <img alt="unhappy" src={unhappy} className="home-img-unhappy" />
        </div>
        <div className="h100 home-img-right">
          <h2>you after flogs.me</h2>
          <img alt="unhappy" src={happy} className="home-img-happy" />
        </div>
      </div>
      <div className="flex-row-center w100 home-caption-wrapper">
        <h2 className="w100 home-caption">sign up now.</h2>
      </div>
    </section>
  );
};

export default Home;
