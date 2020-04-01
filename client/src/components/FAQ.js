import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/FAQ.css";

const FAQ = () => {
  const history = useHistory();

  const handleLink = link => {
    history.push(link);
  };

  return (
    <section className="FAQ-section w100 flex-col">
      <div className="m50 flex-col">
        <div className="m20 p10 FAQ-wrapper">
          <h2> what is flogs.me</h2>
          <p>website</p>
        </div>
        <div className="m20 p10 FAQ-wrapper">
          <h2>why was flogs.me made</h2>
          <p>bored</p>
        </div>
        <div className="m20 p10 FAQ-wrapper">
          <h2> what are flogs</h2>
          <p>you</p>
        </div>
        <div className="m20 p10 FAQ-wrapper">
          <h2>is flogs.me financial advise</h2>
          <p>nah</p>
        </div>
        <div className="m20 p10 FAQ-wrapper">
          <h2>what are your qualifications</h2>
          <p>literally none</p>
        </div>
        <div className="m20 p10 FAQ-wrapper">
          <h2> can I contribute</h2>
          <p className="FAQ-link" onClick={() => handleLink("/contact")}>
            yep
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
