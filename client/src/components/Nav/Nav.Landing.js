import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
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
    meRefetch,
  } = useContext(Context);
  const history = useHistory();

  const handleLink = (link) => {
    setDropdown(false);
    history.push(link);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setDropdown(false);
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "coming soon",
    });
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setToken("");
    localStorage.removeItem("flogsToken");
    meRefetch();
    setDropdown(false);
    setLoginView("landing");
  };

  if (meLoading || loginLoading) {
    return <div className="loader-spinner loading-wrapper">loading...</div>;
  }

  return (
    <>
      {meData !== undefined && meData.me ? (
        <div className="h100 nav-user-wrapper">
          <OutsideAlerter>
            <div
              onClick={handleDropdown}
              className="flex-col-center nav-user-container"
            >
              <div className="flex-row-center">
                <div alt="user" title="user" className="user-icon" />
                <i className="navbar-arrow-down"></i>
              </div>
              <div>{meData.me.name}</div>
            </div>
            <div
              className={`${
                dropdown
                  ? "nav-dropdown-wrapper-show"
                  : "nav-dropdown-wrapper-shrink"
              } nav-dropdown-wrapper`}
            >
              <div
                className={`${
                  dropdown ? "nav-dropdown-show" : "nav-dropdown-shrink"
                } flex-col-center nav-dropdown`}
              >
                <div
                  onClick={() => handleLink(`/user/${meData.me._id}`)}
                  className="flex-1 w100 flex-row-center nav-link"
                >
                  user profile
                </div>
                {meData.me.userType === "admin" && (
                  <div
                    onClick={() => handleLink("/add-blog")}
                    className="flex-1 w100 flex-row-center nav-link"
                  >
                    add blog
                  </div>
                )}
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
