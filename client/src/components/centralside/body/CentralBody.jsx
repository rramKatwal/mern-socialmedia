import React, { useEffect, useState } from "react";
import "./centralbody.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTimelinePosts } from "../../../features/timelinepostSlice";
import { formatDistanceToNow } from "date-fns";
import { LikePost } from "../../posts/LikePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Popconfirm } from "antd";
import { Spinner } from "../../Spinner";
import { NavLink } from "react-router-dom";

export const CentralBody = () => {
  const [comment, setComment] = useState("");

  const { posts } = useSelector((state) => state.timelinePost);
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //get timeline posts
  const getTimelinePosts = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/post/timeline/posts`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        dispatch(addTimelinePosts({ posts: data?.posts }));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTimelinePosts();
  }, [dispatch, token]);

  const handleLike = (postId, likes) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, likes } : post
    );
    dispatch(addTimelinePosts({ posts: updatedPosts }));
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
        dispatch(addTimelinePosts({ posts: updatedPosts }));
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
        dispatch(addTimelinePosts({ posts: updatedPosts }));
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //format time
  const formatTime = (date) => {
    const now = new Date();
    const diffInSeconds = (now - date) / 1000;

    if (diffInSeconds < 60) {
      return "Just Now";
    }

    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <div key={post?._id}>
            <div className="centralbody mt-3">
              <div className="row mt-2  d-flex align-items-center">
                <div className="col-md-2 row-header">
                  <NavLink
                    to={`/profile/${post?.userId?.username}`}
                    className="nav-link"
                  >
                    <img
                      src={
                        post?.userId?.profileImg &&
                        post?.userId?.profileImg !==
                          "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                          ? `${window.location.origin}/images/${post?.userId?.profileImg}`
                          : post?.userId?.profileImg
                      }
                      alt=""
                    />
                  </NavLink>
                </div>
                <div className="col-md-9 text-start mt-2 m-0 p-0">
                  <NavLink
                    to={`/profile/${post?.userId?.username}`}
                    className="nav-link"
                  >
                    <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                      {post?.userId?.fullname}
                    </span>
                    <br />
                    <span>{post?.userId?.username} </span> <br />
                  </NavLink>
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
              <div className="row ">
                <div className="col-md-10 text-start ms-4 mt-2">
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
              {/* //comments */}
              <div className="comments-section mt-2 mb-0">
                {post?.comment.map((comm) => (
                  <div key={comm._id} className="comment mb-1 p-1 rounded">
                    <div className=" comment-shown">
                      <div className="comment-img">
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
                      </div>
                      <div className="comment-middle">
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
                          {formatTime(new Date(comm?.createdAt))}
                        </span>
                      </div>

                      {user._id === comm.postedBy._id && (
                        <div div className="">
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
                        </div>
                      )}
                    </div>

                    <span className="mt-2 text-start ms-3">{comm.text}</span>
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

          <h4 className="mt-2">
            Upload posts or follow some users to get posts
          </h4>
        </>
      )}
    </>
  );
};
