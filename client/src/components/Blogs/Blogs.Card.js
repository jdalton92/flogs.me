import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";

const BlogCard = ({ blog }) => {
  const { setNotification } = useContext(Context);
  const { title, slug, category, date, author, comments, tags } = blog;
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  const handleClick = (category) => {
    if (history.location.pathname.toLowerCase().includes("blogs")) {
      handleLink(category);
    } else {
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: "already looking at that category",
      });
    }
  };

  const formatDate = new Intl.DateTimeFormat("en-GB").format(date);

  return (
    <div className="p20 flex-col box-shadow-on-hover blogcard-wrapper box-shadow-3">
      <div className="blogcard-header-wrapper">
        <h2
          onClick={() => handleLink(`/blog/${slug}`)}
          className="blogcard-title"
        >
          {title}
        </h2>
        <div className="blogcard-tags">
          {tags.length > 0 ? (
            <>
              tags:{" "}
              {tags.map((t, i) => (
                <b
                  key={i}
                  className="blogcard-link"
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
        </div>
      </div>
      <div className="blogcard-body">
        <div className="blogcard-info">
          <span>
            by:{" "}
            <b
              onClick={() => handleLink(`/user/${author._id}`)}
              className="blogcard-link"
            >
              {author.name}{" "}
            </b>
          </span>
          <span>
            on: <b>{formatDate}</b>
          </span>
        </div>
        <div className="blogcard-info">
          <span>
            posted to:{" "}
            <b onClick={() => handleClick(category)} className="blogcard-link">
              {category}
            </b>{" "}
          </span>
          <span>
            with:{" "}
            <b>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
