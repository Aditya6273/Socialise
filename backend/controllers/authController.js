import validator from "validator";
import { User } from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { comparePassword } from "../utils/comparePassword.js";
import redis from "../config/redis.js";

export const Register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password, profilePic } =
      req.body;

    if (!firstName || !lastName || !email || !password || !username) {
      return res.status(400).json("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json("User already exists");
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
    next(error);
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Invalid Email");
    }

    // Check if the user exists
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json("Invalid credentials");
    }

    // Check if the password is correct
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
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
      return res.status(401).json("No token provided");
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

export const Profile = (req, res, next) => {
  try {
    const loggedInUser = req.user;
    return res.status(200).json({ user: loggedInUser });
  } catch (error) {
    next(error);
  }
};
