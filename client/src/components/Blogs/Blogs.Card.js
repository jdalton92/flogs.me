import React from "react";
import { useHistory } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, slug, category, date, author, comments, tags } = blog;
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  const formatDate = new Intl.DateTimeFormat("en-GB").format(date);

  return (
    <div
      onClick={() => handleLink(`blog/${slug}`)}
      className="p20 flex-col box-shadow-on-hover blogcard-wrapper"
    >
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
          <span>{formatDate}</span>
        </p>
        <p>
          <b>posted by: </b>
          <span>{author.name}</span>
        </p>
        <p>
          <b>tags: </b>
          <span>{tags.join(", ")}</span>
        </p>
        <p>
          <b>with: </b>
          <span>
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
