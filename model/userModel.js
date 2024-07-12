import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImg: {
      type: String,
      default:
        "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png",
    },
    coverImg: {
      type: String,
      default:
        "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png",
    },

    followers: {
      type: [Schema.Types.ObjectId],
      ref: "user",
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("firstname") || this.isModified("lastname")) {
    this.fullname = `${
      this.firstname.charAt(0).toUpperCase() + this.firstname.slice(1)
    } ${this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1)}`;
  }
  if (this.isModified("username") || this.isNew) {
    this.username = "@" + this.username.toLowerCase().replace(/\s+/g, "");
  }
  next();
});
const userModel = model("user", userSchema);
export default userModel;
