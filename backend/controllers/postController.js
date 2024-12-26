import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModel.js";
import { User } from "../models/userModel.js";
import { extractPublicIdFromUrl } from "../utils/extractPublicIdFromUrl.js";
import { uploadToCloudinary } from "../utils/uploadImage.js";
import fs from "fs"


export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { image } = req.files;
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
      image: imageUrl || "",
    });

    const savedPost = await newPost.save();

    loggedInUser.posts.push(newPost._id);
    await loggedInUser.save();

    if(image && image.tempFilePath){
      fs.unlinkSync(image.tempFilePath);
    }

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
export const getAllPosts = async (req, res) => {
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
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("userId");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching the post",
      error: error.message,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }


    const publicId = extractPublicIdFromUrl(post.image);
    await cloudinary.uploader.destroy(publicId,(err,result)=>{
      if(err) console.error(err);
      else console.log(result);
    });

   
    await Post.findByIdAndDelete(postId);

    
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Post deleted successfully",
      user: user,
      deletedPost: post,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the post" });
  }
};
export const deleteAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ userId });

    for (const post of posts) {
      if (post.image) {
        const publicId = extractPublicIdFromUrl(post.image);
        if (publicId) {
          // Log the public_id being deleted
          console.log("Deleting image with public_id:", publicId);

          await cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
              console.error('Error deleting image from Cloudinary:', error);
            } else {
              console.log('Image deleted from Cloudinary:', result);
            }
          });
        }
      }
    }

    await Post.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { posts: [] }, { new: true });

    return res.status(200).json({ message: "All posts deleted successfully" });
  } catch (error) {
    console.error("Error deleting all posts:", error);
    return res.status(500).json({ message: "An error occurred while deleting all posts" });
  }
};


