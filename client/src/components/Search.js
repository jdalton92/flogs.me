import React, { useState, useContext } from "react";
import Context from "../context/Context";

const Search = ({ topic }) => {
  const { setNotification } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "not working lol"
    });
  };

  return (
    <div className="blog-search-wrapper">
      <form className="w100 blog-search-form" onSubmit={handleSubmit}>
        <div className="w100 flex-row">
          <input
            className="w100 p5"
            name="search"
            placeholder="search for title or tags"
            type="text"
            onChange={e => setSearch(e.target.value)}
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

export default Search;
