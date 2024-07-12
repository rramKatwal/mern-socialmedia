import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Dropdown } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./body.css";
import { LikePost } from "../../posts/LikePost";
import { Spinner } from "../../Spinner";
import { addPosts } from "../../../features/userbyid";
import { Popconfirm } from "antd";

export const Body = () => {
  const [userId, setUserId] = useState();
  const [comment, setComment] = useState("");

  const { user, token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.postById);

  const { username } = useParams();
  const dispatch = useDispatch();

  const getIndividualUser = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/user/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        setUserId(data?.user?._id);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getIndividualUser();
  }, [username]);

  const getUserTimelinePosts = async (id) => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/post/user-posts/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        dispatch(addPosts({ posts: data?.userPost }));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (userId) {
      getUserTimelinePosts(userId);
    }
  }, [userId]);

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(
          `${window.location.origin}/post/delete/${postId}`,
          { headers: { Authorization: token } }
        );
        if (data?.success) {
          toast.success(data?.message);
          const updatedPosts = posts.filter((post) => post._id !== postId);
          dispatch(addPosts({ posts: updatedPosts }));
        } else {
          toast.error(data?.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleLike = (postId, likes) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, likes } : post
    );
    dispatch(addPosts({ posts: updatedPosts }));
  };

  //create comment
  const commentPost = async (postId) => {
    try {
      const { data } = await axios.put(
        `${window.location.origin}/post/comment/${postId}`,
        { text: comment },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, comment: data?.post.comment } : post
        );
        dispatch(addPosts({ posts: updatedPosts }));
        setComment("");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //delete comment
  const deleteComment = async (postId, commentId) => {
    try {
      const { data } = await axios.delete(
        `${window.location.origin}/post/delete/${postId}/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, comment: data?.post.comment } : post
        );
        dispatch(addPosts({ posts: updatedPosts }));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <div key={post?._id}>
            <div className="centralbody mt-3">
              {post?.userId._id === user._id ? (
                <div className="row mt-2  d-flex align-items-center">
                  <div className="col-md-2 row-header">
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
                  <div className="col-md-8 text-start mt-3 m-0 p-0">
                    <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                      {user.fullname}
                    </span>
                    <br />
                    <span>{user.username} </span> <br />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "gray",
                      }}
                    >
                      {formatDistanceToNow(new Date(post?.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="col-md-2">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        className="toogle-btn"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as="div">
                          <NavLink
                            to={`/post/edit/${post._id}/${
                              post.imageUrl
                                ? "image"
                                : post.videoUrl
                                ? "video"
                                : ""
                            }`}
                            className="nav-link"
                          >
                            Edit Post
                          </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deletePost(post._id)}>
                          Delete Post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                <div className="row mt-2  d-flex align-items-center">
                  <div className="col-md-2 row-header">
                    <img
                      src={
                        post?.userId.profileImg &&
                        post?.userId.profileImg !==
                          "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                          ? `${window.location.origin}/images/${post?.userId.profileImg}`
                          : post?.userId.profileImg
                      }
                      alt=""
                      height=""
                    />
                  </div>
                  <div className="col-md-8 text-start mt-3 m-0 p-0">
                    <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                      {post?.userId?.fullname}
                    </span>
                    <br />
                    <span>{post?.userId?.username} </span> <br />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "gray",
                      }}
                    >
                      {formatDistanceToNow(new Date(post?.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              )}

              <div className="row ">
                <div className="col-md-10 text-start ms-5 mt-2">
                  <p className="mb-2" style={{ width: "100%" }}>
                    {post?.desc}
                  </p>
                </div>
              </div>
              {post?.imageUrl ? (
                <div className="img-con">
                  <img
                    src={`${window.location.origin}/images/${post?.imageUrl}`}
                    alt=""
                  />
                </div>
              ) : post?.videoUrl ? (
                <div className="img-con">
                  <video controls autoPlay muted loop>
                    <source
                      src={`${window.location.origin}/videos/${post?.videoUrl}`}
                    />
                  </video>
                </div>
              ) : (
                <></>
              )}
              <hr className="mb-2 mt-2 m-3" />
              <div className="interactions mt-2 mb-1">
                <span>{post?.likes.length} Likes</span>
                <span>{post?.comment.length} comments</span>
              </div>
              <div className="reactions">
                <LikePost post={post} handleLike={handleLike} />
              </div>

              <hr className="mb-2 mt-2 m-3" />
              {/* comment */}

              <div className="comments-section mt-2 mb-0">
                {post?.comment?.map((comm) => (
                  <div key={comm._id} className="comment mb-1 p-1 rounded">
                    <div className="d-flex align-items-start">
                      <span className="comment-img">
                        <img
                          src={
                            comm?.postedBy.profileImg &&
                            comm?.postedBy.profileImg !==
                              "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                              ? `${window.location.origin}/images/${comm?.postedBy.profileImg}`
                              : comm?.postedBy.profileImg
                          }
                          alt=""
                          height="42px"
                          width="42px"
                          className="rounded-circle"
                        />
                      </span>
                      <span className="comment-author ms-2 mt-1 mb-0 fw-bold">
                        {comm.postedBy.username}
                      </span>
                      <br />
                      <span
                        className="date-format"
                        style={{
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        {formatDistanceToNow(new Date(comm?.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      {user._id === comm.postedBy._id && (
                        <>
                          <Popconfirm
                            title="Delete the comment"
                            description="Are you sure to delete this comment?"
                            onConfirm={() => deleteComment(post._id, comm._id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="delete-icon ms-3 mt-2 text-danger"
                              style={{ cursor: "pointer" }}
                            />
                          </Popconfirm>
                        </>
                      )}
                    </div>

                    <span className="mt-1 text-start ms-3">{comm.text}</span>
                  </div>
                ))}
              </div>
              <hr className="mb-2 mt-2 m-3" />
              <div className=" comment-input mb-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="btn"
                  onClick={() => commentPost(post._id)}
                  disabled={!comment.trim()}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <Spinner />

          <h4 className="mt-2">No posts found for this user </h4>
        </>
      )}
    </>
  );
};
