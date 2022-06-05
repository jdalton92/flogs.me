import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Context from "../../context/Context";
import {
  GET_COMMENTS,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  DELETE_COMMENT,
} from "../../queries/commentQueries";
import like from "../../styles/images/like.png";
import dislike from "../../styles/images/dislike.png";
import deleteImage from "../../styles/images/delete.png";

const BlogCommentLikeDelete = ({ id, isAuthor }) => {
  const slug = useParams().slug;
  const { setNotification, meData } = useContext(Context);
  const [deleteComment, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_COMMENT);
  const [likeComment, { loading: likeLoading, error: likeError }] =
    useMutation(LIKE_COMMENT);
  const [dislikeComment, { loading: dislikeLoading, error: dislikeError }] =
    useMutation(DISLIKE_COMMENT);

  const refetchQueries = [
    {
      query: GET_COMMENTS,
      variables: {
        slug,
        sort: "-date",
        page: 0,
        limit: 5,
      },
    },
  ];

  const handleDelete = (id) => {
    if (!meData.getMe) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to delete",
      });
      return;
    }
    try {
      deleteComment({
        variables: {
          commentId: id,
        },
        refetchQueries,
        awaitRefetchQueries: true,
      });
    } catch (e) {
      console.log(e);
      console.log(deleteError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const handleLike = (id) => {
    if (!meData.getMe) {
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
        refetchQueries,
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
    if (!meData.getMe) {
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
        refetchQueries,
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
      {deleteLoading || likeLoading || dislikeLoading ? (
        <div className="loader-spinner blog-comment-loader">loading...</div>
      ) : (
        <>
          {isAuthor && (
            <img
              alt="delete"
              className="blog-comment-delete"
              onClick={() => handleDelete(id)}
              title="delete"
              src={deleteImage}
            />
          )}
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

export default BlogCommentLikeDelete;
