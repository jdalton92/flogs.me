import React, { useContext } from "react";
import Context from "../../context/Context";
import { getPaginateOptions } from "../../utils/helpers";

const BlogsPaginator = ({ blogs, queryParams }) => {
  const { currentPage, pagesCount, resultsCount } = blogs;
  const { getBlogs, searchBlogs } = useContext(Context);
  const setPage = (pageNumber) => {
    queryParams.variables.page = pageNumber;
    if (queryParams.variables.searchTerm) {
      searchBlogs(queryParams);
    } else {
      getBlogs(queryParams);
    }
  };

  const pageOptions = getPaginateOptions(currentPage, pagesCount);

  const resultsText = () => {
    const limit = queryParams.variables.limit;
    const startIndex = (currentPage - 1) * limit + 1;
    const endIndex = Math.min(resultsCount, currentPage * limit);
    return `${startIndex} - ${endIndex} of ${resultsCount}`;
  };

  return (
    <div className="paginator">
      <div className="paginator-text flex-row-center">{resultsText()}</div>
      <div className="flex-row">
        <button
          disabled={currentPage === 1}
          type="button"
          className="secondary-btn box-shadow-3 pr5 pl5"
          onClick={() => setPage(1)}
        >
          {"<<"}
        </button>
        <button
          disabled={currentPage === 1}
          type="button"
          className="secondary-btn box-shadow-3 pr5 pl5"
          onClick={() => setPage(currentPage - 1)}
        >
          {"<"}
        </button>
        {pageOptions.map((page, index) => {
          return (
            <button
              key={index}
              type="button"
              disabled={!page.link}
              className="secondary-btn box-shadow-3 pr5 pl5"
              onClick={() => setPage(page.label)}
            >
              {page.label}
            </button>
          );
        })}
        <button
          disabled={currentPage === pagesCount}
          type="button"
          className="secondary-btn box-shadow-3 pr5 pl5"
          onClick={() => setPage(currentPage + 1)}
        >
          {">"}
        </button>
        <button
          disabled={currentPage === pagesCount}
          type="button"
          className="secondary-btn box-shadow-3 pr5 pl5"
          onClick={() => setPage(pagesCount)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default BlogsPaginator;
