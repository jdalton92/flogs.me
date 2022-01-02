import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";
import BlogsSearch from "./Blogs.Search";
import BlogsPaginator from "./Blogs.Paginator";
import BlogsCard from "./Blogs.Card";

const Blogs = ({ topic }) => {
  const {
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
  let page = 0;
  let limit = 10;
  let queryParams = {
    variables: {
      sort,
      page,
      limit,
    },
  };

  useEffect(() => {
    if (topic) {
      queryParams.variables.category = topic;
      getBlogs(queryParams);
    } else if (search) {
      const params = new URLSearchParams(search);
      queryParams.variables.searchTerm = params.get("search");
      searchBlogs(queryParams);
    } else {
      getBlogs(queryParams);
    }
    // eslint-disable-next-line
  }, [topic, search, sort]);

  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  const loading = getBlogsLoading || searchBlogsLoading;
  const invalidState =
    getBlogsError ||
    searchBlogsError ||
    (getBlogsData === undefined && searchBlogsData === undefined);

  const blogs = () => {
    return search ? searchBlogsData?.searchBlogs : getBlogsData?.getBlogs;
  };

  return (
    <section className="blogs-section flex-row">
      <div className="flex-col m-auto blogs-wrapper">
        <BlogsSearch />
        <div className="blogs-result-wrapper">
          {loading && <div className="loader-spinner">loading...</div>}
          {invalidState && (
            <div className="mt10 text-center">error loading blog data...</div>
          )}
          {!loading && !invalidState && (
            <>
              {blogs()?.resultsCount === 0 && (
                <div className="pt25">no results...</div>
              )}
              {blogs()?.resultsCount > 0 && (
                <>
                  <div className="blogs-sort flex-row-between">
                    <select className="box-shadow-3" onChange={handleSort}>
                      <option value="-date">newest</option>
                      <option value="date">oldest</option>
                    </select>
                    <BlogsPaginator
                      page={blogs().currentPage}
                      count={blogs().resultsCount}
                      queryParams={queryParams}
                    />
                  </div>
                  <div className="blogcards-wrapper">
                    {blogs().results.map((b) => (
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
