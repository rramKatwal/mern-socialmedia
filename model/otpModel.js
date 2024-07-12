import mongoose, { Schema, model } from "mongoose";

const OTP = model(
  "otp",
  new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      OTP: {
        type: Number,

        required: true,
      },
      expiresIn: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default OTP;
