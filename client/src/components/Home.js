import React from "react";
import SignUp from "./SignUp";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="home-section">
      <div className="flex-col-center">
        <div className="loader-wrapper">
          <div className="loader-col">Loading...</div>
        </div>
        <div className="flex-row-center body-message">
          coming soon you fucks.
        </div>
        <SignUp />
      </div>
    </section>
  );
};

export default Home;
