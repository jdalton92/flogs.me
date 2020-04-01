import React from "react";
import { useHistory } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, category, date, author, comments, tags, body, _id } = blog;
  const history = useHistory();

  const handleLink = link => {
    history.push(link);
  };

  return (
    <div className="p20 flex-col box-shadow-on-hover blogcard-wrapper">
      <div className="blogcard-header-wrapper">
        <h2 className="blogcard-title">{title}</h2>
      </div>
      <div className="blogcard-details">
        <p>
          <b>posted to: </b>
          <span>{category}</span>
        </p>
        <p>
          <b>posted on: </b>
          <span>{date}</span>
        </p>
        <p>
          <b>posted by: </b>
          <span>{author}</span>
        </p>
        <p>
          <b>tags: </b>
          <span>{tags.join(", ")}</span>
        </p>
        <p>
          <b>with: </b>
          <span>
            {comments.length} {comments.length <= 1 ? "comment" : "comments"}
          </span>
        </p>
      </div>
      <div className="flex-row">
        <div
          className="blogcard-link"
          onClick={() => handleLink(`blog/${_id}`)}
        >
          view...
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
