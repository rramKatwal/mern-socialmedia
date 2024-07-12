import React from "react";
import { Top } from "./top/Top";
import { Middle } from "./middle/Middle";
import { Bottom } from "./bottom/Bottom";
import "./leftside.css";

export const LeftSide = () => {
  return (
    <>
      <div className="leftside">
        <Top />
        <Middle />
        <Bottom />
      </div>
    </>
  );
};
