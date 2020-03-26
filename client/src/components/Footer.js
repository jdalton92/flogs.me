import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const handleTwitter = e => {
    e.preventDefault();
    const win = window.open(
      "https://au.linkedin.com/in/james-dalton-b786a876",
      "_blank"
    );
    if (win != null) {
      win.focus();
    }
  };

  const handleGitHub = e => {
    e.preventDefault();
    const win = window.open("https://github.com/jdalton92/", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  const handleEmail = e => {
    e.preventDefault();
    window.location.href =
      "mailto:jamesdalton7648@gmail.com?subject=jamesdalton.io%20message";
  };
  return (
    <footer className="">
      <div className="p15 m-auto footer-wrapper flex-row-center">
        <div className="flex-1 h100 flex-col-center">
          <h4 className="footer-header">flogs.me info</h4>
          <p className="footer-info">made for your face</p>
        </div>
        <div className="flex-1 h100 flex-col-center">
          <div className="w100 flex-row-center">
            <div
              title="Twitter"
              onClick={handleTwitter}
              className="footer-icon twitter-icon"
            />
            <div
              title="GitHub"
              onClick={handleGitHub}
              className="footer-icon github-icon"
            />
            <div
              title="Email"
              onClick={handleEmail}
              className="footer-icon email-icon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
