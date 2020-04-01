import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import NavItems from "./Nav.Items";
import NavBurger from "./Nav.Burger";
import { Menu } from "../styles/Nav.Mobile";
import Context from "../context/Context";
import "../styles/Nav.css";

const Nav = () => {
  const { open, setNotification } = useContext(Context);
  const history = useHistory();

  const handleLink = link => {
    history.push(link);
  };

  const handleLogin = e => {
    e.preventDefault();
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "coming soon"
    });
  };

  const handleSignUp = e => {
    e.preventDefault();
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "coming soon"
    });
  };

  return (
    <nav className="flex-col-center">
      <div className="w100 logo-wrapper flex-row-center">
        <h1 title="flogs.me" onClick={() => handleLink("/")}>
          flogs.me
        </h1>
        <div className="flex-row login-wrapper">
          <button className="primary-btn login-btn" onClick={handleLogin}>
            login
          </button>
          <button className="secondary-btn signup-btn" onClick={handleSignUp}>
            sign up
          </button>
        </div>
      </div>
      <div className="flex-row-center nav-items-wrapper">
        <NavBurger />
        <Menu open={open}>
          <div className="flex-row-center">
            <NavBurger />
          </div>
          <NavItems viewType={"mobile"} />
        </Menu>
        <ul className="w100 flex-row-center nav-items">
          <NavItems viewType={"desktop"} />
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
