import React from "react";
import BlogComments from "./Blog.Comments";
import { useParams } from "react-router-dom";

import { blog } from "../utils/sampleBlogs";

const Blog = () => {
  const id = useParams().id;
  console.log(id);

  const {
    title,
    category,
    date,
    author,
    comments,
    tags,
    topic,
    body,
    _id
  } = blog;

  return (
    <section className="blog-section w100 h100">
      <div className="flex-col-center blog-wrapper">
        <div className="blog-header-wrapper">
          <h2 className="blog-title">{title}</h2>
          <div className="blog-details">
            posted to: <span>{category}</span> | posted on: <span>{date}</span>{" "}
            | posted by: <span>{author}</span> | with:{" "}
            <span>
              {comments.length} {comments.length <= 1 ? "comment" : "comments"}
            </span>
          </div>
        </div>
        <div className="blog-body-wrapper">
          <div className="blog-body-image">{body.image}</div>
          <div className="blog-body-content">{body.content}</div>
        </div>
        <BlogComments comments={comments} />
      </div>
    </section>
  );
};

export default Blog;
