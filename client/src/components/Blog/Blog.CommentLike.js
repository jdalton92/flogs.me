import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Context from "../../context/Context";
import {
  GET_COMMENTS,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
} from "../../queries/commentQueries";
import like from "../../styles/images/like.png";
import dislike from "../../styles/images/dislike.png";

const BlogCommentLike = ({ id }) => {
  const slug = useParams().slug;
  const { setNotification, meData } = useContext(Context);
  const [likeComment, { loading: likeLoading, error: likeError }] = useMutation(
    LIKE_COMMENT
  );
  const [
    dislikeComment,
    { loading: dislikeLoading, error: dislikeError },
  ] = useMutation(DISLIKE_COMMENT);

  const handleLike = (id) => {
    if (!meData.me) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to like",
      });
      return;
    }
    try {
      likeComment({
        variables: {
          commentId: id,
        },
        refetchQueries: [
          {
            query: GET_COMMENTS,
            variables: { slug },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
      console.log(likeError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const handleDislike = (id) => {
    if (!meData.me) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to dislike",
      });
      return;
    }
    try {
      dislikeComment({
        variables: {
          commentId: id,
        },
        refetchQueries: [
          {
            query: GET_COMMENTS,
            variables: { slug },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
      console.log(dislikeError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  return (
    <div className="blog-like-wrapper">
      {likeLoading || dislikeLoading ? (
        <div className="loader-spinner blog-comment-loader">loading...</div>
      ) : (
        <>
          <img
            alt="like"
            className="blog-comment-like"
            onClick={() => handleLike(id)}
            title="like"
            src={like}
          />
          <img
            alt="dislike"
            className="blog-comment-dislike"
            onClick={() => handleDislike(id)}
            title="dislike"
            src={dislike}
          />
        </>
      )}
    </div>
  );
};

export default BlogCommentLike;
