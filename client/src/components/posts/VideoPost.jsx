import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./videopost.css";
import { toast } from "react-toastify";
import { updateTimelinePosts } from "../../features/timelinepostSlice";

export const VideoPost = () => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState();
  const [desc, setDesc] = useState("");

  const { user, token } = useSelector((state) => state.auth);
  const formRef = useRef();
  const videoRef = useRef();
  const dispatch = useDispatch();

  const uploadVideoPost = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("desc", desc);
      formdata.append("videoUrl", video);

      const { data } = await axios.post(
        `${window.location.origin}/post/create-video`,
        formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updateTimelinePosts({ post: data?.videoPost }));
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
    setVideo();
    setDesc("");
    if (formRef.current) {
      formRef.current.reset();
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  return (
    <>
      <div className="video mx-2 d-flex align-items-center">
        <FontAwesomeIcon
          icon={faVideo}
          className="c-icon"
          onClick={() => setOpen(true)}
        />
        Video
      </div>
      <Modal
        title="Create video Post"
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
          onSubmit={uploadVideoPost}
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
          {video && (
            <div className="post-preview">
              <video controls autoPlay muted ref={videoRef}>
                <source src={URL.createObjectURL(video)} />
              </video>
            </div>
          )}
          <div className="video-post mb-2">
            <div>
              <label htmlFor="upload-video" className="btn ">
                {video ? video.name : "Uplaod video"}
              </label>
              <input
                type="file"
                name="image"
                id="upload-video"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
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
