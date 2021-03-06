import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import NavItems from "./Nav.Items";
import NavBurger from "./Nav.Burger";
import NavLogin from "./Nav.Login";
import NavLanding from "./Nav.Landing";
import NavSignUp from "./Nav.SignUp";
import { Menu } from "../../styles/StyledComponents";
import Context from "../../context/Context";
import "../../styles/Nav.css";

const Nav = () => {
  const { open, loginView, meData } = useContext(Context);
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  return (
    <nav className="flex-col-center">
      <div className="w100 logo-wrapper flex-row">
        <h1 title="flogs.me" onClick={() => handleLink("/")}>
          flogs.me
        </h1>
        <div
          className={`login-wrapper ${
            meData !== undefined && meData.me ? "login-wrapper-loggedin" : ""
          }`}
        >
          {loginView === "landing" && <NavLanding />}
          {loginView === "signUp" && <NavSignUp />}
          {loginView === "login" && <NavLogin />}
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
        <div onClick={() => handleLink("/blogs")} className="nav-search-icon" />
      </div>
    </nav>
  );
};

export default Nav;
