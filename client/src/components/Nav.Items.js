import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../context/Context";

const NavItems = ({ viewType }) => {
  const { setNotification, setOpen } = useContext(Context);
  const history = useHistory();

  const handleLink = link => {
    setOpen(false);
    history.push(link);
  };

  const handleClick = e => {
    e.preventDefault();
    setOpen(false);
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "content coming soon"
    });
  };

  return (
    <ul className={`w100 nav-items-${viewType}`}>
      <li onClick={handleClick}>money</li>
      <li onClick={handleClick}>lifestyle</li>
      <li onClick={handleClick}>other shit</li>
      <li onClick={handleClick}>merch</li>
      <li onClick={() => handleLink("/contact")}>contact</li>
    </ul>
  );
};

export default NavItems;
