import React from "react";
import BlogCommentLike from "./Blog.CommentLike";

const BlogComments = ({ comments }) => {
  return (
    <>
      <h2 className="blog-comments-header">comments</h2>
      {comments.length === 0 && <div>no comments...</div>}
      {comments.map(c => (
        <div key={c._id} className="p10 blog-comment-wrapper">
          <div className="flex-col">
            <div className="flex-row blog-comment-header">
              <div className="blog-comment-title">{c.title}</div>
              <BlogCommentLike id={c._id} />
            </div>
            <div className="flex-row blog-comment-subheader">
              <div className="blog-comment-author">
                by <b>{c.author.name}</b> on{" "}
                <b>{new Intl.DateTimeFormat("en-GB").format(c.date)}</b>
              </div>
            </div>
          </div>
          <div className="blog-comment-detail">{c.comment}</div>
          <div className="blog-comment-likes">
            likes: <b>{c.likes}</b> | dislikes: <b>{c.dislikes}</b>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogComments;
