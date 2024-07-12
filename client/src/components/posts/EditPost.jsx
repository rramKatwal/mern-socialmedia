import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./videopost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const EditPost = () => {
  const [post, setPost] = useState(null);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();

  const { user, token } = useSelector((state) => state.auth);
  const { postId, postType } = useParams();
  const navigate = useNavigate();

  //get single post based on postid
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/post/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        setPost(data?.post);
        setDesc(data?.post.desc);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("desc", desc);
    if (file) {
      postType === "image"
        ? formData.append("imageUrl", file)
        : formData.append("videoUrl", file);
    }

    try {
      let response;
      if (postType === "image") {
        response = await axios.put(
          `${window.location.origin}/post/update-image/${postId}`,
          formData,
          {
            headers: { Authorization: token },
          }
        );
      } else if (postType === "video") {
        response = await axios.put(
          `${window.location.origin}/post/update-video/${postId}`,
          formData,
          {
            headers: { Authorization: token },
          }
        );
      } else {
        response = await axios.put(
          `${window.location.origin}/post/update/${postId}`,
          { desc },
          {
            headers: { Authorization: token },
          }
        );
      }

      if (response.data.success) {
        toast.success("Post updated successfully", {
          onClose: () => {
            navigate("/"), window.location.reload();
          },
          autoClose: 100,
        });
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <form
        className=" mt-3"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="row d-flex ">
          {postType && (
            <div className="col-md-8 postsection">
              <div className=" mb-2">
                {file ? (
                  file.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="img img-responsive"
                    />
                  ) : file.type.startsWith("video") ? (
                    <video controls>
                      <source src={URL.createObjectURL(file)} />
                    </video>
                  ) : null
                ) : post?.imageUrl ? (
                  <div>
                    <img
                      src={`${window.location.origin}/images/${post?.imageUrl}`}
                      alt="Post"
                    />
                  </div>
                ) : post?.videoUrl ? (
                  <div>
                    <video controls autoPlay muted loop>
                      <source
                        src={`${window.location.origin}/videos/${post?.videoUrl}`}
                      />
                    </video>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {!postType ? (
            <div className="col-md-8">
              <div className="row mt-2  d-flex align-items-center ">
                <div className="col-md-2 editcontainer ">
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
                <div className="col-md-9 text-start mt-1 m-0 p-0">
                  <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                    {user.fullname}
                  </span>
                  <br />
                  <span>{user.username} </span>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 mt-2 mb-1 text-start ms-5">
                  <input
                    type="text"
                    placeholder="Post Description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className=" mb-2">
                  <button className="btn" type="submit">
                    Update Post
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-4 editpost-right">
              <div className="row mt-2  d-flex align-items-center ">
                <div className="col-md-3 d-flex justify-content-center editcontainer">
                  <img
                    src={
                      user.profileImg &&
                      user.profileImg !==
                        "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                        ? `${window.location.origin}/images/${user.profileImg}`
                        : user.profileImg
                    }
                    alt=""
                    height="68px"
                  />
                </div>
                <div className="col-md-9 text-start mt-1 m-0 p-0">
                  <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                    {user.fullname}
                  </span>
                  <br />
                  <span>{user.username} </span>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 mt-2 mb-1 text-start">
                  <input
                    type="text"
                    placeholder="Post Description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                <div className=" mb-2">
                  <div>
                    {postType === "image" ? (
                      <input
                        type="file"
                        name="imageUrl"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    ) : (
                      <input
                        type="file"
                        name="videoUrl"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    )}
                  </div>
                  <div>
                    <button className="btn" type="submit">
                      Update Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
