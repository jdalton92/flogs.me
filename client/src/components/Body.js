import React from "react";
import "../styles/Body.css";

const Body = () => {
  return (
    <section className="body">
      <div className="flex-col-center">
        <div className="flex-row-center body-message">
          coming soon you fucks.
        </div>
        <div className="loader-wrapper">
          <div className="loader">Loading...</div>
        </div>
      </div>
    </section>
  );
};

export default Body;
