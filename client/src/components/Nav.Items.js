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
      message: "merch coming soon"
    });
  };

  return (
    <ul className={`nav-items-${viewType}`}>
      <li onClick={() => handleLink("/money")}>money</li>
      <li onClick={() => handleLink("/lifestyle")}>lifestyle</li>
      <li onClick={() => handleLink("/other-shit")}>other shit</li>
      <li onClick={handleClick}>merch</li>
      <li onClick={() => handleLink("/contact")}>contact</li>
    </ul>
  );
};

export default NavItems;
