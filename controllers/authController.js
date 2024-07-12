import { comparePassword, hashPassword } from "../functions/hashing.js";
import OTP from "../model/otpModel.js";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

//register controller
export const Register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, cPassword } =
      req.body;
    //form validation
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !cPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //username checking
    const formattedUsername = "@" + username.toLowerCase().replace(/\s+/g, "");
    const alreadyUsername = await userModel.findOne({
      username: formattedUsername,
    });
    if (alreadyUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken. Please choose another",
      });
    }
    //email checking
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.Please login to continue.",
      });
    }

    //matching password nad confirm password
    if (password !== cPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password didn't match.",
      });
    }
    //hashing password
    const passwordHash = await hashPassword(password);

    //registering user
    const user = await new userModel({
      firstname,
      lastname,
      email,
      username,
      password: passwordHash,
    }).save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while registeration",
      errror: error.message,
    });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //form validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //email checking
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found. Try registration.",
      });
    }
    //compare password
    const isMatched = await comparePassword(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password.",
      });
    }
    //token generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY
    );

    // Remove password from user object
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while loging user",
      errror: error.message,
    });
  }
};

//resetpassword
export const ResetPassword = async (req, res) => {
  try {
    const { otp, password, cPassword } = req.body;

    if (!otp || !password || !cPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const otpData = await OTP.findOne({ OTP: otp });

    if (!otpData) {
      return res.status(200).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expiresIn - currentTime;

    if (diff < 0) {
      return res.status(200).json({
        success: false,
        message: "Token Expired",
      });
    }

    if (password !== cPassword) {
      return res.status(200).json({
        success: false,
        message: "Passwords do not match. Please enter them correctly",
      });
    }
    const email = otpData.email;
    const hashedPassword = await hashPassword(password);
    await userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
