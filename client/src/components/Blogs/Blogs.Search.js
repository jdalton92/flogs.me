import React, { useState, useContext } from "react";
import Context from "../../context/Context";

const BlogsSearch = () => {
  const { setNotification, blogsSearch, blogsError } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      blogsSearch({ variables: { search } });
    } catch (e) {
      console.log(blogsError);
      setNotification({
        type: "fail",
        title: "¯\\_(ツ)_/¯",
        message: e.message,
      });
    }
  };

  return (
    <div className="blog-search-wrapper">
      <form className="w100 blog-search-form" onSubmit={handleSubmit}>
        <div className="w100 flex-row">
          <input
            className="w100 p5"
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
