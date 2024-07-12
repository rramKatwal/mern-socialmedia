import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { remove } from "../../../features/userbyid";
import { removeUser } from "../../../features/authSlice";

export const DeleteAccount = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const deleteAccount = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) {
      return; // Exit the function if the user cancels the deletion
    }

    try {
      const { data } = await axios.delete(
        `${window.location.origin}/user/delete/${user._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        dispatch(remove());
        dispatch(removeUser());
        toast.success("Account deleted successfully.");
        navigate("/login");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <button className="btn" onClick={deleteAccount}>
        Delete Account
      </button>
    </>
  );
};
