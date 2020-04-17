import React from "react";
import { Divider } from "../styles/StyledComponents";
import "../styles/FeaturedList.css";

const FeaturedList = ({ title, dataObject, loading, error }) => {
  const Body = ({ data }) => {
    if (Object.keys(dataObject)[0].toLowerCase().includes("blog")) {
      return (
        <>
          {data.map((d, i) => (
            <div key={i}>
              <Divider width={"75%"} />
              <div>title: {d.title}</div>
              <div>date: {new Intl.DateTimeFormat("en-GB").format(d.date)}</div>
              <div>category: {d.category}</div>
              <div>comments: {d.comments.length}</div>
              <div>author: {d.author.name}</div>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {data.map((d, i) => (
            <div key={i}>
              <div>title: {d.title}</div>
              <div>date: {new Intl.DateTimeFormat("en-GB").format(d.date)}</div>
              <div>likes: {d.likes}</div>
              <div>dislikes: {d.dislikes}</div>
              <div>author: {d.author.name}</div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="featured-list-wrapper box-shadow-on-hover">
      <div className="featured-list-header">
        <h2>{title}</h2>
      </div>
      <div className="featured-list-body">
        {loading || error || dataObject === undefined ? (
          <>
            {loading && <div className="loader-spinner">loading...</div>}
            {error && <div>error loading data...</div>}
          </>
        ) : (
          <>
            <Body data={Object.values(dataObject)[0]} />
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedList;
