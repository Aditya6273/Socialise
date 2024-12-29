import validator from "validator";
import { User } from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { comparePassword } from "../utils/comparePassword.js";
import redis from "../config/redis.js";

import {uploadToCloudinary} from "../utils/uploadImage.js";
import fs from 'fs';

export const Register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, profilePic } =
      req.body;

    if (!firstName || !lastName || !email || !password || !username) {
      return res.status(400).json({message:"All fields are required"});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({message: "Invalid email"});
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          {
            message: "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
          }
        );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      username,
    });

    // Save user to the database
    await user.save();
    delete user._doc.password;
    // Generate token and set in cookie
    const token = await generateTokenAndSetCookie(user._id, res);

    // Return response with the user data and token
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "Invalid email or password"});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({message: "Invalid email"});
    }

    // Check if the user exists
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({message: "User not found"});
    }

    // Check if the password is correct
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message:"Invalid credentials"});
    }

    // Generate token and set in cookie
    const token = await generateTokenAndSetCookie(user._id, res);
    delete user._doc.password;
    // Return response with the user data and token
    return res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
export const Logout = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({message: "Invalid token"});
    }

    await redis.set(token, "logout", "EX", 60 * 60 * 24); // Set expiry for 1 day

    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
export const Profile = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;
    const user = await User.findById(loggedInUser).select("-password").populate("posts");
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName ,bio } = req.body;
    const { profilePic, coverImg } = req.files || {};

    console.log(req.files);   // Log uploaded files to check the structure

    // Fetch user details
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle profile picture upload
    if (profilePic) {
      const profilePicUrl = await uploadToCloudinary(profilePic);
      if (profilePicUrl) {
        user.profilePic = profilePicUrl;
      } else {
        return res.status(400).json({ message: 'Failed to upload profile picture' });
      }
    }

    // Handle cover image upload
    if (coverImg) {
      const coverImgUrl = await uploadToCloudinary(coverImg);
      if (coverImgUrl) {
        user.coverImg = coverImgUrl;
      } else {
        return res.status(400).json({ message: 'Failed to upload cover image' });
      }
    }

    // Update user information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;

    // Save updated user to the database
    const updatedUser = await user.save();

    // Clean up temporary files after uploading
    if (profilePic && profilePic.tempFilePath) {
      try {
        fs.unlinkSync(profilePic.tempFilePath);
      } catch (err) {
        console.error('Error deleting temp profile pic file:', err);
      }
    }
    if (coverImg && coverImg.tempFilePath) {
      try {
        console.log('Removing temp profile pic file:', coverImg.tempFilePath);
        fs.unlinkSync(coverImg.tempFilePath);
      } catch (err) {
        console.error('Error deleting temp cover img file:', err);
      }
    }

    // Return updated user info
    return res.status(200).json({ user: updatedUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};