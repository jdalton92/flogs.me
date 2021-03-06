import React, { useEffect, useState, useContext, useRef } from "react";
import Context from "../../context/Context";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG, SAVE_BLOG } from "../../queries/blogQueries";
import { GET_COMMENTS } from "../../queries/commentQueries";
import ToTopBtn from "../ToTopBtn";
import CodeBlock from "./CodeBlock";
import BlogComments from "./Blog.Comments";
import BlogAddComment from "./Blog.AddComment";
import "../../styles/Blog.css";
import "../../styles/Blog.Content.css";

const Blog = () => {
  const commentRef = useRef(null);
  const slug = useParams().slug;
  const history = useHistory();
  const { setNotification, meData } = useContext(Context);
  const [viewButton, setViewButton] = useState(false);
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

  // Get new blog when slug changes
  useEffect(() => {
    blogRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Show "to top" btn when scroll past blog image
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setViewButton(true);
      } else {
        setViewButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Remove on clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewButton]);

  let title;
  let blogId;
  let category;
  let date;
  let author = { name: "" };
  let comments;
  let tags;
  let content;
  let img;
  let similarBlogs;

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
    similarBlogs = blogData.blogDetail.similarBlogs;
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
        message: "blog saved, view account summary for saved blog list",
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
      <div
        className={`${
          viewButton ? "show-btn" : "hide-btn"
        } blog-top-btn-wrapper`}
      >
        <ToTopBtn />
      </div>
      <div className="flex-col-center blog-wrapper">
        {blogLoading || blogError ? (
          <>
            {blogLoading && <div className="loader-spinner">loading...</div>}
            {blogError && (
              <div style={{ marginTop: "10px" }}>error loading blog...</div>
            )}
          </>
        ) : (
          <>
            <Helmet>
              <title>flogs.me | {title}</title>
            </Helmet>
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
                          onClick={() =>
                            handleLink({
                              pathname: "/blogs",
                              search: `?search=${t}`,
                            })
                          }
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
                <div className="blog-author-name">
                  by:{" "}
                  <span onClick={() => handleLink(`/user/${author._id}`)}>
                    {author.name}
                  </span>
                </div>
                <div className="blog-author-description">{authorType}</div>
                <div className="flex-row blog-author-btn-wrapper">
                  <button onClick={handleSave} className="primary-btn box-shadow-3">
                    save
                  </button>
                  <button onClick={handleAddComment} className="secondary-btn box-shadow-3">
                    comment
                  </button>
                </div>
              </div>
              <div className="flex-col blog-body-content">
                <ReactMarkdown
                  source={content}
                  escapeHtml={false}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
              <aside className="blog-aside-wrapper">
                <div className="blog-aside-detail">
                  <h2>if you like this, then check out:</h2>
                  {similarBlogs.length === 0 && (
                    <div style={{ marginTop: "10px" }}>
                      no recommendations...
                    </div>
                  )}
                  <ul className="blog-aside-ul-wrapper">
                    {similarBlogs.map((b, i) => (
                      <li key={i} className="blog-aside-li-wrapper">
                        <span className="blogcard-link">
                          <b onClick={() => handleLink(`/blog/${b.slug}`)}>
                            {b.title}
                          </b>
                        </span>
                        <div className="blog-aside-info">
                          <span>
                            by:{" "}
                            <b
                              onClick={() =>
                                handleLink(`/user/${b.author._id}`)
                              }
                              className="blogcard-link"
                            >
                              {author.name}{" "}
                            </b>
                          </span>
                          <span>
                            on:{" "}
                            <b>
                              {new Intl.DateTimeFormat("en-GB").format(b.date)}
                            </b>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
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
