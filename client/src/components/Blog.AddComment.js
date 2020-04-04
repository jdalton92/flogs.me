import React, { useState } from "react";

const BlogAddComment = () => {
  const [variables, setVariables] = useState({});

  const formHandler = e => {
    setVariables({ ...variables, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="w100 blog-add-comment-wrapper">
      <form
        className="w100 flex-col blog-add-comment-form"
        onSubmit={handleSubmit}
      >
        <input
          onChange={formHandler}
          type="text"
          name="title"
          placeholder="title"
          maxLength={100}
          required
        />
        <textarea
          onChange={formHandler}
          type="text"
          name="comment"
          placeholder="comment"
          maxLength={500}
          required
        />
        <button className="primary-btn" type="submit">
          add comment
        </button>
      </form>
    </div>
  );
};

export default BlogAddComment;
