import React from "react";

const HomeList = ({ type }) => {
  return (
    <div className="home-list-wrapper box-shadow-on-hover">
      <h2>most {type} posts</h2>
    </div>
  );
};

export default HomeList;
