import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCover } from "../../../features/authSlice";
import { updateCoverimg } from "../../../features/userbyid";
import "./editprofile.css";

export const EditCoverPic = () => {
  const [open, setOpen] = useState(false);
  const [coverImg, setCoverImg] = useState();

  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("coverImg", coverImg);
      const { data } = await axios.put(
        `${window.location.origin}/user/update/cover-picture`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updateCover(data?.cover));
        dispatch(updateCoverimg(data?.cover));
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //close modal
  const closeModal = () => {
    setOpen(false);
    setCoverImg();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <abbr title="Edit Cover Picture">
        <button className="btn cover-edit" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faUserPen} /> Edit Cover
        </button>
      </abbr>

      <Modal
        title="Upload Cover Picture"
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
            {coverImg ? (
              <img src={URL.createObjectURL(coverImg)} alt="" height="200px" />
            ) : (
              <img
                src={
                  user.coverImg &&
                  user.coverImg !==
                    "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                    ? `${window.location.origin}/images/${user.coverImg}`
                    : user.coverImg
                }
                alt=""
                height="200px"
              />
            )}
          </div>
          <div className="video-post mb-2">
            <div>
              <label htmlFor="upload-cover" className="btn ">
                {coverImg ? coverImg.name : "Uplaod Image"}
              </label>
              <input
                type="file"
                name="image"
                id="upload-cover"
                accept="image/*"
                onChange={(e) => setCoverImg(e.target.files[0])}
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
