import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FollowUnfollowSection } from "../../followunfollow/FollowUnfollow";
import { NavLink } from "react-router-dom";

export const RightBody = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = useSelector((state) => state.auth);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/user/all-users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        setUsers(data?.users);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {users && (
        <div className="bottomside">
          <hr className="m-4 mb-3" style={{ width: "300px" }} />
          <h4>People you may know</h4>
          {users.map(
            (u) =>
              !user.following.includes(u._id) &&
              !user.followers.includes(u._id) &&
              user._id !== u._id && (
                <div className="row followers-section mb-0" key={u._id}>
                  <div className="col-md-2">
                    <NavLink to={`/profile/${u.username}`} className="nav-link">
                      <img
                        src={
                          u.profileImg &&
                          u.profileImg !==
                            "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                            ? `${window.location.origin}/images/${u.profileImg}`
                            : u.profileImg
                        }
                        alt=""
                        height="58px"
                        width="58px"
                        style={{ borderRadius: "50%" }}
                      />
                    </NavLink>
                  </div>
                  <div
                    className="col-md-5 text-start"
                    style={{ marginTop: "8px", marginLeft: "22px" }}
                  >
                    <NavLink to={`/profile/${u.username}`} className="nav-link">
                      <span>{u.fullname}</span> <br />
                      <span className="mt-0">{u.username}</span>
                    </NavLink>
                  </div>
                  <div className="col-md-4">
                    <FollowUnfollowSection follower={u} />
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};
