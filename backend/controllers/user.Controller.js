import { User } from "../models/userModel.js";
import Post from "../models/postModel.js";
export const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("posts");

    return res.status(200).json({ posts: user.posts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const makeBond = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    if (!friendId) {
      return res.status(400).json({ message: "BondMate's ID is required" });
    }

    const userId = req.user._id;
    if (friendId === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot make a bond with yourself" });
    }

    // Fetch logged-in user and friend
    const loggedInUser = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }
    if (!friend) {
      return res.status(404).json({ message: "BondMate not found" });
    }

    // Check if the bond already exists
    const bondExists =
      loggedInUser.bondings.includes(friendId) && friend.bonds.includes(userId);

    if (bondExists) {
      // Remove the bond
      await User.findByIdAndUpdate(userId, { $pull: { bondings: friendId } });
      await User.findByIdAndUpdate(friendId, { $pull: { bonds: userId } });
      const updatedLoggedInUser = await User.findById(userId); // Refetch full data

      return res.status(200).json({
        message: "Bond removed successfully",
        loggedInUser: updatedLoggedInUser,
      });
    } else {
      // Add the bond
      await User.findByIdAndUpdate(userId, {
        $addToSet: { bondings: friendId },
      });
      await User.findByIdAndUpdate(friendId, { $addToSet: { bonds: userId } });
      const updatedLoggedInUser = await User.findById(userId); // Refetch full data

      return res.status(200).json({
        message: "Bond made successfully",
        loggedInUser: updatedLoggedInUser,
      });
    }
  } catch (error) {
    console.error("Error in makeBond:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const getBondings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("bondings");

    return res.status(200).json({ bondings: user.bondings });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getBonds = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("bonds");

    return res.status(200).json({ bonds: user.bonds });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("posts");

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ message: "User not Authorized" });
    }

    const loggedInUser = await User.findById(userId);
    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    const users = await User.find({
      _id: { $ne: userId },
    }).select("-password");

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




