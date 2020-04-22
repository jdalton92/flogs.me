import React from "react";
import { useHistory } from "react-router-dom";
import { Divider } from "../styles/StyledComponents";
import "../styles/FeaturedList.css";

const FeaturedList = ({ title, dataObject, loading, error }) => {
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  const Body = ({ data }) => {
    if (data.length === 0) {
      return <div>No data</div>;
    } else if (Object.keys(dataObject)[0].toLowerCase().includes("blog")) {
      return (
        <>
          {data.map((d, i) => (
            <div key={i} className="featured-list-item">
              <Divider width={"75%"} />
              <div className="featured-list-title">
                <h2
                  className="featured-list-link"
                  onClick={() => handleLink(`/blog/${d.slug}`)}
                >
                  {d.title}
                </h2>
              </div>
              <div className="featured-list-info">
                <span>
                  by:{" "}
                  <b
                    className="featured-list-link"
                    onClick={() => handleLink(`/user/${d.author._id}`)}
                  >
                    {d.author.name}
                  </b>{" "}
                </span>
                <span>
                  on: <b>{new Intl.DateTimeFormat("en-GB").format(d.date)}</b>
                </span>
              </div>
              <div className="featured-list-info">
                <span>
                  posted to:{" "}
                  <b
                    className="featured-list-link"
                    onClick={() => handleLink(`/${d.category}`)}
                  >
                    {d.category}
                  </b>
                </span>{" "}
                <span>
                  with:{" "}
                  <b>
                    {d.comments.length}{" "}
                    {d.comments.length === 1 ? "comment" : "comments"}
                  </b>
                </span>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {data.map((d, i) => (
            <div key={i} className="featured-list-item">
              <Divider width={"75%"} />
              <div className="featured-list-title">
                <h2
                  className="featured-list-link"
                  onClick={() => handleLink(`/blog/${d.blog.slug}`)}
                >
                  {d.title}
                </h2>
              </div>
              <div className="featured-list-info">
                <span>
                  blog:{" "}
                  <b
                    className="featured-list-link"
                    onClick={() => handleLink(`/blog/${d.blog.slug}`)}
                  >
                    {d.blog.title}{" "}
                  </b>
                </span>
                <span>
                  on: <b>{new Intl.DateTimeFormat("en-GB").format(d.date)}</b>
                </span>
              </div>
              <div className="featured-list-info">
                <span>
                  likes: <b>{d.likes}</b>{" "}
                </span>
                <span>
                  dislikes: <b>{d.dislikes}</b>
                </span>
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="featured-list-wrapper box-shadow-on-hover">
      <div className="featured-list-header">
        <h2>
          <u>{title}</u>
        </h2>
      </div>
      <div className="featured-list-body">
        {loading || error || dataObject === undefined ? (
          <>
            {loading && <div className="loader-spinner">loading...</div>}
            {error && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                error loading data...
              </div>
            )}
          </>
        ) : (
          <>
            <Body data={Object.values(dataObject)[0]} />
          </>
        )}
        <Divider width={"75%"} />
      </div>
    </div>
  );
};

export default FeaturedList;
