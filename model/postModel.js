import mongoose, { Schema, model } from "mongoose";

const postModel = model(
  "post",
  new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      comment: [
        {
          text: String,
          postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      desc: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      videoUrl: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

export default postModel;
