import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/Context";

const NavItems = ({ viewType }) => {
  const { setOpen } = useContext(Context);
  const history = useHistory();

  const handleLink = (link) => {
    setOpen(false);
    history.push(link);
  };

  return (
    <ul className={`nav-items-${viewType}`}>
      <li onClick={() => handleLink("/money")}>money</li>
      <li onClick={() => handleLink("/lifestyle")}>lifestyle</li>
      <li onClick={() => handleLink("/technology")}>technology</li>
      <li onClick={() => handleLink("/tools")}>tools</li>
      <li onClick={() => handleLink("/faq")}>faq</li>
      <li onClick={() => handleLink("/contact")}>contact</li>
    </ul>
  );
};

export default NavItems;
