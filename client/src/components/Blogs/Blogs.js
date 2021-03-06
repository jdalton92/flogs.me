import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";
import BlogsSearch from "./Blogs.Search";
import BlogsCard from "./Blogs.Card";
import "../../styles/Blogs.css";

const Blogs = ({ topic }) => {
  const { blogsSearch, blogsData, blogsLoading, blogsError } = useContext(
    Context
  );
  const history = useHistory();
  const [sort, setSort] = useState("newest");
  const search = history.location.search;
  const params = new URLSearchParams(search);

  //Update blogsData if category is clicked
  useEffect(() => {
    if (topic) {
      blogsSearch({ variables: { category: topic } });
    } else if (search) {
      blogsSearch({ variables: { search: params.get("search") } });
    } else {
      blogsSearch({ variables: { all: true } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, search]);

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  let sortedBlogs = [];
  if (!blogsLoading && !blogsError && blogsData !== undefined) {
    sortedBlogs = [...blogsData.allBlogs];
  }

  switch (sort) {
    case "newest":
      sortedBlogs.sort((a, b) => b.date - a.date);
      break;
    case "oldest":
      sortedBlogs.sort((a, b) => a.date - b.date);
      break;
    case "comments":
      sortedBlogs.sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      sortedBlogs = [];
      break;
  }

  return (
    <section className="blogs-section flex-row">
      <div className="flex-col m-auto blogs-wrapper">
        <BlogsSearch topic={{ topic }} />
        <div className="blogs-result-wrapper">
          {blogsLoading || blogsError || blogsData === undefined ? (
            <>
              {blogsLoading && <div className="loader-spinner">loading...</div>}
              {blogsError && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  error loading blog data...
                </div>
              )}
            </>
          ) : (
            <>
              {blogsData.allBlogs.length === 0 && (
                <div style={{ paddingTop: "25px" }}>no results...</div>
              )}
              {blogsData.allBlogs.length > 0 && (
                <>
                  <div className="blogs-sort">
                    <select className="box-shadow-3" defaultValue="newest" onChange={handleSort}>
                      <option value="newest">newest</option>
                      <option value="oldest">oldest</option>
                      <option value="comments">most comments</option>
                    </select>
                  </div>
                  <div className="blogcards-wrapper">
                    {sortedBlogs.map((b) => (
                      <BlogsCard key={b._id} blog={b} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
