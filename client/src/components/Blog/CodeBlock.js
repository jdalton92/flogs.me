import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ value }) => {
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
