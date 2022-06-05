import React, { useEffect, useState, useContext, useRef } from "react";
import Context from "../../context/Context";
import { useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG, FAVORITE_BLOG } from "../../queries/blogQueries";
import ToTopBtn from "../ToTopBtn";
import CodeBlock from "./CodeBlock";
import BlogComments from "./Blog.Comments";
import BlogAddComment from "./Blog.AddComment";

const Blog = () => {
  const commentRef = useRef(null);
  const slug = useParams().slug;
  const history = useHistory();
  const { setNotification, meData, setBlog } = useContext(Context);
  const [viewButton, setViewButton] = useState(false);
  const [favoriteBlog, { error: favoriteBlogError }] =
    useMutation(FAVORITE_BLOG);
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
    refetch: blogRefetch,
  } = useQuery(GET_BLOG, {
    variables: { slug },
    onCompleted: (blog) => {
      setBlog(blog);
    },
  });

  useEffect(() => {
    blogRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setViewButton(true);
      } else {
        setViewButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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
    blogId = blogData.getBlog._id;
    title = blogData.getBlog.title;
    category = blogData.getBlog.category;
    date = new Intl.DateTimeFormat("en-GB").format(blogData.getBlog.date);
    author = blogData.getBlog.author;
    comments = blogData.getBlog.comments;
    tags = blogData.getBlog.tags;
    content = blogData.getBlog.content;
    img = blogData.getBlog.img;
    similarBlogs = blogData.getBlog.similarBlogs;
  }

  const handleLink = (link) => {
    history.push(link);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!meData.getMe) {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "log in to save blog",
      });
      return;
    }
    try {
      await favoriteBlog({
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
      console.log(favoriteBlogError);
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
            {blogError && <div className="mt10">error loading blog...</div>}
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
                  <button
                    onClick={handleSave}
                    className="primary-btn box-shadow-3"
                  >
                    save
                  </button>
                  <button
                    onClick={handleAddComment}
                    className="secondary-btn box-shadow-3"
                  >
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
              <BlogComments />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
