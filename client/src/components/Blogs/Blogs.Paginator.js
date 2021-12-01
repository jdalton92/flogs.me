import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const BlogsPaginator = () => {
  return (
    <div className="flex-row">
      <span>{"< "}</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>{" >"}</span>
    </div>
  );
};

export default BlogsPaginator;
