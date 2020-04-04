import React from "react";
import BlogComments from "./Blog.Comments";
import { useParams } from "react-router-dom";

import { blogs } from "../utils/blogs";

const Blog = () => {
  const id = parseInt(useParams().id);

  const blog = blogs.filter(b => b._id === id);

  const {
    title,
    category,
    date,
    author,
    comments,
    tags,
    topic,
    content,
    img,
    _id
  } = blog[0];

  return (
    <section className="blog-section w100 h100">
      <div className="flex-col-center blog-wrapper">
        <div className="blog-header-wrapper">
          <h2 className="blog-title">{title}</h2>
          <div className="blog-details">
            posted to: <span>{category}</span> | posted on: <span>{date}</span>{" "}
            | posted by: <span>{author}</span> | with:{" "}
            <span>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
            <br />
            {tags.length > 0 ? (
              <>
                tags: <b>{tags.join(", ")}</b>{" "}
              </>
            ) : null}
          </div>
        </div>
        <div className="w80 blog-body-wrapper">
          <div className="blog-body-image">{img}</div>
          <div className="blog-body-content">{content}</div>
        </div>
        <BlogComments comments={comments} />
      </div>
    </section>
  );
};

export default Blog;
