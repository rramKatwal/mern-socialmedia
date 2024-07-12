import express from "express";
import {
  comments,
  deleteComment,
  getTimelinePost,
  imagePost,
  like,
  usersPost,
} from "../controllers/postController.js";
import { isSignIn } from "../middleware/signin.js";
import { images, videos } from "../middleware/multer.js";
import { videoPost } from "../controllers/postController.js";
import { createPost } from "../controllers/postController.js";
import { getAllPosts } from "../controllers/postController.js";
import { getPost } from "../controllers/postController.js";
import { updatePost } from "../controllers/postController.js";
import { updateImagePost } from "../controllers/postController.js";
import { updateVideoPost } from "../controllers/postController.js";
import { deletePost } from "../controllers/postController.js";

//router decleration
const router = express.Router();

//normal post
router.post("/create", isSignIn, createPost);
//image post
router.post("/create-image", isSignIn, images.single("imageUrl"), imagePost);
//video post
router.post("/create-video", isSignIn, videos.single("videoUrl"), videoPost);
//getallposts
router.get("/all-posts", isSignIn, getAllPosts);
//get single post
router.get("/:postId", isSignIn, getPost);
//updateimagepost
router.put("/update/:postId", isSignIn, updatePost);
router.put(
  "/update-image/:postId",
  isSignIn,
  images.single("imageUrl"),
  updateImagePost
);
router.put(
  "/update-video/:postId",
  isSignIn,
  videos.single("videoUrl"),
  updateVideoPost
);
//deletepost
router.delete("/delete/:postId", isSignIn, deletePost);
//like post
router.put("/like/:postId", isSignIn, like);

//timelineposts
router.get("/timeline/posts", isSignIn, getTimelinePost);
//individual users post
router.get("/user-posts/:id", isSignIn, usersPost);
//comment post
router.put("/comment/:postId", isSignIn, comments);
//deletecomment
router.delete("/delete/:postId/:commentId", isSignIn, deleteComment);

export default router;
