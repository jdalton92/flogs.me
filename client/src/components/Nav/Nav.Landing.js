import React, { useContext } from "react";
import { OutsideAlerter } from "../../utils/hooks";
import Context from "../../context/Context";

const NavLanding = () => {
  const {
    setNotification,
    setToken,
    dropdown,
    setDropdown,
    setLoginView,
    meData,
    meLoading,
    loginLoading,
    meRefetch
  } = useContext(Context);

  const handleClick = e => {
    e.preventDefault();
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "coming soon"
    });
  };

  const handleDropdown = e => {
    e.preventDefault();
    setDropdown(!dropdown);
  };

  const handleLogout = e => {
    e.preventDefault();
    setToken("");
    localStorage.removeItem("flogsToken");
    meRefetch();
    setDropdown(false);
    setLoginView("landing");
  };

  if (meLoading || loginLoading) {
    return (
      <div className="login-wrapper loading-wrapper">
        <div className="loader-spinner">loading...</div>
      </div>
    );
  }

  return (
    <>
      {meData !== undefined && meData.me ? (
        <div className="h100 nav-user-wrapper">
          <OutsideAlerter>
            <div
              onClick={handleDropdown}
              className="flex-row nav-user-container"
            >
              <div alt="user" title="user" className="user-icon" />
              <i className="navbar-arrow-down"></i>
            </div>
            <div
              className={`${
                dropdown ? "nav-dropdown-show" : "nav-dropdown-shrink"
              } flex-col-center nav-dropdown`}
            >
              <div
                onClick={handleClick}
                className="flex-1 w100 flex-row-center nav-link"
              >
                settings
              </div>
              <div
                onClick={handleLogout}
                className="flex-1 w100 flex-row-center nav-link"
              >
                logout
              </div>
            </div>
          </OutsideAlerter>
        </div>
      ) : (
        <>
          <button
            className="primary-btn login-btn"
            onClick={() => setLoginView("login")}
          >
            login
          </button>
          <button
            className="secondary-btn signup-btn"
            onClick={() => setLoginView("signUp")}
          >
            sign up
          </button>
        </>
      )}
    </>
  );
};

export default NavLanding;
