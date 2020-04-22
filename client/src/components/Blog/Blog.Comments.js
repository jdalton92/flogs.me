import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BlogCommentLike from "./Blog.CommentLike";

const BlogComments = ({ commentData }) => {
  const history = useHistory();
  const [sort, setSort] = useState("newest");

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  const handleClick = (id) => {
    history.push(`/user/${id}`);
  };

  let sortedComments = [...commentData.commentDetail];

  switch (sort) {
    case "newest":
      sortedComments.sort((a, b) => b.date - a.date);
      break;
    case "oldest":
      sortedComments.sort((a, b) => a.date - b.date);
      break;
    case "likes":
      sortedComments.sort((a, b) => b.likes - a.likes);
      break;
    case "dislikes":
      sortedComments.sort((a, b) => b.dislikes - a.dislikes);
      break;
    default:
      sortedComments = [...commentData.commentDetail];
      break;
  }

  if (sortedComments.length === 0) {
    return <div>no comments...</div>;
  }
  return (
    <>
      <div className="blog-comments-sort">
        <select defaultValue="newest" onChange={handleSort}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="likes">most likes</option>
          <option value="dislikes">most dislikes</option>
        </select>
      </div>
      <div className="blog-comments-list-wrapper">
        {sortedComments.map((c) => (
          <div key={c._id} className="p10 blog-comment-wrapper">
            <div className="flex-col">
              <div className="flex-row blog-comment-header">
                <div className="blog-comment-title">{c.title}</div>
                <BlogCommentLike id={c._id} />
              </div>
              <div className="flex-row blog-comment-subheader">
                <div className="blog-comment-author">
                  by{" "}
                  <b
                    className="blog-comment-author-link"
                    onClick={() => handleClick(c.author._id)}
                  >
                    {c.author.name}
                  </b>{" "}
                  on <b>{new Intl.DateTimeFormat("en-GB").format(c.date)}</b>
                </div>
              </div>
            </div>
            <div className="blog-comment-detail">{c.comment}</div>
            <div className="blog-comment-likes">
              likes: <b>{c.likes}</b> | dislikes: <b>{c.dislikes}</b>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogComments;
