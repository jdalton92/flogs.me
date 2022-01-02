export const getPaginateOptions = (currentPage, totalPages, viewPages = 3) => {
  let startPage;
  let endPage;

  if (totalPages <= viewPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(viewPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(viewPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = viewPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - viewPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => ({
    label: startPage + i,
    active: currentPage === startPage + i,
    link: true,
  }));
  if (pages.some((page) => page.label === totalPages)) {
    return pages;
  } else {
    return pages.concat(
      {
        label: "...",
        active: false,
        link: false,
      },
      {
        label: totalPages,
        active: false,
        link: true,
      }
    );
  }
};
