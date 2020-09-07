import React from "react";

const ToTopButton = () => {
  const handleClick = (e) => {
    e.preventDefault();
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <button onClick={handleClick} className="primary-btn tool-top-btn box-shadow-3">
      top
      <i className="tool-arrow-up"></i>
    </button>
  );
};

export default ToTopButton;
