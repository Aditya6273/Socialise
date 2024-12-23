import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import redis from "../config/redis.js";

const secretKey = process.env.JWT_SECRET;

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const isBlackListed = await redis.get(token);
    console.log(isBlackListed,redis.get(token));
    if (isBlackListed) {
      return res
        .status(401)
        .json({ message: "Token is Blacklisted | Please Login Again" });
    }
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};
