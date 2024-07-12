import React, { useEffect, useState } from "react";
import "./profileside.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Body } from "./centralbody/Body";
import { FollowUnfollowSection } from "../followunfollow/FollowUnfollow";
import { EditProfile } from "./editProfile/EditProfile";
import { EditProfilePic } from "./editProfile/EditProfilePic";
import { EditCoverPic } from "./editProfile/EditCoverPic";
import { addUsers } from "../../features/userbyid";
import { ViewDetails } from "./editProfile/ViewDetails";

export const ProfileSide = () => {
  const { username } = useParams();

  const dispatch = useDispatch();
  const { usersById } = useSelector((state) => state.userById);
  const { user, token } = useSelector((state) => state.auth);

  const getIndividualUser = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/user/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        dispatch(addUsers({ usersById: data?.user }));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getIndividualUser();
  }, [username]);

  return (
    <>
      {usersById && (
        <div className=" profileside mt-2 p-1">
          <div className="cover-header">
            {user._id === usersById._id && <EditCoverPic />}
            <img
              src={
                usersById.coverImg &&
                usersById.coverImg !==
                  "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                  ? `${window.location.origin}/images/${usersById.coverImg}`
                  : usersById.coverImg
              }
              className="img img-responsive"
              style={{
                maxHeight: "428px",
                width: "97%",
                borderRadius: "20px",
              }}
            />
          </div>
          <hr className="mb-0" />
          <div className="row mt-1  d-flex align-items-center">
            <div className="col-md-3 profile-header">
              {user._id === usersById._id && <EditProfilePic />}
              <img
                src={
                  usersById.profileImg &&
                  usersById.profileImg !==
                    "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                    ? `${window.location.origin}/images/${usersById.profileImg}`
                    : usersById.profileImg
                }
                alt=""
                className="img img-responsive"
              />
            </div>
            <div className="col-md-4 text-start mt-3 p-0">
              <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                {usersById.fullname}
              </span>
              <br />
              <span>{usersById.username}</span> <br />
              {user._id === usersById._id ? (
                <>
                  {" "}
                  <span>{user.followers.length} followers</span> ||{" "}
                  <span>{user.following.length} following</span> <br />
                </>
              ) : (
                <>
                  {" "}
                  <span>{usersById.followers.length} followers</span> ||{" "}
                  <span>{usersById.following.length} following</span> <br />
                </>
              )}
            </div>
            <div className="col-md-5 d-flex justify-content-end">
              <ViewDetails />

              {user._id === usersById._id ? (
                <EditProfile />
              ) : (
                <FollowUnfollowSection follower={usersById} />
              )}
            </div>
          </div>
          {usersById.bio && (
            <div className="row ">
              <div className="col-md-9 text-start ms-5 mt-2">
                <p className="mb-2"> Bio: {usersById.bio}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <Body />
    </>
  );
};
