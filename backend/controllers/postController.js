import Post from "../models/postModel.js";
import { uploadToCloudinary } from "../utils/uploadImage.js";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const {image} = req.files;
    console.log(req.files);
    const loggedInUser = req.user;
    const userId = loggedInUser._id;
    let imageUrl;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (image) {
       imageUrl = await uploadToCloudinary(image);
      if (!imageUrl) {
        return res.status(400).json({ message: "Failed to upload image" });
      }
    }

    const newPost = new Post({
      title,
      description,
      userId: userId,
      image:imageUrl || "",
    });

    const savedPost = await newPost.save();

    loggedInUser.posts.push(newPost._id)
    await loggedInUser.save()

    return res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the post",
      error: error.message,
    });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId");
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching posts",
      error: error.message,
    });
  }
};