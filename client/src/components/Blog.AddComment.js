import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../queries/commentQueries";

const BlogAddComment = ({ id }) => {
  const { setNotification, meData } = useContext(Context);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [addComment, { error: addCommentError }] = useMutation(ADD_COMMENT);

  const handleSubmit = e => {
    e.preventDefault();
    if (!meData.me) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to comment"
      });
      return;
    }
    try {
      addComment({
        variables: {
          blogId: id,
          title,
          comment
        }
      });
      setTitle("");
      setComment("");
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "comment added"
      });
    } catch (e) {
      console.log(addCommentError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message
      });
    }
  };

  return (
    <div className="w100 blog-add-comment-wrapper">
      <form
        className="w100 flex-col blog-add-comment-form"
        onSubmit={handleSubmit}
      >
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          name="title"
          placeholder="title"
          maxLength={100}
          required
        />
        <textarea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
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