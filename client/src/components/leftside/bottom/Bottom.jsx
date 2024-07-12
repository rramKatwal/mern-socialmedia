import React, { useEffect, useState } from "react";
import "./bottom.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FollowUnfollowSection } from "../../followunfollow/FollowUnfollow";
import { NavLink } from "react-router-dom";

export const Bottom = () => {
  const [followers, setFollowers] = useState([]);

  const { user, token } = useSelector((state) => state.auth);

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/user/followers/list`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        setFollowers(data?.followers);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <>
      {followers && (
        <div className="bottomside">
          <hr className="m-4 mb-3" style={{ width: "300px" }} />
          <h3>Followers</h3>
          {followers.map((follower) => (
            <div className="row followers-section mb-0" key={follower._id}>
              <div className="col-md-2">
                <NavLink
                  to={`/profile/${follower.username}`}
                  className="nav-link"
                >
                  <img
                    src={
                      follower.profileImg &&
                      follower.profileImg !==
                        "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                        ? `${window.location.origin}/images/${follower.profileImg}`
                        : follower.profileImg
                    }
                    alt=""
                    height="58px"
                    style={{ borderRadius: "50%" }}
                    className="mb-2"
                  />
                </NavLink>
              </div>

              <div
                className="col-md-5 text-start"
                style={{ marginTop: "8px", marginLeft: "22px" }}
              >
                <NavLink
                  to={`/profile/${follower.username}`}
                  className="nav-link"
                >
                  <span>{follower.fullname}</span> <br />
                  <span className="mt-0">{follower.username}</span>
                </NavLink>
              </div>

              <div className="col-md-4">
                <FollowUnfollowSection follower={follower} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
