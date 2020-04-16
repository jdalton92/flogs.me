import React from "react";
import "../styles/FeaturedList.css";

const FeaturedList = ({ title }) => {
  return (
    <div className="featured-list-wrapper box-shadow-on-hover">
      <div className="featured-list-header">
        <h2>{title}</h2>
      </div>
      <div className="featured-list-body">body content</div>
    </div>
  );
};

export default FeaturedList;
