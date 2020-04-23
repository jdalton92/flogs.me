import React, { useEffect, useContext, useRef } from "react";
import Context from "../../context/Context";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG, SAVE_BLOG } from "../../queries/blogQueries";
import { GET_COMMENTS } from "../../queries/commentQueries";
import BlogComments from "./Blog.Comments";
import BlogAddComment from "./Blog.AddComment";
import "../../styles/Blog.css";

const Blog = () => {
  const commentRef = useRef(null);
  const slug = useParams().slug;
  const history = useHistory();
  const { setNotification, meData } = useContext(Context);
  const [saveBlog, { error: saveBlogError }] = useMutation(SAVE_BLOG);
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
    refetch: blogRefetch,
  } = useQuery(GET_BLOG, {
    variables: { slug },
  });
  const {
    data: commentData,
    error: commentError,
    loading: commentLoading,
  } = useQuery(GET_COMMENTS, {
    variables: { slug },
  });
  useEffect(() => {
    blogRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  let title;
  let blogId;
  let category;
  let date;
  let author = { name: "" };
  let comments;
  let tags;
  let content;
  let img;

  if (!blogLoading && !blogError) {
    blogId = blogData.blogDetail._id;
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

  const handleSave = async (e) => {
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
      await saveBlog({
        variables: {
          blogId,
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

  const handleTag = (tag) => {
    try {
      handleLink(`/${tag}`);
    } catch (e) {
      console.log(e);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  let authorType = "flogs contributor";
  switch (author.userType) {
    case "standard":
      authorType = "flogs contributor";
      break;
    case "admin":
      authorType = "flogs admin";
      break;
    default:
      authorType = "flogs contributor";
      break;
  }

  return (
    <section className="blog-section w100 h100">
      <div className="flex-col-center blog-wrapper">
        {blogLoading || blogError ? (
          <>
            {blogLoading && <div className="loader-spinner">loading...</div>}
            {blogError && <div>error loading blog...</div>}
          </>
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
                <div className="blog-author-description">{authorType}</div>
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
              <aside className="flex-1 blog-aside-wrapper">ASIDE</aside>
            </div>
            <div className="blog-comments-wrapper">
              <BlogAddComment id={blogId} commentRef={commentRef} />
              <div className="blog-comments-header">
                <h2>comments</h2>
              </div>
              {commentLoading || commentError ? (
                <>
                  {commentLoading && (
                    <div className="loader-spinner">loading...</div>
                  )}
                  {commentError && (
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      error loading comments...
                    </div>
                  )}
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
