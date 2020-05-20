import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ToolsCompounding from "./Tools.Compounding";
import ToolsHouse from "./Tools.House";
import ToolsBudget from "./Tools.Budget";
import { Divider } from "../../styles/StyledComponents";
import "../../styles/Tools.css";

const Tools = () => {
  const history = useHistory();
  const compoundRef = useRef(null);
  const houseRef = useRef(null);
  const budgetRef = useRef(null);
  const hash = history.location.hash;
  const key = history.location.key;

  useEffect(() => {
    if (hash.includes("compound")) {
      compoundRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    } else if (hash.includes("house")) {
      houseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    } else if (hash.includes("budget")) {
      budgetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [hash, key]);

  const handleLink = (hash) => {
    history.push(`/tools#${hash}`);
  };

  const handleFloatBlur = (target, setFunction) => {
    const { value, min, max } = target;

    if (isNaN(value) || value === "") {
      return;
    }

    if (value > parseInt(max)) {
      setFunction(parseFloat(max).toFixed(2));
    } else if (value < parseInt(min)) {
      setFunction(parseFloat(min).toFixed(2));
    } else {
      setFunction(parseFloat(value).toFixed(2));
    }
  };

  const handleIntBlur = (target, setFunction) => {
    const { value, min, max } = target;

    if (isNaN(value) || value === "") {
      return;
    }

    if (value > parseInt(max)) {
      setFunction(parseInt(max));
    } else if (value < parseInt(min)) {
      setFunction(parseInt(min));
    } else {
      setFunction(parseInt(value));
    }
  };

  return (
    <section className="flex-col tools-section">
      <div ref={compoundRef} className="tool-link-wrapper">
        <div className="tool-header-wrapper">
          <h1>tools</h1>
          <Divider width={"100%"} />
        </div>
        <ul>
          <li className="tool-link" onClick={() => handleLink("compound")}>
            compounding savings calculator
          </li>
          <li className="tool-link" onClick={() => handleLink("house")}>
            buy a house calculator
          </li>
          <li className="tool-link" onClick={() => handleLink("budget")}>
            budget tool
          </li>
        </ul>
      </div>
      <div ref={compoundRef} className="tool-wrapper">
        <ToolsCompounding
          handleFloatBlur={handleFloatBlur}
          handleIntBlur={handleIntBlur}
        />
      </div>
      <div ref={houseRef} className="tool-wrapper">
        <ToolsHouse
          handleFloatBlur={handleFloatBlur}
          handleIntBlur={handleIntBlur}
        />
      </div>
      <div ref={budgetRef} className="tool-wrapper">
        <ToolsBudget
          handleFloatBlur={handleFloatBlur}
          handleIntBlur={handleIntBlur}
        />
      </div>
    </section>
  );
};

export default Tools;
