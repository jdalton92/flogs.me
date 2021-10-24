import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { OutsideAlerter } from "../../utils/hooks";
import Context from "../../context/Context";

const NavLanding = () => {
  const {
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

  const handleDropdown = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };

  const handleLogout = (e) => {
    e.preventDefault();
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
      {meData !== undefined && meData.getMe ? (
        <div className="h100 nav-user-wrapper">
          <OutsideAlerter>
            <div
              onClick={handleDropdown}
              className="flex-col-center nav-user-container"
            >
              <div className="w100 flex-row nav-user-icon-wrapper">
                <div alt="user" title="user" className="user-icon" />
                <i className="navbar-arrow-down"></i>
              </div>
              <div className="nav-user-name">{meData.getMe.name}</div>
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
                  onClick={() => handleLink(`/user/${meData.getMe._id}`)}
                  className="flex-1 w100 flex-row-center nav-link"
                >
                  account summary
                </div>
                <div
                  onClick={() => handleLink(`/settings`)}
                  className="flex-1 w100 flex-row-center nav-link"
                >
                  account settings
                </div>
                {meData.getMe.userType === "admin" && (
                  <div
                    onClick={() => handleLink("/blog-admin")}
                    className="flex-1 w100 flex-row-center nav-link"
                  >
                    blog admin
                  </div>
                )}
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
            className="primary-btn login-btn box-shadow-3"
            onClick={() => setLoginView("login")}
          >
            login
          </button>
          <button
            className="secondary-btn signup-btn box-shadow-3"
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
