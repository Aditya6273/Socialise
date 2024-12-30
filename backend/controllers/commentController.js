import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const postComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!postId || !userId || !text.trim()) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const comment = new Comment({
      text: text.trim(),
      post: postId,
      user: userId,
    });

    await comment.save();
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Comment posted successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error posting comment" });
  }
};
export const getCommentsOfPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId })
      .populate("user", "firstName lastName profilePic _id")
    console.log(comments);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
