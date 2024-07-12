import React from "react";
import { CentralTop } from "./top/CentralTop";
import { CentralBody } from "./body/CentralBody";
import "./central.css";

export const Centralside = () => {
  return (
    <>
      <div className="centralside">
        <CentralTop />
        <CentralBody />
      </div>
    </>
  );
};
