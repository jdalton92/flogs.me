import React, { useState } from "react";
import NavItems from "./Nav.Items";
import NavBurger from "./Nav.Burger";
import { Menu } from "../styles/Nav.Mobile";
import "../styles/Nav.css";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="nav flex-col-center">
      <div className="logo-wrapper flex-row-center">
        <h1>flogs.me</h1>
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
    </section>
  );
};

export default Nav;
