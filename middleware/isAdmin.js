import userModel from "../model/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while verifying admin",
      errror: error.message,
    });
  }
};
