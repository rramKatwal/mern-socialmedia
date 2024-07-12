import express from "express";
import {
  coverPicture,
  deleteUser,
  followUser,
  followers,
  getAllUsers,
  getUser,
  profilePicture,
  searchUser,
  unFollowUser,
  updateUser,
} from "../controllers/userController.js";
import { isSignIn } from "../middleware/signin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { images } from "../middleware/multer.js";

//router decleration
const router = express.Router();

//getallusers
router.get("/all-users", isSignIn, getAllUsers);
//getindividual user
router.get("/:username", isSignIn, getUser);
// updateuser
router.put("/update", isSignIn, updateUser);
//deleteuser
router.delete("/delete/:id", isSignIn, deleteUser);

//follow route
router.post("/follow/:userIdToFollow", isSignIn, followUser);
//unfollowuser
router.put("/unfollow/:userIdToUnfollow", isSignIn, unFollowUser);
//search user
router.get("/search/:keyword", isSignIn, searchUser);
//getfollowers
router.get("/followers/list", isSignIn, followers);
//profile picture
router.put(
  "/update/profile-picture",
  isSignIn,
  images.single("profileImg"),
  profilePicture
);
//cover picture
router.put(
  "/update/cover-picture",
  isSignIn,
  images.single("coverImg"),
  coverPicture
);

export default router;
