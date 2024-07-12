import React, { useEffect } from "react";
import "./homepage.css";
import { LeftSide } from "../../components/leftside/Leftside";
import { Centralside } from "../../components/centralside/Central";
import { Right } from "../../components/rightside/Right";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <>
      <div className="row home text-center">
        <div className="col-md-3 col-scrollable">
          <LeftSide />
        </div>
        <div className="col-md-6 col-scrollable">
          <Centralside />
        </div>
        <div className="col-md-3 p-0 col-scrollable ">
          <Right />
        </div>
      </div>
    </>
  );
};
