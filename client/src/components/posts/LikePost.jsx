import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const LikePost = ({ post, handleLike }) => {
  const { user, token } = useSelector((state) => state.auth);

  const likepost = async (id) => {
    try {
      const { data } = await axios.put(
        `${window.location.origin}/post/like/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      if (data?.success) {
        handleLike(id, data.likes);
        toast.success(data?.message);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={post.likes.includes(user._id) ? faHeartSolid : faHeartRegular}
        className="r-icon cursor"
        onClick={() => likepost(post?._id)}
      />
    </>
  );
};
