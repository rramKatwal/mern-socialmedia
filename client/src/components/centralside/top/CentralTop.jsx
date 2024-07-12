import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./centraltop.css";
import { useDispatch, useSelector } from "react-redux";
import { VideoPost } from "../../posts/VideoPost";
import { ImagePost } from "../../posts/ImagePost";
import { Modal } from "antd";
import axios from "axios";
import { updateTimelinePosts } from "../../../features/timelinepostSlice";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const CentralTop = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const formRef = useRef();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const uploadPost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/post/create`,
        { desc },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        dispatch(updateTimelinePosts({ post: data?.post }));
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
    setDesc("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <div className="centraltop">
        <div className="row mind">
          <div className="col-md-2 mind-img">
            <NavLink to={`/profile/${user.username}`} className="nav-link">
              <img
                src={
                  user.profileImg &&
                  user.profileImg !==
                    "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                    ? `${window.location.origin}/images/${user.profileImg}`
                    : user.profileImg
                }
                alt=""
                height="78px"
                width="78px"
                style={{ borderRadius: "50%" }}
              />
            </NavLink>
          </div>
          <div className="col-md-9 text-start thoughts">
            <input type="text" placeholder="What's happening?" />
          </div>
        </div>
        <div className="row menu mb-2">
          <div className="col-md-12 pr-2 d-flex align-items-center justify-content-end ">
            <ImagePost />
            <VideoPost />
            <div className="location mx-2 d-flex align-items-center">
              <FontAwesomeIcon icon={faLocationDot} className="c-icon" />
              Location
            </div>
            <div className="schedule mx-2 d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendarDays} className="c-icon" />
              Schedule
            </div>
            <button className="btn menu-btn mt-0" onClick={() => setOpen(true)}>
              Share
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="Create Post"
        open={open}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        <hr />
        <Form className="modal-form" ref={formRef} onSubmit={uploadPost}>
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

          <div className="video-post">
            <button className="btn mb-2" type="submit">
              Share
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
