import React from "react";
import { Burger } from "../styles/Nav.Mobile";

const NavBurger = ({ open, setOpen }) => {
  return (
    <div className="nav-burger-wrapper">
      <Burger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </Burger>
    </div>
  );
};

export default NavBurger;
