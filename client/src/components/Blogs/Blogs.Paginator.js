import React, { useContext } from "react";
import Context from "../../context/Context";
import { getPaginateOptions } from "../../utils/helpers";

const BlogsPaginator = ({ currentPage, count, queryParams }) => {
  const { getBlogs } = useContext(Context);
  const setPage = (pageNumber) => {
    queryParams.page = pageNumber;
    getBlogs(queryParams);
  };

  const pageOptions = getPaginateOptions(currentPage, count);

  return (
    <div className="flex-row">
      <button
        disabled={currentPage === 1}
        type="button"
        className={`px-2 border-l border-t border-b text-base rounded-l-xl text-gray-600 bg-white ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onClick={() => setPage(1)}
      >
        {"<<"}
        {/* <Icon icon={"double-chevron-left"} className={"w-6 h-6"} /> */}
      </button>
      <button
        disabled={currentPage === 1}
        type="button"
        className={`px-2 border-l border-t border-b text-base text-gray-600 bg-white ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onClick={() => setPage(currentPage - 1)}
      >
        {"<"}
        {/* <Icon icon={"chevron-left"} className={"w-6 h-6"} /> */}
      </button>
      {pageOptions.map((page, index) => {
        return (
          <button
            key={index}
            type="button"
            disabled={!page.link}
            className={`px-4 bg-white border-l border-t border-b ${
              page.active
                ? "border bg-indigo-500 border-indigo-500 text-white font-semibold"
                : "text-gray-600"
            } ${
              page.link
                ? "hover:bg-gray-100 hover:text-gray-600"
                : "cursor-default"
            } ${pageOptions.length === index + 1 ? "border-r" : ""}`}
            onClick={() => setPage(page.label)}
          >
            {page.label}
          </button>
        );
      })}
      <button
        disabled={currentPage === count}
        type="button"
        className={`px-2 border-t border-r border-b  text-base text-gray-600 bg-white ${
          currentPage === count ? "cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onClick={() => setPage(currentPage + 1)}
      >
        {">"}
        {/* <Icon icon={"chevron-right"} className={"w-6 h-6"} /> */}
      </button>
      <button
        disabled={currentPage === count}
        type="button"
        className={`px-2 border-t border-r border-b text-base rounded-r-xl text-gray-600 bg-white ${
          currentPage === count ? "cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onClick={() => setPage(count)}
      >
        {">>"}
        {/* <Icon icon={"double-chevron-right"} className={"w-6 h-6"} /> */}
      </button>
    </div>
  );
};

export default BlogsPaginator;
