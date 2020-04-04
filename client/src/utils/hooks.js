import React, { useRef, useEffect, useContext } from "react";
import Context from "../context/Context";

const useOutsideAlerter = ref => {
  const { dropdown, setDropdown } = useContext(Context);
  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target) && dropdown) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export const OutsideAlerter = props => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};
