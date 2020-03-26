import React from "react";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <section className="nav flex-col-center">
      <div className="logo-wrapper flex-row-center">
        <h1>flogs.me</h1>
      </div>
      <div className="nav-items-wrapper">
        <ul className="w100 nav-items">
          <li>personal finance</li>
          <li>fitness</li>
          <li>merch</li>
          <li>other shit</li>
          <li>contact</li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
