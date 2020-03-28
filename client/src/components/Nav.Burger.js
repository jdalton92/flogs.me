import React, { useContext } from "react";
import Context from "../context/Context";
import { Burger } from "../styles/Nav.Mobile";

const NavBurger = () => {
  const { open, setOpen } = useContext(Context);
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
