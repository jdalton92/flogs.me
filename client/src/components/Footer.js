import React, { useContext } from "react";
import Context from "../context/Context";
import { useHistory } from "react-router-dom";
import SignUp from "./SignUp";

const Footer = () => {
  const { setNotification, showEditBlogModal } = useContext(Context);
  const history = useHistory();

  const handleLink = (link) => {
    history.push(link);
  };

  const handleTwitter = (e) => {
    e.preventDefault();
    setNotification({
      type: "fail",
      title: "¯\\_(ツ)_/¯",
      message: "twitter NAH",
    });
  };

  const handleGitHub = (e) => {
    e.preventDefault();
    const win = window.open("https://github.com/jdalton92/flogs.me", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    handleLink("/contact");
  };

  return (
    <footer className="footer-section">
      <div className="h100 m-auto footer-wrapper">
        <div className="flex-1 h100 footer-col-left">
          <h4 className="footer-header" onClick={() => handleLink("/")}>
            flogs.me
          </h4>
        </div>
        <div className="flex-1 h100 flex-row-center footer-col-right">
          <div className="flex-col-center footer-right-wrapper">
            <SignUp type={"footer"} />
            <div className="p10 w100">
              <div className="w100 flex-row-center">
                <div
                  title="Twitter"
                  onClick={handleTwitter}
                  className={`${
                    showEditBlogModal ? "icon-disable" : ""
                  } footer-icon twitter-icon`}
                />
                <div
                  title="GitHub"
                  onClick={handleGitHub}
                  className={`${
                    showEditBlogModal ? "icon-disable" : ""
                  } footer-icon github-icon`}
                />
                <div
                  title="Email"
                  onClick={handleEmail}
                  className={`${
                    showEditBlogModal ? "icon-disable" : ""
                  } footer-icon email-icon`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
