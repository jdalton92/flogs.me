import React from "react";
import { useHistory } from "react-router-dom";

const ToolsToTopButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/tools");
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
    <button onClick={handleClick} className="primary-btn tool-top-btn">
      top
      <i className="tool-arrow-up"></i>
    </button>
  );
};

export default ToolsToTopButton;
