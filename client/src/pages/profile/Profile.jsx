import React from "react";
import "./profile.css";
import { Right } from "../../components/rightside/Right";
import { ProfileSide } from "../../components/profileside/ProfileSide";
import { LeftSide } from "../../components/leftside/Leftside";

export const Profile = () => {
  return (
    <>
      <div className="row home text-center">
        <div className="col-md-3 col-scrollable">
          <LeftSide />
        </div>
        <div className="col-md-6 col-scrollable">
          <ProfileSide />
        </div>
        <div className="col-md-3 p-0 col-scrollable">
          <Right />
        </div>
      </div>
    </>
  );
};
