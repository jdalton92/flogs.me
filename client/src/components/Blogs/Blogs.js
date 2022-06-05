import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";
import BlogsSearch from "./Blogs.Search";
import Paginator from "../Paginator";
import BlogsCard from "./Blogs.Card";

const Blogs = ({ topic }) => {
  const {
    setSearch,
    searchBlogs,
    searchBlogsData,
    searchBlogsLoading,
    searchBlogsError,
    getBlogs,
    getBlogsData,
    getBlogsLoading,
    getBlogsError,
  } = useContext(Context);
  const history = useHistory();
  const [sort, setSort] = useState("-date");
  const search = history.location.search;
  const searchTerm = new URLSearchParams(search)?.get("search");
  let page = 0;
  let limit = 5;
  let queryParams = {
    variables: {
      sort,
      page,
      limit,
      category: topic,
      searchTerm: decodeURI(searchTerm),
    },
  };

  useEffect(() => {
    if (!search) {
      setSearch("");
    }
    fetchBlogs(page);
    // eslint-disable-next-line
  }, [topic, search, sort]);

  const fetchBlogs = (pageNumber) => {
    queryParams.variables.page = pageNumber;
    queryParams.variables.category = topic;
    queryParams.variables.sort = sort;
    if (search) {
      const encodedSearchTerm = new URLSearchParams(search).get("search");
      queryParams.variables.searchTerm = decodeURI(encodedSearchTerm);
      searchBlogs(queryParams);
    } else {
      getBlogs(queryParams);
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const loading = getBlogsLoading || searchBlogsLoading;
  const invalidState =
    getBlogsError ||
    searchBlogsError ||
    (getBlogsData === undefined && searchBlogsData === undefined);

  const blogs = search ? searchBlogsData?.searchBlogs : getBlogsData?.getBlogs;

  return (
    <section className="blogs-section flex-row">
      <div className="flex-col m-auto blogs-wrapper">
        <BlogsSearch />
        <div className="blogs-result-wrapper">
          {loading && <div className="loader-spinner">loading...</div>}
          {!loading && invalidState && (
            <div className="mt10 text-center">error loading blog data...</div>
          )}
          {!loading && !invalidState && (
            <>
              {blogs?.resultsCount === 0 && (
                <div className="pt25">no results...</div>
              )}
              {blogs?.resultsCount > 0 && (
                <>
                  <div className="blogs-sort flex-row justify-space-between align-start">
                    <select
                      className="box-shadow-3"
                      onChange={handleSort}
                      defaultValue={sort}
                    >
                      <option value="-date">newest</option>
                      <option value="date">oldest</option>
                    </select>
                    <Paginator
                      currentPage={blogs.currentPage}
                      pagesCount={blogs.pagesCount}
                      resultsCount={blogs.resultsCount}
                      limit={limit}
                      setPage={fetchBlogs}
                    />
                  </div>
                  <div className="blogcards-wrapper">
                    {blogs.results.map((b) => (
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
