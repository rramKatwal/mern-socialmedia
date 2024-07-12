import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser, followers, updatefollowing } from "../../features/authSlice";
import { updateFollowers } from "../../features/userbyid";

export const FollowUnfollowSection = ({ follower }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const followUser = async (id) => {
    try {
      const { data } = await axios.post(
        `${window.location.origin}/user/follow/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updatefollowing(data?.following));
        dispatch(updateFollowers(data?.followers));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const unfollowUser = async (id) => {
    try {
      const { data } = await axios.put(
        `${window.location.origin}/user/unfollow/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data?.success) {
        toast.success(data?.message);
        dispatch(
          updatefollowing(user.following.filter((userId) => userId !== id))
        );
        dispatch(
          updateFollowers(
            data?.followers.filter((userId) => {
              userId !== id;
            })
          )
        );
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {user.following.includes(follower._id) ? (
        <button className="btn" onClick={() => unfollowUser(follower._id)}>
          Unfollow
        </button>
      ) : (
        <button className="btn" onClick={() => followUser(follower._id)}>
          Follow
        </button>
      )}
    </>
  );
};
