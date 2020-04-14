import React, { useEffect, useContext, useRef } from "react";
import Context from "../../context/Context";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG, SAVE_BLOG } from "../../queries/blogQueries";
import { GET_COMMENTS } from "../../queries/commentQueries";
import BlogComments from "./Blog.Comments";
import BlogAddComment from "./Blog.AddComment";

const Blog = () => {
  const commentRef = useRef(null);
  const id = useParams().id;
  const history = useHistory();
  const { setNotification, meData } = useContext(Context);
  const [saveBlog, { error: saveBlogError }] = useMutation(SAVE_BLOG);
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
    refetch: blogRefetch,
  } = useQuery(GET_BLOG, {
    variables: { blogId: id },
  });
  const {
    data: commentData,
    error: commentError,
    loading: commentLoading,
  } = useQuery(GET_COMMENTS, {
    variables: { blogId: id },
  });
  useEffect(() => {
    blogRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let title;
  let category;
  let date;
  let author = { name: "" };
  let comments;
  let tags;
  let content;
  let img;

  if (!blogLoading && !blogError) {
    title = blogData.blogDetail.title;
    category = blogData.blogDetail.category;
    date = new Intl.DateTimeFormat("en-GB").format(blogData.blogDetail.date);
    author = blogData.blogDetail.author;
    comments = blogData.blogDetail.comments;
    tags = blogData.blogDetail.tags;
    content = blogData.blogDetail.content;
    img = blogData.blogDetail.img;
  }

  const handleLink = (link) => {
    history.push(link);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!meData.me) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to save blog",
      });
      return;
    }
    try {
      saveBlog({
        variables: {
          blogId: id,
        },
      });
      setNotification({
        type: "success",
        title: "ヽ(•‿•)ノ",
        message: "blog saved",
      });
    } catch (e) {
      console.log(saveBlogError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    commentRef.current.focus();
  };

  const handleTag = (e) => {
    e.preventDefault();
    console.log("tag");
    // TO DO
  };

  return (
    <section className="blog-section w100 h100">
      <div className="flex-col-center blog-wrapper">
        {blogLoading ? (
          <div className="loader-spinner">loading...</div>
        ) : (
          <>
            <div className="w100 blog-header-wrapper">
              <h2 className="blog-title">{title}</h2>
              <div className="m-auto blog-details">
                <span>
                  posted to:{" "}
                  <b
                    className="blog-details-link"
                    onClick={() => handleLink(`/${category}`)}
                  >
                    {category}
                  </b>{" "}
                  |{" "}
                </span>
                <span>
                  posted on: <b>{date}</b> |{" "}
                </span>
                <span>
                  with:{" "}
                  <b className="blog-details-link" onClick={handleAddComment}>
                    {comments.length}{" "}
                    {comments.length === 1 ? "comment" : "comments"}
                  </b>{" "}
                  |{" "}
                </span>
                <span>
                  {tags.length > 0 ? (
                    <>
                      tags:{" "}
                      {tags.map((t, i) => (
                        <b
                          key={i}
                          className="blog-details-link"
                          onClick={handleTag}
                        >
                          {t}
                          {i === tags.length - 1 ? "" : ", "}
                        </b>
                      ))}
                    </>
                  ) : null}
                </span>
              </div>
            </div>
            {img ? (
              <div className="w100 blog-body-image-wrapper">
                <img className="blog-body-image" alt="img" src={img} />
              </div>
            ) : null}
            <div className="blog-body-wrapper">
              <div className="blog-author-wrapper">
                <span
                  className="blog-author-name"
                  onClick={() => handleLink(`/user/${author._id}`)}
                >
                  {author.name}
                </span>
                <div className="blog-author-description">flogs contributor</div>
                <div className="flex-row blog-author-btn-wrapper">
                  <button onClick={handleSave} className="primary-btn">
                    save
                  </button>
                  <button onClick={handleAddComment} className="secondary-btn">
                    comment
                  </button>
                </div>
              </div>
              <div
                className="flex-3 flex-col blog-body-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="flex-1 blog-aside-wrapper">ASIDE</div>
            </div>
            <div className="blog-comments-wrapper">
              <BlogAddComment id={id} commentRef={commentRef} />
              <div className="blog-comments-header">
                <h2>comments</h2>
              </div>
              {commentLoading || commentError ? (
                <>
                  {commentLoading && (
                    <div className="loader-spinner">loading...</div>
                  )}
                  {commentError && <div>error loading comments...</div>}
                </>
              ) : (
                <BlogComments commentData={commentData} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
