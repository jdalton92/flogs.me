import React, { useState } from "react";
import ToolsToTopBtn from "./Tools.ToTopBtn";
import { Divider } from "../../styles/StyledComponents";

const ToolsBudget = ({ handleFloatBlur, handleIntBlur }) => {
  return (
    <>
      <div className="tool-header-wrapper">
        <h2>budget calculator</h2>
        <Divider width={"100%"} />
        <ToolsToTopBtn />
      </div>
    </>
  );
};

export default ToolsBudget;
