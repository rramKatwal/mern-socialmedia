import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../features/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { addUsers } from "../../../features/userbyid";
import "./editprofile.css";
import { NavLink } from "react-router-dom";
import { DeleteAccount } from "./DeleteAccount";

export const EditProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);

  const { user, token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    if (user) {
      setBio(user.bio);
      setFirstname(user.firstname);
      setLastname(user.lastname);
    }
  }, [user]);

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${window.location.origin}/user/update`,
        { firstname, lastname, bio },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        dispatch(addUser({ user: data?.user, token }));
        dispatch(addUsers({ usersById: data?.user }));
        setOpen(false);
        toast.success(data?.message);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //close modal
  const closeModal = () => {
    setOpen(false);
    setBio(user.bio);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faUserPen} /> Edit Profile
      </button>
      <Modal
        title="Edit Details"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <hr />
        <form onSubmit={updateDetails} ref={formRef} className="form-edit">
          <div>
            <label htmlFor="fname"> Firstname: </label>
            <input
              type="text"
              id="fname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname"> Lastname: </label>
            <input
              type="text"
              id="lname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio"> Bio: </label>
            <input
              type="text"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Update
          </button>
        </form>
        <form className="form-edit">
          <button className="btn">
            <NavLink to="/auth/mail" className="nav-link">
              Reset Password
            </NavLink>
          </button>

          <DeleteAccount />
        </form>
      </Modal>
    </>
  );
};
