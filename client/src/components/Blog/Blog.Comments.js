import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import { useParams, useHistory } from "react-router-dom";
import BlogCommentLikeDelete from "./Blog.CommentLikeDelete";
import Paginator from "../Paginator";

const BlogComments = () => {
  const slug = useParams().slug;
  const history = useHistory();
  const { meData, getComments, commentsData, commentsLoading, commentsError } =
    useContext(Context);
  const [sort, setSort] = useState("-date");
  const [page, setPage] = useState(0);
  const limit = 5;
  let queryParams = {
    variables: {
      slug,
      sort,
      page,
      limit,
    },
  };
  useEffect(() => {
    fetchComments(page);
    // eslint-disable-next-line
  }, [slug, sort, page]);

  const fetchComments = (pageNumber) => {
    queryParams.variables.slug = slug;
    queryParams.variables.sort = sort;
    queryParams.variables.page = pageNumber;
    getComments(queryParams);
  };

  const isAuthor = (comment) => {
    return comment.author._id === meData.getMe?._id;
  };

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
    setPage(0);
    fetchComments(page);
  };

  const handleClick = (id) => {
    history.push(`/user/${id}`);
  };

  if (commentsLoading) {
    return <div className="loader-spinner">loading...</div>;
  }
  if (commentsError) {
    return (
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        error loading comments...
      </div>
    );
  }
  if (
    commentsData === undefined ||
    commentsData?.getComments.resultsCount === 0
  ) {
    return <div>no comments...</div>;
  }
  return (
    <>
      <div className="blog-comments-sort">
        <select
          className="box-shadow-3"
          onChange={handleSort}
          defaultValue={sort}
        >
          <option value="-date">newest</option>
          <option value="date">oldest</option>
        </select>
        <Paginator
          currentPage={commentsData.getComments.currentPage}
          pagesCount={commentsData.getComments.pagesCount}
          resultsCount={commentsData.getComments.resultsCount}
          limit={limit}
          setPage={fetchComments}
        />
      </div>
      <div className="blog-comments-list-wrapper">
        {commentsData.getComments.results.map((c) => (
          <div key={c._id} className="p10 blog-comment-wrapper">
            <div className="flex-col">
              <div className="flex-row blog-comment-header">
                <div className="blog-comment-title">{c.title}</div>
                <BlogCommentLikeDelete id={c._id} isAuthor={isAuthor(c)} />
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
