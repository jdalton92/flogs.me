import React from "react";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT, DISLIKE_COMMENT } from "../queries/commentQueries";
import like from "../styles/images/like.png";
import dislike from "../styles/images/dislike.png";

const BlogComments = ({ comments }) => {
  const [
    likeComment,
    { loading: likeLoading, error: likeError, data: likeData }
  ] = useMutation(LIKE_COMMENT);
  const [
    dislikeComment,
    { loading: dislikeLoading, error: dislikeError, data: dislikeData }
  ] = useMutation(DISLIKE_COMMENT);

  const handleLike = id => {
    likeComment(id);
  };

  const handleDislike = id => {
    dislikeComment(id);
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
                {likeLoading || dislikeLoading ? (
                  <div className="loader-spinner">loading...</div>
                ) : (
                  <>
                    <img
                      alt="like"
                      className="blog-comment-like"
                      onClick={() => handleLike(c._id)}
                      title="like"
                      src={like}
                    />
                    <img
                      alt="dislike"
                      className="blog-comment-dislike"
                      onClick={() => handleDislike(c._id)}
                      title="dislike"
                      src={dislike}
                    />
                  </>
                )}
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
