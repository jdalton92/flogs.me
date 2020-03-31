import React from "react";

const BlogComments = ({ comments }) => {
  return (
    <div className="blog-comments-wrapper">
      <div className="blog-comments-header">comments</div>
      {comments.map(c => (
        <div key={c._id} className="blog-comments-body-wrapper">
          <div className="flex-row">
            <div className="blog-comment-title">{c.title} </div>
            <div className="blog-comment-author"> by {c.author} </div>
            <div className="blog-comment-date"> on {c.date}</div>
          </div>
          <div className="blog-comment-comment">{c.comment}</div>
          <div className="blog-comment-likes">likes: {c.likes}</div>
          <div className="blog-comment-dislikes">dislikes: {c.dislikes}</div>
        </div>
      ))}
    </div>
  );
};

export default BlogComments;
