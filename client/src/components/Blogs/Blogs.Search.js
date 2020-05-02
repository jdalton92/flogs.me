import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const BlogsSearch = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({ pathname: "/blogs", search: `?search=${search}` });
    setSearch("");
  };

  return (
    <div className="blog-search-wrapper">
      <form className="w100 blog-search-form" onSubmit={handleSubmit}>
        <div className="w100 flex-row">
          <input
            className="w100 p5"
            value={search}
            name="search"
            placeholder="search title, tags, or category"
            type="text"
            onChange={({ target }) => setSearch(target.value)}
            maxLength={50}
            required
          ></input>
          <button className="primary-btn" type="submit">
            search
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogsSearch;
