import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUser, updateProfile } from "../../../features/authSlice";
import { updateprofileimg } from "../../../features/userbyid";

export const EditProfilePic = () => {
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState();

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("profileImg", profileImg);
      const { data } = await axios.put(
        `${window.location.origin}/user/update/profile-picture`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updateProfile(data?.profile));
        dispatch(updateprofileimg(data?.profile));
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //close modal
  const closeModal = () => {
    setOpen(false);
    setProfileImg();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <abbr title="Edit Profile Picture">
        <FontAwesomeIcon
          icon={faUserPen}
          className="profile-edit text-danger cursor p-1"
          onClick={() => setOpen(true)}
          style={{ backgroundColor: "black" }}
          width="50px"
        />
      </abbr>
      <Modal
        title="Upload Profile Picture"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <hr />
        <form
          ref={formRef}
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="edit-form"
        >
          <div className="editPicture">
            {profileImg ? (
              <img
                src={URL.createObjectURL(profileImg)}
                alt=""
                height="200px"
              />
            ) : (
              <img
                src={
                  user.profileImg &&
                  user.profileImg !==
                    "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                    ? `${window.location.origin}/images/${user.profileImg}`
                    : user.profileImg
                }
                alt=""
                height="200px"
              />
            )}
          </div>
          <div className="video-post mb-2">
            <div>
              <label htmlFor="upload-image" className="btn ">
                {profileImg ? profileImg.name : "Uplaod Image"}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                accept="image/*"
                onChange={(e) => setProfileImg(e.target.files[0])}
                hidden
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
