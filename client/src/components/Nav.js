import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavItems from "./Nav.Items";
import NavBurger from "./Nav.Burger";
import { Menu } from "../styles/Nav.Mobile";
import "../styles/Nav.css";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleLink = link => {
    history.push(link);
  };

  return (
    <nav className="flex-col-center">
      <div className="w100 logo-wrapper flex-row-center">
        <h1 title="flogs.me" onClick={() => handleLink("/")}>
          flogs.me
        </h1>
      </div>
      <div className="flex-row-center nav-items-wrapper">
        <NavBurger open={open} setOpen={setOpen} />
        <Menu open={open}>
          <div className="flex-row-center">
            <NavBurger open={open} setOpen={setOpen} />
          </div>
          <NavItems viewType={"mobile"} />
        </Menu>
        <ul className="w100 nav-items">
          <NavItems viewType={"desktop"} />
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
