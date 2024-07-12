import mongoose from "mongoose";
import userModel from "../model/userModel.js";

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No users found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      totaluser: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching users",
      errror: error.message,
    });
  }
};

//getindividualuser
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching user",
      errror: error.message,
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, bio } = req.body;

    const user = await userModel.findByIdAndUpdate(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    firstname ? (user.firstname = firstname) : user.firstname;
    lastname ? (user.lastname = lastname) : user.lastname;
    bio ? (user.bio = bio) : user.bio;

    await user.save();

    const { password: pwd, ...userWithoutPassword } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating user",
      errror: error.message,
    });
  }
};

//deleteuser
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting user",
      errror: error.message,
    });
  }
};

//follow user
export const followUser = async (req, res) => {
  try {
    const { id } = req.user; // ID of the current user
    const { userIdToFollow } = req.params; // ID of the user to follow

    // Check if the user is trying to follow themselves
    if (id === userIdToFollow) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // Find the current user and the user to follow
    const currentUser = await userModel.findById(id);
    const userToFollow = await userModel.findById(userIdToFollow);

    // Check if both users exist
    if (!currentUser || !userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already following
    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    // Update the following list of the current user
    currentUser.following.push(userIdToFollow);
    await currentUser.save();

    // Update the followers list of the user to follow
    userToFollow.followers.push(id);
    await userToFollow.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
      following: currentUser.following,
      followers: userToFollow.followers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while following user",
      error: error.message,
    });
  }
};

//unfollowuser
export const unFollowUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { userIdToUnfollow } = req.params;

    if (id === userIdToUnfollow) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const currentUser = await userModel.findById(id);
    const userTounFollow = await userModel.findById(userIdToUnfollow);

    if (!currentUser || !userTounFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }
    await userModel.findByIdAndUpdate(id, {
      $pull: { following: userIdToUnfollow },
    });

    await userModel.findByIdAndUpdate(userIdToUnfollow, {
      $pull: { followers: id },
    });

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
      following: currentUser.following,
      followers: userTounFollow.followers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while unfollowing user",
      error: error.message,
    });
  }
};

//search user
export const searchUser = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || keyword.trim() === "") {
      return res.json([]);
    }
    const result = await userModel
      .find({
        $or: [
          { firstname: { $regex: keyword, $options: "i" } },
          { username: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-password");
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while searching user",
      error: error.message,
    });
  }
};

//getuserfollowers
export const followers = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const followersId = user.followers.map((id) => id);

    const followers = await userModel
      .find({ _id: { $in: followersId } })
      .select("-password");
    res
      .status(200)
      .json({ success: true, totalFollowers: followers.length, followers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting followers",
      error: error.message,
    });
  }
};

//upload profile picture
export const profilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select profile image",
      });
    }
    const { filename } = req.file;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { profileImg: filename } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Picture Uploaded successfully",
      profile: updatedUser.profileImg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while uploading profile picture",
      error: error.message,
    });
  }
};

//upload cover image
export const coverPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select cover image",
      });
    }
    const { filename } = req.file;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { coverImg: filename } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cover Picture Uploaded successfully",
      cover: updatedUser.coverImg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while uploading profile picture",
      error: error.message,
    });
  }
};
