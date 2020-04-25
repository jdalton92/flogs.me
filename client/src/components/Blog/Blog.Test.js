import React from "react";
import { Helmet } from "react-helmet";
import "../../styles/Blog.css";
import "../../styles/Blog.Content.css";

import { testBlog } from "../../utils/Blog.Test";

const Blog = () => {
  const { title, comments, category, tags, author, content, img } = testBlog;
  const date = Date.now();

  const handleLink = (link) => {
    return null;
  };

  const handleSave = async (e) => {
    return null;
  };

  const handleAddComment = (e) => {
    return null;
  };

  const handleTag = (tag) => {
    return null;
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
        <Helmet>
          <title>flogs.me: {title}</title>
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
          <aside className="flex-1 blog-aside-wrapper">
            <div>aside detail</div>
          </aside>
        </div>
        <div className="blog-comments-wrapper">No comments</div>
      </div>
    </section>
  );
};

export default Blog;
