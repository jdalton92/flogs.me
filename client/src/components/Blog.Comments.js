import React from "react";
import like from "../styles/images/like.png";
import dislike from "../styles/images/dislike.png";

const BlogComments = ({ comments }) => {
  const handleLike = e => {
    e.preventDefault();
    console.log("like");
  };

  const handleDislike = e => {
    e.preventDefault();
    console.log("dislike");
  };

  return (
    <div className="w100 blog-comments-wrapper">
      <h2 className="blog-comments-header">comments</h2>
      {comments.map(c => (
        <div key={c._id} className="p10 blog-comment-wrapper">
          <div className="flex-col">
            <div className="flex-row blog-comment-header">
              <div className="blog-comment-title">{c.title}</div>
              <div className="blog-like-wrapper">
                <img
                  alt="like"
                  className="blog-comment-like"
                  onClick={handleLike}
                  title="like"
                  src={like}
                />
                <img
                  alt="dislike"
                  className="blog-comment-dislike"
                  onClick={handleDislike}
                  title="dislike"
                  src={dislike}
                />
              </div>
            </div>
            <div className="flex-row blog-comment-subheader">
              <div className="blog-comment-author">
                by <b>{c.author}</b> on <b>{c.date}</b>
              </div>
            </div>
          </div>
          <div className="blog-comment-detail">{c.comment}</div>
          <div className="blog-comment-likes">
            likes: <b>{c.likes}</b>
            <br />
            dislikes: <b>{c.dislikes}</b>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogComments;
