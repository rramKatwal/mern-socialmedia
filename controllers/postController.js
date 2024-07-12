import postModel from "../model/postModel.js";
import userModel from "../model/userModel.js";

//create normal post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { desc } = req.body;
    if (!desc) {
      return res.status(400).json({
        success: false,
        message: "Description is required.",
      });
    }

    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const savePost = await new postModel({
      userId,
      desc,
    }).save();
    const post = await savePost.populate("userId", "-password");

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating  post",
      error: error.message,
    });
  }
};

//create image post
export const imagePost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { desc } = req.body;
    if (!desc) {
      return res.status(400).json({
        success: false,
        message: "Description is required.",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }
    const { filename } = req.file;
    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const savePost = await new postModel({
      userId,
      desc,
      imageUrl: filename,
    }).save();

    const imagePost = await savePost.populate("userId", "-password");

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      imagePost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating image post",
      error: error.message,
    });
  }
};

//create video post
export const videoPost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { desc } = req.body;
    if (!desc) {
      return res.status(400).json({
        success: false,
        message: "Description is required.",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded.",
      });
    }
    const { filename } = req.file;
    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const savePost = await new postModel({
      userId,
      desc,
      videoUrl: filename,
    }).save();
    const videoPost = await savePost.populate("userId");

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      videoPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating video post",
      error: error.message,
    });
  }
};

//get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("userId", "-password")
      .populate("comment.postedBy", "-password");

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      totalPosts: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all posts",
      error: error.message,
    });
  }
};

//get post by id
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel
      .findById(postId)
      .populate("comment.postedBy", "-password");
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting post",
      error: error.message,
    });
  }
};

//updatepost
export const updatePost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { postId } = req.params;
    const { desc } = req.body;

    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    const updatedPost = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $set: { desc },
        },
        { new: true }
      )
      .populate("userId", "-password");

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating  post",
      error: error.message,
    });
  }
};

//updateimagepost
export const updateImagePost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { postId } = req.params;
    const { desc } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.filename;
    }

    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    const updatedImagePost = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $set: { desc, imageUrl },
        },
        { new: true }
      )
      .populate("userId");

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedImagePost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating image post",
      error: error.message,
    });
  }
};

//updatevideopost
export const updateVideoPost = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unathorized access",
      });
    }
    const { postId } = req.params;
    const { desc } = req.body;
    let videoUrl;
    if (req.file) {
      videoUrl = req.file.filename;
    }

    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    const updatedVideoPost = await postModel
      .findByIdAndUpdate(
        postId,
        {
          $set: { desc, videoUrl },
        },
        { new: true }
      )
      .populate("userId");

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedVideoPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating video post",
      error: error.message,
    });
  }
};

//deletepost
export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    //del post
    await postModel.findByIdAndDelete(postId);
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting post",
      error: error.message,
    });
  }
};

//like and unlike
export const like = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    let updatedPost;
    let message;

    if (!post.likes.includes(userId)) {
      updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );
      message = "Post Liked";
    } else {
      updatedPost = await postModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
      message = "Post disliked";
    }

    return res.status(200).json({
      success: true,
      message,
      likes: updatedPost.likes, // Return the updated likes array
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//comment and umcomment
export const comments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text } = req.body;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    const newComment = {
      text: text,
      postedBy: userId,
    };

    const updatedPost = await postModel
      .findByIdAndUpdate(
        postId,
        { $push: { comment: newComment } },
        { new: true }
      )
      .populate("comment.postedBy", "-password");

    //latest comment to appear on top
    updatedPost.comment.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error commeting timeline post",
      error: error.message,
    });
  }
};

//delete comment

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    const updatedPost = await postModel
      .findByIdAndUpdate(
        postId,
        { $pull: { comment: { _id: commentId } } },
        { new: true }
      )
      .populate("comment.postedBy", "-password");

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};

//get timeline posts
export const getTimelinePost = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    const followingIds = user.following.map((user) => user);

    const posts = await postModel
      .find({
        userId: { $in: [userId, ...followingIds] },
      })
      .populate("userId", "-password")
      .populate("comment.postedBy", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalPosts: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetchning timeline post",
      error: error.message,
    });
  }
};

//get post by user
export const usersPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userPost = await postModel
      .find({ userId: id })
      .populate("userId", "-password")
      .populate("comment.postedBy", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalposts: userPost.length,
      userPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetchning users post",
      error: error.message,
    });
  }
};
