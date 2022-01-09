import React, { useEffect, useContext } from "react";
import Context from "../../context/Context";
import { useHistory } from "react-router-dom";

const BlogsSearch = () => {
  const history = useHistory();
  const { search, setSearch } = useContext(Context);
  const locationSearch = history.location.search;

  useEffect(() => {
    const encodedSearchTerm = new URLSearchParams(locationSearch)?.get(
      "search"
    );
    if (encodedSearchTerm) {
      setSearch(decodeURI(encodedSearchTerm));
    } else {
      setSearch("");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    history.push({
      pathname: "/blogs",
      search: `?search=${encodeURI(search)}`,
    });
  };

  return (
    <div className="blog-search-wrapper">
      <form className="w100 blog-search-form" onSubmit={handleSubmit}>
        <div className="w100 flex-row">
          <input
            className="w100 p5 box-shadow-3"
            value={search}
            name="search"
            placeholder="search title, tags, or category"
            type="text"
            onChange={({ target }) => setSearch(target.value)}
            maxLength={50}
          ></input>
          <button
            className="primary-btn box-shadow-3"
            type="submit"
            disabled={!search}
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogsSearch;
