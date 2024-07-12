import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTimelinePosts } from "../../features/timelinepostSlice";
import axios from "axios";
import { Modal } from "antd";
import { Form } from "react-bootstrap";

export const ImagePost = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [desc, setDesc] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const formRef = useRef();
  const dispatch = useDispatch();

  const uploadImagePost = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("desc", desc);
      formdata.append("imageUrl", image);

      const { data } = await axios.post(
        `${window.location.origin}/post/create-image`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updateTimelinePosts({ post: data?.imagePost }));
        closeModal();
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setImage();
    setDesc("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <>
      <div className="gallery mx-2 d-flex align-items-center ">
        <FontAwesomeIcon
          icon={faImage}
          className="c-icon"
          onClick={() => setOpen(true)}
        />
        Photo
      </div>
      <Modal
        title="Create Image Post"
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <hr />
        <Form
          className="modal-form"
          encType="multipart/form-data"
          ref={formRef}
          onSubmit={uploadImagePost}
        >
          <div className="row mt-2  d-flex align-items-center ">
            <div className="col-md-2 row-header d-flex justify-content-center">
              <img
                src={
                  user.profileImg &&
                  user.profileImg !==
                    "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                    ? `${window.location.origin}/images/${user.profileImg}`
                    : user.profileImg
                }
                alt=""
                height=""
              />
            </div>
            <div className="col-md-9 text-start ">
              <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                {user.fullname}
              </span>
              <br />
              <span>{user.username} </span>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12 mt-2 mb-1 text-start videopost">
              <input
                type="text"
                placeholder="Post Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          {image && (
            <div className="post-preview mb-2">
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
          <div className="video-post mb-2">
            <div>
              <label htmlFor="upload-image" className="btn ">
                {image ? image.name : "Uplaod Image"}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Share
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
