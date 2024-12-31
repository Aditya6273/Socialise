import { Router } from "express";
import {
  createPost,
  deleteAll,
  deletePost,
  getAllPosts,
  getComments,
  getLikesOfPost,
  getPostById,
  getPostOfBondingUsers,
  likeAndUnlikePost,
} from "../controllers/postController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(checkAuth);

router.post("/create", createPost);
router.get("/all-posts", getAllPosts);
router.get("/get-post/:id", getPostById);
router.delete("/delete/:id", deletePost);
router.delete("/delete-all", deleteAll);
router.get("/get-bondings-posts", getPostOfBondingUsers);
router.get("/get-comments/:id", getComments);
router.post("/like/:id", likeAndUnlikePost);
router.get("/get-likes/:id", getLikesOfPost);

export default router;
