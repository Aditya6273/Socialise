import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"], // Added email validation
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Username must be at least 3 characters"], // Added username validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    profilePic: {
      type: String,
      default: "default_profile_pic.jpg",
    },
    bondings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bonds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    coverImg: {
      type: String,
      default: "default_cover_img.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    links: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Adding Indexing for email and username for better search performance
userSchema.index({ email: 1, username: 1 });

export const User = mongoose.model("User", userSchema);
