import React, { useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import { v4 as uuid } from "uuid";

const NavItems = ({ viewType }) => {
  const { setNotification } = useContext(NotificationContext);

  const handleClick = e => {
    e.preventDefault();
    setNotification({
      id: uuid(),
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "content coming soon"
    });
  };

  return (
    <ul className={`w100 nav-items-${viewType}`}>
      <li onClick={handleClick}>personal finance</li>
      <li onClick={handleClick}>lifestyle</li>
      <li onClick={handleClick}>other shit</li>
      <li onClick={handleClick}>merch</li>
      <li onClick={handleClick}>contact</li>
    </ul>
  );
};

export default NavItems;
